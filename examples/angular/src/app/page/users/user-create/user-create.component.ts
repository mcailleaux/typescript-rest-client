import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/model/user';
import { UserFacade } from 'src/app/service/user.facade';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit, OnDestroy {
  public user$: Observable<IUser> = this.facade.user$;

  public firstname = new FormControl('', [Validators.required]);
  public lastname = new FormControl('', [Validators.required]);
  public age = new FormControl('', [Validators.required]);

  public user: IUser = {
    firstName: '',
    lastName: '',
    age: null,
  } as IUser;

  public formGroup = new FormGroup({
    firstname: this.firstname,
    lastname: this.lastname,
    age: this.age,
  });

  private unsubscribe$ = new Subject();

  constructor(private facade: UserFacade, private router: Router) {}

  public ngOnInit(): void {
    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      if (user != null) {
        this.user = user;
        this.firstname.setValue(user.firstName);
        this.lastname.setValue(user.lastName);
        this.age.setValue(user.age);
      }
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public saveUser() {
    if (this.formGroup.valid) {
      this.facade.saveUser(this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
