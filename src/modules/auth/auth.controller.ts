/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { registerDTO } from '../register/dto/register.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { loginDTO } from '../login/dto/login.dto';
import { get } from 'http';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    ) {}


    @Get('/onlyauth')
    @UseGuards(AuthGuard('jwt'))
    async hiddenInformation() {
      return "hidden information"
    }

    @Get('/anyone')
    async publicInformation() {
      return "this can be seen by anyone";
    }

    // @Post('register')
    // async register(@Body() registerDTO: registerDTO) {
    //   const user = await this.userService.create(registerDTO);
    //   const payload = {
    //     userEmail: user.userEmail,
    //   };

    //   const token = await this.authService.signPayload(payload);
    //   return { user, token };
    // }

    // @Post('login')
    // async login(@Body() loginDTO: loginDTO) {
    //   const user = await this.userService.findByLogin(loginDTO);
    //   const payload = {
    //     userEmail: user.userEmail,
    //   };
    //   const token = await this.authService.signPayload(payload);
    //   return { user, token };
    // }
}
