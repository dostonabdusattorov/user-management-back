import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SigninDto } from 'src/dtos/signin.dto';
import { UserDto } from '../dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private authSer: AuthService) {}

  @Post('/signup')
  @Serialize(UserDto)
  async signup(@Body() body: CreateUserDto) {
    return this.authSer.signup(body.name, body.email, body.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  signin(@Body() body: SigninDto) {
    return this.authSer.signin(body.email, body.password);
  }
}
