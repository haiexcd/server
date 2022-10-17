/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { updateLoginInfoDTO } from './dto/login.dto';
import { LoginService } from './login.service';
import { Model } from 'mongoose';
import { User } from 'src/Entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';



@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private userService: UsersService,
    private authService: AuthService,
    @InjectModel(User.name) private readonly loginModel: Model<User>,
    ) {}


    // @Post('/')
    // @HttpCode(200)
    // async postLogin(@Body() body: updateLoginInfoDTO) : Promise<object> {
    //   const loginCheck = await this.loginModel.findOne(
    //     { userEmail: body.userEmail }
    //   )
    //   console.log(loginCheck)
    //   if (!loginCheck || loginCheck.password !== body.password) {
    //     throw new BadRequestException("Invalid userEmail or password")
    //   } else {
    //   return loginCheck
    //   }
    // }



    @Post('/')
    @HttpCode(200)
    async postLogin(@Body() body: updateLoginInfoDTO) : Promise<object> {
      const user = await this.loginModel.findOne(
        { userEmail: body.userEmail }
      )
      const payload = {
        userEmail: user.userEmail,
        userName: user.userName,
        userRole: user.userRole,
      }
      const token = await this.authService.signPayload(payload)
      console.log(user)
      if (!user || user.password !== body.password) {
        throw new BadRequestException("Invalid userEmail or password")
      } else {
      return { user, token }
      }
    }




}
