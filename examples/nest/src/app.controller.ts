import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { IUser } from './model/user';

@Controller('/users')
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Observable<IUser[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number): Observable<IUser> {
    return this.userService.getUser(id);
  }

  @Post()
  public createUser(@Body() user: IUser): Observable<IUser> {
    return this.userService.createUser(user);
  }

  @Put(':id')
  public editUser(
    @Param('id') id: number,
    @Body() user: IUser,
  ): Observable<IUser> {
    return this.userService.editUser(id, user);
  }

  @Delete(':id')
  public deleteUser(@Param('id') id: number): Observable<void> {
    return this.userService.deleteUser(id);
  }
}
