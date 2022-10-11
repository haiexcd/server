/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Entities/user.entity';
import { UsersService } from './users.service';
import { Model } from 'mongoose';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService,
        @InjectModel(User.name) private readonly userModel: Model<User>,
        ) {}


      @Get('/getProfile/:userName')
      async getProfile(@Param('userName') userName : string) : Promise<object> {
        const user = await this.userModel.findOne(
            { userName: userName }
        )
        return user
      }

      @Get('/getAllUsers')
      async getAllUsers() : Promise<object> {
        const users = await this.userModel.find().sort({ id : 1 });
        return users
      }
}
