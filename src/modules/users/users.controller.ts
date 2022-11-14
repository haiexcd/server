/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Entities/user.entity';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { updateUserInfoDTO } from './dto/users.dto';

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




      @Patch('/editProfile/:_id')
      async patchUser(@Param('_id') _id : string, @Body() body: updateUserInfoDTO) : Promise<object> {
          const user = await this.userModel.findOne(
              { _id: _id }
          )
          if (!user) {
              throw new BadRequestException('User not found.')
          }
          const query = { _id: _id }
          const update = { 
              $set: {
                    name: body.name,
                    userName: body.userName,
                    userEmail: body.userEmail,
                    password: body.password,
                    age: body.age,
                    gender: body.gender,
                    phone: body.phone,
                    img: body.img,
              },
  
          };
          await this.userModel.updateOne(query, update) 
          const updatedUser = await this.userModel.findOne(query)  
          return updatedUser
      }

      @Delete('/deleteUser/:_id')
      async deleteUser(@Param('_id') _id: string) : Promise<object> {
        const user = await this.userModel.findOne(
            { _id: _id }
        )
        if (!user)
        throw new BadRequestException('User does not exist')

        await this.userModel.deleteOne(
            { _id: _id }
        )
        return user
      }


}




// @Delete('/deletePost/:id')
// async deletePost(@Param('id') id : string) : Promise<object> {
//     const news = await this.newsModel.find(
//         { _id: id }
//     )
//     console.log(news)
//     if (!news.length) 
//     throw new BadRequestException('Post does not exist')

//     await this.newsModel.deleteOne(
//         { _id: id }
//     )
//     console.log('deleted post!')
//     return news
// }