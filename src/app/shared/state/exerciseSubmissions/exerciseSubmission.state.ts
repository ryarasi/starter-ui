import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  defaultExerciseSubmissionState,
  emptyExerciseSubmissionFormRecord,
  ExerciseSubmissionFormCloseURL,
  ExerciseSubmissionStateModel,
  GradingGroup,
} from './exerciseSubmission.model';

import { Injectable } from '@angular/core';
import {
  ExerciseSubmissionSubscriptionAction,
  CreateUpdateExerciseSubmissionsAction,
  DeleteExerciseSubmissionAction,
  FetchExerciseSubmissionsAction,
  FetchNextExerciseSubmissionsAction,
  ForceRefetchExerciseSubmissionsAction,
  GetExerciseSubmissionAction,
  ResetExerciseSubmissionFormAction,
  FetchNextGradingGroupsAction,
  FetchGradingGroupsAction,
} from './exerciseSubmission.actions';
import { EXERCISE_SUBMISSION_QUERIES } from '../../api/graphql/queries.graphql';
import { Apollo } from 'apollo-angular';
import {
  ExerciseSubmission,
  MatSelectOption,
  FetchParams,
  CREATE,
  SUBSCRIPTION_METHODS,
} from '../../common/models';
import { EXERCISE_SUBMISSION_MUTATIONS } from '../../api/graphql/mutations.graphql';
import { ShowNotificationAction } from '../notifications/notification.actions';
import {
  getErrorMessageFromGraphQLResponse,
  fetchParamsNewOrNot,
  subscriptionUpdater,
  updateFetchParams,
  convertPaginatedListToNormalList,
  paginatedSubscriptionUpdater,
  columnFiltersChanged,
} from '../../common/functions';
import { Router } from '@angular/router';
import { defaultSearchParams } from '../../common/constants';
import { SUBSCRIPTIONS } from '../../api/graphql/subscriptions.graphql';
import { SearchParams } from '../../abstract/master-grid/table.model';

@State<ExerciseSubmissionStateModel>({
  name: 'exerciseSubmissionState',
  defaults: defaultExerciseSubmissionState,
})
@Injectable()
export class ExerciseSubmissionState {
  constructor(
    private apollo: Apollo,
    private store: Store,
    private router: Router
  ) {}

  @Selector()
  static listGradingGroups(
    state: ExerciseSubmissionStateModel
  ): GradingGroup[] {
    return state.gradingGroups;
  }

  @Selector()
  static isFetchingGradingGroups(state: ExerciseSubmissionStateModel): boolean {
    return state.isFetchingGradingGroups;
  }

  @Selector()
  static listExerciseSubmissions(
    state: ExerciseSubmissionStateModel
  ): ExerciseSubmission[] {
    return state.exerciseSubmissions;
  }

  @Selector()
  static isFetching(state: ExerciseSubmissionStateModel): boolean {
    return state.isFetching;
  }

  @Selector()
  static fetchParams(state: ExerciseSubmissionStateModel): FetchParams {
    return state.fetchParamObjects[state.fetchParamObjects.length - 1];
  }
  @Selector()
  static listExerciseSubmissionOptions(
    state: ExerciseSubmissionStateModel
  ): MatSelectOption[] {
    const options: MatSelectOption[] = state.exerciseSubmissions.map((i) => {
      const option: MatSelectOption = {
        value: i.id,
        label: i.participant.firstName,
      };
      return option;
    });
    
    return options;
  }

  @Selector()
  static errorFetching(state: ExerciseSubmissionStateModel): boolean {
    return state.errorFetching;
  }

  @Selector()
  static formSubmitting(state: ExerciseSubmissionStateModel): boolean {
    return state.formSubmitting;
  }

  @Selector()
  static errorSubmitting(state: ExerciseSubmissionStateModel): boolean {
    return state.errorSubmitting;
  }

  @Selector()
  static getExerciseSubmissionFormRecord(
    state: ExerciseSubmissionStateModel
  ): ExerciseSubmission {
    return state.exerciseSubmissionFormRecord;
  }

  @Action(ForceRefetchExerciseSubmissionsAction)
  forceRefetchExerciseSubmissions({
    patchState,
  }: StateContext<ExerciseSubmissionStateModel>) {
    patchState({ fetchPolicy: 'network-only' });
    this.store.dispatch(
      new FetchExerciseSubmissionsAction({ searchParams: defaultSearchParams })
    );
  }

