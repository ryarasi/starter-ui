import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SearchParams } from 'src/app/shared/abstract/master-grid/table.model';
import {
  defaultSearchParams,
  USER_ROLES_NAMES,
} from 'src/app/shared/common/constants';
import { MembershipStatusOptions, User } from 'src/app/shared/common/models';
import { uiroutes } from 'src/app/shared/common/ui-routes';
import {
  OpenLoginFormAction,
  VerifyAccountAction,
} from 'src/app/shared/state/auth/auth.actions';
import { AuthStateModel } from 'src/app/shared/state/auth/auth.model';
import { AuthState } from 'src/app/shared/state/auth/auth.state';
import { FetchPublicMembersAction } from 'src/app/shared/state/members/member.actions';
import { MemberState } from 'src/app/shared/state/members/member.state';
import { ShowNotificationAction } from 'src/app/shared/state/notifications/notification.actions';

// const tempUsers = [
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
//   {
//     id: '1',
//     firstName: 'Admin',
//     lastName: 'User',
//     title: 'Admin User',
//     bio: 'hehe',
//     avatar: 'http://localhost:8000/media/4fwhHWu.jpg',
//     membershipStatus: 'AP',
//     role: {
//       name: 'Super Admin',
//       __typename: 'UserRoleType',
//     },
//     institution: {
//       id: '1',
//       name: 'Shuddhi Vidhya',
//       __typename: 'InstitutionType',
//     },
//     lastActive: '2021-08-23T12:51:53.100044+00:00',
//     totalCount: 4,
//     __typename: 'UserType',
//   },
// ];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  url: string;
  currentYear = new Date().getFullYear();
  privacyRoute = uiroutes.PRIVACY_ROUTE.route;
  @Select(AuthState.getIsLoggedIn)
  isLoggedIn$: Observable<boolean>;
  @Select(AuthState.getCurrentMemberStatus)
  membershipStatus$: Observable<string>;
  @Select(AuthState.getFirstTimeSetup)
  firstTimeSetup$: Observable<boolean>;
  membershipStatus: string;
  authState: AuthStateModel;
  pendingApproval: boolean = false;
  suspended: boolean = false;
  showAnnouncements: boolean = true;
  isLoggedIn: boolean = false;
  firstTimeSetup: boolean = false;
  showUnverifiedNotification: boolean = false;
  @Select(MemberState.listMembers)
  learners$: Observable<User[]>;
  @Select(MemberState.isFetching)
  isFetching$: Observable<boolean>;
  learners: any[] = [];
  isFetching: boolean = false;
  columnFilters = {
    roleName: USER_ROLES_NAMES.LEARNER,
    membershipStatusIs: [MembershipStatusOptions.APPROVED],
  };
  constructor(private store: Store, private router: Router) {
    this.fetchMembers();
    this.learners$.subscribe((val) => {
      this.learners = val;
      // this.learners = tempUsers;
    });
    this.isFetching$.subscribe((val) => {
      this.isFetching = val;
    });
    this.isLoggedIn$.subscribe((val) => {
      this.isLoggedIn = val;
    });
    this.membershipStatus$.subscribe((val) => {
      console.log('*1* Membership status changed ', {
        currentMembershipStatusOptions: this.membershipStatus,
        newMembershipStatusOptions: val,
      });
      if (this.membershipStatus != val && val !== undefined) {
        this.membershipStatus = val;
        this.processMembershipStatusOptions();
      }
    });

    this.firstTimeSetup$.subscribe((val) => {
      this.firstTimeSetup = val;
      if (this.firstTimeSetup) {
        // If this is the first time user is logging in, redirect to member form page
        // to update their profile info.
        this.router.navigate([uiroutes.MEMBER_FORM_ROUTE.route]);
      }
    });

    // this.pendingApproval =
    //   this.authState.membershipStatus == MembershipStatusOptions.PENDING_APPROVAL;
    // this.suspended =
    //   this.authState.membershipStatus == MembershipStatusOptions.SUSPENDED;
    console.log('from the home page => ', {
      pendingApproval: this.pendingApproval,
      suspended: this.suspended,
    });
  }

  generateSubtitle(user) {
    return user.title
      ? user.title + ', '
      : '' + user.institution?.name
      ? user.institution?.name
      : '';
  }

  fetchMembers() {
    this.store.dispatch(
      new FetchPublicMembersAction({
        searchParams: {
          ...defaultSearchParams,
          columnFilters: this.columnFilters,
        },
      })
    );
  }

  processMembershipStatusOptions() {
    console.log(
      '*1* Sending pending approval notification from processMembershipStatusOptions',
      { membershipStatus: this.membershipStatus }
    );
    if (this.membershipStatus == MembershipStatusOptions.PENDING) {
      this.store.dispatch(
        new ShowNotificationAction({
          message:
            "Your account is pending approval by your institution's moderators. Please wait for them to approve you.",
          action: 'show',
          autoClose: false,
          id: 'pendinig-approval',
        })
      );
    }
  }

  closeAnnouncements() {
    console.log('clicked on close announcements');
    this.showAnnouncements = false;
  }

  activateAccount() {
    this.url = window.location.href;
    console.log('this.url => ', { url: this.url });
    if (this.url.includes(uiroutes.ACTIVATE_ACCOUNT_ROUTE.route)) {
      console.log('account activation!!!');
      const token = this.url.split(
        uiroutes.ACTIVATE_ACCOUNT_ROUTE.route + '/'
      )[1];
      if (token) {
        this.store.dispatch(new VerifyAccountAction({ token }));
      }
    }
    if (this.url.includes(uiroutes.REGISTER_ROUTE.route)) {
      this.store.dispatch(new OpenLoginFormAction());
      console.log('REGISTER!!!');
    }
  }

  ngOnInit(): void {
    this.activateAccount();
  }
}
