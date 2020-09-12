import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from 'src/app/page/users/users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserCreateComponentModule } from 'src/app/page/users/user-create/user-create.component.module';
import { UserCreateComponent } from 'src/app/page/users/user-create/user-create.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'create',
    component: UserCreateComponent,
  },
  {
    path: 'edit',
    component: UserCreateComponent,
  },
];

const components = [UsersComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    UserCreateComponentModule,
  ],
  declarations: [...components],
  entryComponents: [...components],
  exports: [...components],
})
export class UsersComponentModule {}
