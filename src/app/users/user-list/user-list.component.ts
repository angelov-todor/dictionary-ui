import { Component, OnInit } from '@angular/core';
import { PartialCollectionView } from '../../words/words.service';
import { User, UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];
  collectionView: PartialCollectionView;
  selectedUser: User = null;

  constructor(private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(page?: string): void {
    this.usersService.getUsersList(page)
      .subscribe(
        (usersListResponse) => {
          this.users = usersListResponse.users;
          this.collectionView = usersListResponse.view;
        }
      );
  }

  onCompleted() {
    this.selectedUser = null;
    this.getUsers();
  }

  edit(user: User): void {
    this.selectedUser = user;
  }

  setPage(page: string) {
    this.getUsers(page);
  }
}
