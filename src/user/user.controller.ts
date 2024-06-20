import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginInput, User } from './model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: User) {
    const createdUser = await this.userService.createUser(user);
    if (createdUser instanceof HttpException) {
      throw createdUser;
    }
    return createdUser;
  }

  @Post('login')
  async login(@Body() loginInput: LoginInput) {
    const result = await this.userService.login(loginInput);
    if (!result.payload || !result.match) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return result.payload;
  }
}
