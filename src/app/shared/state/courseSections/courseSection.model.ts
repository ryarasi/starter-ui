import { COURSES } from 'src/app/pages/static/dashboard/dashboard.component';
import {
  FetchPolicy,
  CourseSection,
  FetchParams,
  startingFetchParams,
} from '../../common/models';
import { uiroutes } from '../../common/ui-routes';

export const emptyCourseSectionFormRecord: CourseSection = {
  id: null,
  title: null,
  description: null,
  instructor: null,
  institutions: [],
};
export interface CourseSectionStateModel {
  courseSections: CourseSection[];
  lastPage: number;
  courseSectionsSubscribed: boolean;
  fetchPolicy: FetchPolicy;
  fetchParamObjects: FetchParams[];
  courseSectionFormId: number;
  courseSectionFormRecord: CourseSection;
  isFetching: boolean;
  errorFetching: boolean;
  formSubmitting: boolean;
  errorSubmitting: boolean;
}

export const defaultCourseSectionState: CourseSectionStateModel = {
  courseSections: [],
  lastPage: null,
  courseSectionsSubscribed: false,
  fetchPolicy: null,
  fetchParamObjects: [],
  courseSectionFormId: null,
  courseSectionFormRecord: emptyCourseSectionFormRecord,
  isFetching: false,
  errorFetching: false,
  formSubmitting: false,
  errorSubmitting: false,
};

export const CourseSectionFormCloseURL =
  uiroutes.DASHBOARD_ROUTE.route + '?tab=' + COURSES;