  @Action(FetchNextGradingGroupsAction)
  fetchNextExerciseSubmissionGroups({
    getState,
  }: StateContext<ExerciseSubmissionStateModel>) {
    const state = getState();
    const lastPageNumber = state.gradingGroupLastPage;
    const previousFetchParams =
      state.gradingGroupsfetchParamObjects[
        state.gradingGroupsfetchParamObjects.length - 1
      ];
    const pageNumber = previousFetchParams.currentPage + 1;
    const newSearchParams: SearchParams = {
      pageNumber,
      pageSize: previousFetchParams.pageSize,
      searchQuery: previousFetchParams.searchQuery,
      columnFilters: previousFetchParams.columnFilters,
    };
    if (
      !lastPageNumber ||
      (lastPageNumber != null && pageNumber <= lastPageNumber)
    ) {
      this.store.dispatch(
        new FetchGradingGroupsAction({
          searchParams: newSearchParams,
        })
      );
    }
  }

  @Action(FetchGradingGroupsAction)
  fetchExerciseSubmissionGroups(
    { getState, patchState }: StateContext<ExerciseSubmissionStateModel>,
    { payload }: FetchExerciseSubmissionsAction
  ) {
    
    let { searchParams } = payload;
    let state = getState();
    const {
      fetchPolicy,
      exerciseSubmissionsSubscribed,
      gradingGroupsfetchParamObjects,
    } = state;
    const { searchQuery, pageSize, pageNumber, columnFilters } = searchParams;
    let newFetchParams = updateFetchParams({
      fetchParamObjects: gradingGroupsfetchParamObjects,
      newPageNumber: pageNumber,
      newPageSize: pageSize,
      newSearchQuery: searchQuery,
      newColumnFilters: columnFilters,
    });
    const variables = {
      groupBy: columnFilters?.groupBy,
      status: columnFilters?.status,
      limit: newFetchParams.pageSize,
      offset: newFetchParams.offset,
    };
    if (
      fetchParamsNewOrNot({
        fetchParamObjects: gradingGroupsfetchParamObjects,
        newFetchParams,
      })
    ) {
      patchState({ isFetching: true });
      
      this.apollo
        .watchQuery({
          query: EXERCISE_SUBMISSION_QUERIES.GET_EXERCISE_SUBMISSION_GROUPS,
          variables,
          fetchPolicy,
        })
        .valueChanges.subscribe(
          ({ data }: any) => {
            
            const response = data.exerciseSubmissionGroups;
            const totalCount = response[0]?.totalCount
              ? response[0]?.totalCount
              : 0;
            newFetchParams = { ...newFetchParams, totalCount };

            if (
              columnFiltersChanged({
                fetchParamObjects: gradingGroupsfetchParamObjects,
                newFetchParams,
              })
            ) {
              // Resetting the state to clear existing groups.
              patchState({ paginatedGradingGroups: [] });
              state = getState();
            } else {
              // console.log('filter params have NOT changed ', {
              //   old: gradingGroupsfetchParamObjects[
              //     gradingGroupsfetchParamObjects?.length - 1
              //   ]?.columnFilters,
              //   new: newFetchParams.columnFilters,
              // });
            }
            let paginatedGradingGroups = state.paginatedGradingGroups;
            paginatedGradingGroups = {
              ...paginatedGradingGroups,
              [pageNumber]: response,
            };
            
            let gradingGroups = convertPaginatedListToNormalList(
              paginatedGradingGroups
            );
            let lastPage = null;
            if (response.length < newFetchParams.pageSize) {
              lastPage = newFetchParams.currentPage;
            }
            patchState({
              lastPage,
              gradingGroups,
              paginatedGradingGroups,
              gradingGroupsfetchParamObjects:
                state.gradingGroupsfetchParamObjects.concat([newFetchParams]),
              isFetching: false,
            });
            // if (!exerciseSubmissionsSubscribed) {
            //   this.store.dispatch(new ExerciseSubmissionSubscriptionAction());
            // }
          },
          (error) => {
            this.store.dispatch(
              new ShowNotificationAction({
                message: getErrorMessageFromGraphQLResponse(error),
                action: 'error',
              })
            );
            patchState({ isFetching: false });
          }
        );
    }
  }

  @Action(FetchNextExerciseSubmissionsAction)
  fetchNextExerciseSubmissions({
    getState,
  }: StateContext<ExerciseSubmissionStateModel>) {
    const state = getState();
    const lastPageNumber = state.lastPage;
    const previousFetchParams =
      state.fetchParamObjects[state.fetchParamObjects.length - 1];
    const pageNumber = previousFetchParams.currentPage + 1;
    const newSearchParams: SearchParams = {
      pageNumber,
      pageSize: previousFetchParams.pageSize,
      searchQuery: previousFetchParams.searchQuery,
      columnFilters: previousFetchParams.columnFilters,
    };
    if (
      !lastPageNumber ||
      (lastPageNumber != null && pageNumber <= lastPageNumber)
    ) {
      this.store.dispatch(
        new FetchExerciseSubmissionsAction({ searchParams: newSearchParams })
      );
    }
  }

