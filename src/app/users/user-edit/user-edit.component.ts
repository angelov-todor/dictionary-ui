import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { User, UsersService } from '../users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {


  @ViewChild('editModal') public editModal: ModalDirective;

  @Output()
  onCompleted = new EventEmitter<false>();

  @Input()
  get user() {
    return this._user;
  }

  set user(value: User | null) {
    this._user = value;
    if (value) {
      this.editForm.reset(this._user);
      this.onViewWordModalOpen();
    } else {
      this.editModal.hide();
    }
  }

  editForm: FormGroup;
  protected _user: User;

  constructor(fb: FormBuilder, private usersService: UsersService) {
    this.editForm = fb.group({
      id: [null, Validators.required],
      email: [null, [Validators.required]],
      role: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.editForm.markAsTouched();
    if (!this.editForm.valid) {
      console.log(this.editForm);
      return;
    }
    this.usersService.update(this.editForm.value)
      .subscribe(() => this.onCompleted.emit(false));
  }

  onViewWordModalOpen(): void {
    this.editModal.show();
  }

  onClose(): void {
    this.editModal.hide();
  }

  onHide(): void {
    this.onCompleted.emit(false);
  }

}
