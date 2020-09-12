import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/model/user';
import { UserFacade } from 'src/app/service/user.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users$: Observable<IUser[]> = this.facade.users$;

  constructor(private facade: UserFacade, private router: Router) {}

  public ngOnInit(): void {
    this.facade.initUsers();
  }

  public edit(user: IUser) {
    this.facade.editUser(user.id).subscribe();
    this.router.navigate(['users/edit']);
  }

  public delete(user: IUser) {
    this.facade.deleteUser(user.id);
  }
}