  @Action(FetchExerciseSubmissionsAction)
  fetchExerciseSubmissions(
    { getState, patchState }: StateContext<ExerciseSubmissionStateModel>,
    { payload }: FetchExerciseSubmissionsAction
  ) {
    
    let { searchParams } = payload;
    const state = getState();
    const { fetchPolicy, fetchParamObjects, exerciseSubmissionsSubscribed } =
      state;
    const { searchQuery, pageSize, pageNumber, columnFilters } = searchParams;
    let newFetchParams = updateFetchParams({
      fetchParamObjects,
      newPageNumber: pageNumber,
      newPageSize: pageSize,
      newSearchQuery: searchQuery,
      newColumnFilters: columnFilters,
    });
    const variables = {
      searchField: searchQuery,
      limit: newFetchParams.pageSize,
      offset: newFetchParams.offset,
      exerciseId: columnFilters?.exerciseId,
      chapterId: columnFilters?.chapterId,
      courseId: columnFilters?.courseId,
      participantId: columnFilters?.participantId,
      status: columnFilters?.status,
    };
    if (fetchParamsNewOrNot({ fetchParamObjects, newFetchParams })) {
      patchState({ isFetching: true });
      
      this.apollo
        .watchQuery({
          query: EXERCISE_SUBMISSION_QUERIES.GET_EXERCISE_SUBMISSIONS,
          variables,
          fetchPolicy,
        })
        .valueChanges.subscribe(
          ({ data }: any) => {
            
            const response = data.exerciseSubmissions;
            const totalCount = response[0]?.totalCount
              ? response[0]?.totalCount
              : 0;
            newFetchParams = { ...newFetchParams, totalCount };
            let paginatedExerciseSubmissions =
              state.paginatedExerciseSubmissions;
            paginatedExerciseSubmissions = {
              ...paginatedExerciseSubmissions,
              [pageNumber]: response,
            };
            
            let exerciseSubmissions = convertPaginatedListToNormalList(
              paginatedExerciseSubmissions
            );
            let lastPage = null;
            if (response.length < newFetchParams.pageSize) {
              lastPage = newFetchParams.currentPage;
            }
            patchState({
              lastPage,
              exerciseSubmissions,
              paginatedExerciseSubmissions,
              fetchParamObjects: state.fetchParamObjects.concat([
                newFetchParams,
              ]),
              isFetching: false,
            });
          },
          (error) => {
            this.store.dispatch(
              new ShowNotificationAction({
                message: getErrorMessageFromGraphQLResponse(error),
                action: 'error',
              })
            );
            patchState({ isFetching: false });
          }
        );
    }
  }

  @Action(ExerciseSubmissionSubscriptionAction)
  subscribeToExerciseSubmissions({
    getState,
    patchState,
  }: StateContext<ExerciseSubmissionStateModel>) {
    const state = getState();
    if (!state.exerciseSubmissionsSubscribed) {
      this.apollo
        .subscribe({
          query: SUBSCRIPTIONS.exerciseSubmission,
        })
        .subscribe((result: any) => {
          const state = getState();
          const method = result?.data?.notifyExerciseSubmission?.method;
          const exerciseSubmission =
            result?.data?.notifyExerciseSubmission?.exerciseSubmission;
          // Replacing the existing submissions in state with the modified submissions in the response
          const { newPaginatedItems, newItemsList } =
            paginatedSubscriptionUpdater({
              paginatedItems: state.paginatedExerciseSubmissions,
              method,
              modifiedItem: exerciseSubmission,
            });
          patchState({
            exerciseSubmissions: newItemsList,
            paginatedExerciseSubmissions: newPaginatedItems,
            exerciseSubmissionsSubscribed: true,
          });
        });
    }
  }

  @Action(GetExerciseSubmissionAction)
  getExerciseSubmission(
    { patchState }: StateContext<ExerciseSubmissionStateModel>,
    { payload }: GetExerciseSubmissionAction
  ) {
    const { id } = payload;
    patchState({ isFetching: true });
    this.apollo
      .watchQuery({
        query: EXERCISE_SUBMISSION_QUERIES.GET_EXERCISE_SUBMISSION,
        variables: { id },
        fetchPolicy: 'network-only',
      })
      .valueChanges.subscribe(
        ({ data }: any) => {
          const response = data.exerciseSubmission;
          patchState({
            exerciseSubmissionFormRecord: response,
            isFetching: false,
          });
        },
        (error) => {
          this.store.dispatch(
            new ShowNotificationAction({
              message: getErrorMessageFromGraphQLResponse(error),
              action: 'error',
            })
          );
          patchState({ isFetching: false });
        }
      );
  }

