import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UsersService } from './users.service';
import { UsersRoutingModule } from './users-routing.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    ModalModule,
    SharedModule
  ],
  declarations: [
    UserListComponent,
    UserEditComponent
  ],
  providers: [UsersService]
})
export class UsersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsersModule
    };
  }
}
