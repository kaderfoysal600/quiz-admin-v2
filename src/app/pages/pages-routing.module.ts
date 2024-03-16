import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,

    children: [
      {
        path: '',
        redirectTo: 'list-user',
        pathMatch: 'full',
      },
      {
        path: 'create-user',
        loadChildren: () =>
          import('./create-user/create-user.module').then(
            (m) => m.CreateUserModule
          ),
      },
 
      {
        path: 'list-user',
        loadChildren: () =>
          import('./list-user/list-user.module').then((m) => m.ListUserModule),
      },

      {
        path: 'list-role',
        loadChildren: () =>
          import('./list-role/list-role.module').then((m) => m.ListRoleModule),
      },
      {
        path: 'updateUser/:id',
        loadChildren: () =>
          import('./update-user/update-user.module').then(
            (m) => m.UpdateUserModule
          ),
      },


      // {
      //   path: 'list-permission-group-item',
      //   loadChildren: () =>
      //     import(
      //       './list-permission-group-item/list-permission-group-item.module'
      //     ).then((m) => m.ListPermissionGroupItemModule),
      // },

      // {
      //   path: 'list-role-permission',
      //   loadChildren: () =>
      //     import('./list-role-permission/list-role-permission.module').then(
      //       (m) => m.ListRolePermissionModule
      //     ),
      // },
      // {
      //   path: 'role/permission/:id',
      //   loadChildren: () =>
      //     import('./edit-permission/edit-permission.module').then(
      //       (m) => m.EditPermissionModule
      //     ),
      // },
      {
        path: 'list-company',
        loadChildren: () =>
          import('./list-company/list-company.module').then(
            (m) => m.ListCompanyModule
          ),
      },
      {
        path: 'add-question/:id',
        loadChildren: () =>
          import('./add-device/add-device.module').then(
            (m) => m.AddDeviceModule
          ),
      },
      {
        path: 'list-device',
        loadChildren: () =>
          import('./list-device/list-device.module').then(
            (m) => m.ListDeviceModule
          ),
      },
      {
        path: 'list-company-device',
        loadChildren: () =>
          import('./list-company-device/list-company-device.module').then(
            (m) => m.ListCompanyDeviceModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },

      {
        path: 'change-password',
        loadChildren: () =>
          import('./change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
      },
      {
        path: 'reset-password',
        loadChildren: () =>
          import('./reset-password/reset-password.module').then(
            (m) => m.ResetPasswordModule
          ),
      },

      {
        path: 'view-profile',
        loadChildren: () =>
          import('./view-profile/view-profile.module').then(
            (m) => m.ViewProfileModule
          ),
      },
      {
        path: 'mqtf-log-rows',
        loadChildren: () =>
          import('./mqtf-log-rows/mqtf-log-rows.module').then(
            (m) => m.MqtfLogRowsModule
          ),
      },

      {
        path: 'mqtf-logs',
        loadChildren: () =>
          import('./mqtf-logs/mqtf-logs.module').then((m) => m.MqtfLogsModule),
      },

      {
        path: 'graph',
        loadChildren: () =>
          import('./graph/graph.module').then((m) => m.GraphModule),
      },
      {
        path: 'set-alarm',
        loadChildren: () =>
          import('./set-alarm/set-alarm.module').then((m) => m.SetAlarmModule),
      },
      {
        path: 'list-divisions',
        loadChildren: () =>
          import('./list-divisions/list-divisions.module').then(
            (m) => m.ListDivisionsModule
          ),
      },
      {
        path: 'list-sub-divisions/:id',
        loadChildren: () =>
          import('./list-sub-division/list-sub-division.module').then(
            (m) => m.ListSubDivisionModule
          ),
      },
      {
        path: 'create-member',
        loadChildren: () =>
          import('./create-member/create-member.module').then(
            (m) => m.CreateMemberModule
          ),
      },
      {
        path: 'list-member',
        loadChildren: () =>
          import('./member/member.module').then((m) => m.MemberModule),
      },

      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'add-protik',
        loadChildren: () =>
          import('./add-protik/add-protik.module').then(
            (m) => m.AddProtikModule
          ),
      },

      {
        path: 'ashon-detail/:id',
        loadChildren: () =>
          import('./ashon-detail/ashon-detail.module').then(
            (m) => m.AshonDetailModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