  @Action(CreateUpdateExerciseSubmissionsAction)
  createUpdateExerciseSubmission(
    { getState, patchState }: StateContext<ExerciseSubmissionStateModel>,
    { payload }: CreateUpdateExerciseSubmissionsAction
  ) {
    const state = getState();
    const { exerciseSubmissions } = payload;
    let { formSubmitting } = state;
    formSubmitting = true;
    patchState({ formSubmitting });
    const variables = {
      exerciseSubmissions: exerciseSubmissions,
    };
    const updateForm = exerciseSubmissions[0].id;
    this.apollo
      .mutate({
        mutation:
          EXERCISE_SUBMISSION_MUTATIONS.CREATE_UPDATE_EXERCISE_SUBMISSIONS,
        variables,
      })
      .subscribe(
        ({ data }: any) => {
          const response = data.createUpdateExerciseSubmissions;
          patchState({ formSubmitting: false });
          
          if (response.ok) {
            this.router.navigateByUrl(ExerciseSubmissionFormCloseURL);
            const modifiedExerciseSubmissions = response.exerciseSubmissions;
            // Replacing the existing submissions in state with the modified submissions in the response
            let exerciseSubmissions = state.exerciseSubmissions.map((e) => {
              const modifiedSubmission = modifiedExerciseSubmissions.find(
                (m) => m.id == e.id
              );
              return modifiedSubmission ? { ...e, ...modifiedSubmission } : e;
            });
            // Getting the last used fetch params so that we can check if the returned submissions are applicable to the filters
            const previousFetchParams =
              state.fetchParamObjects[state.fetchParamObjects.length - 1];
            // Filtering out submissions that are no longer valid for the current set of filters
            exerciseSubmissions = exerciseSubmissions.filter((e) => {
              const statusValid = previousFetchParams.columnFilters?.status
                ? previousFetchParams.columnFilters?.status == e.status
                : true;
              return statusValid;
            });
            
            patchState({
              exerciseSubmissions,
              exerciseSubmissionFormRecord: emptyExerciseSubmissionFormRecord,
              fetchPolicy: 'network-only',
            });
            this.store.dispatch(
              new ShowNotificationAction({
                message: `Your work was submitted successfully!`,
                action: 'success',
              })
            );
          } else {
            this.store.dispatch(
              new ShowNotificationAction({
                message: getErrorMessageFromGraphQLResponse(response?.errors),
                action: 'error',
              })
            );
          }
          
        },
        (error) => {
          
          this.store.dispatch(
            new ShowNotificationAction({
              message: getErrorMessageFromGraphQLResponse(error),
              action: 'error',
            })
          );
          patchState({ formSubmitting: false });
        }
      );
  }

  @Action(DeleteExerciseSubmissionAction)
  deleteExerciseSubmission(
    { getState, patchState }: StateContext<ExerciseSubmissionStateModel>,
    { payload }: DeleteExerciseSubmissionAction
  ) {
    let { id } = payload;
    this.apollo
      .mutate({
        mutation: EXERCISE_SUBMISSION_MUTATIONS.DELETE_EXERCISE_SUBMISSION,
        variables: { id },
      })
      .subscribe(
        ({ data }: any) => {
          const response = data.deleteExerciseSubmission;
          
          if (response.ok) {
            this.router.navigateByUrl(ExerciseSubmissionFormCloseURL);
            const method = SUBSCRIPTION_METHODS.DELETE_METHOD;
            const group = response.group;
            const state = getState();
            const { newPaginatedItems, newItemsList } =
              paginatedSubscriptionUpdater({
                paginatedItems: state.paginatedExerciseSubmissions,
                method,
                modifiedItem: group,
              });
            patchState({
              paginatedExerciseSubmissions: newPaginatedItems,
              exerciseSubmissions: newItemsList,
              exerciseSubmissionFormRecord: emptyExerciseSubmissionFormRecord,
            });
            this.store.dispatch(
              new ShowNotificationAction({
                message: 'ExerciseSubmission deleted successfully!',
                action: 'success',
              })
            );
            this.store.dispatch(
              new ForceRefetchExerciseSubmissionsAction({
                searchParams: defaultSearchParams,
              })
            );
          } else {
            this.store.dispatch(
              new ShowNotificationAction({
                message: getErrorMessageFromGraphQLResponse(response?.errors),
                action: 'error',
              })
            );
          }
        },
        (error) => {
          this.store.dispatch(
            new ShowNotificationAction({
              message: getErrorMessageFromGraphQLResponse(error),
              action: 'error',
            })
          );
        }
      );
  }

  @Action(ResetExerciseSubmissionFormAction)
  resetExerciseSubmissionForm({
    patchState,
  }: StateContext<ExerciseSubmissionStateModel>) {
    patchState({
      exerciseSubmissionFormRecord: emptyExerciseSubmissionFormRecord,
      formSubmitting: false,
    });
  }
}
