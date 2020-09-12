import { Injectable } from '@angular/core';
import { IUser } from 'src/app/model/user';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { flatMap, switchMap } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  public users$: Subject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  public user$: Subject<IUser> = new BehaviorSubject<IUser>(null);
  private users: IUser[] = [];
  private user: IUser = null;

  constructor(private service: UserService) {}

  public initUsers() {
    this.service.getUsers().subscribe(
      (users: IUser[]) => {
        this.users = users;
        this.users$.next(users);
      },
      () => {
        this.users$.next([]);
      }
    );
  }

  public deleteUser(id: number) {
    this.service.deleteUser(id).subscribe(() => {
      const userIndex = this.users.findIndex((u) => u.id === id);
      if (userIndex != null) {
        this.users.splice(userIndex, 1);
      }
    });
  }

  public editUser(id: number): Observable<void> {
    return this.service.getUser(id).pipe(
      switchMap((user) => {
        this.user = user;
        this.user$.next(this.user);
        return of(null);
      })
    );
  }

  public saveUser(user: IUser): Observable<void> {
    if (user.id != null) {
      return this.service.editUser(user.id, user).pipe(
        flatMap((editedUser: IUser) => {
          const userIndex = this.users.findIndex((u) => u.id === editedUser.id);
          if (userIndex != null) {
            this.users[userIndex] = {
              ...this.users[userIndex],
              ...editedUser,
            };
          }
          return of(null);
        })
      );
    }
    return this.service.createUser(user).pipe(
      flatMap((createdUser: IUser) => {
        this.users.push(createdUser);
        return of(null);
      })
    );
  }
}
