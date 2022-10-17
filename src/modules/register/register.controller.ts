/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Register } from 'src/Entities/register.entity';
import { RegisterService } from './register.service';
import { Model } from 'mongoose';
import { User } from 'src/Entities/user.entity';
import { updateUserInfoDTO } from '../users/dto/users.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { registerDTO } from './dto/register.dto';



@Controller('register')
export class RegisterController {
    constructor(
        private readonly registerService: RegisterService,
        private userService: UsersService,
        private authService: AuthService,
        @InjectModel(User.name) private readonly registerModel: Model<User>,
        ) {}

        @Get('/getUserById/:id')
        async getUserById(@Param('id') id : string) : Promise<object> {
            const user = await this.registerModel.findOne(
                { _id: id }
            )
            console.log(user)
            if (!user) {
                throw new BadRequestException("User does not exist.") 
            }
            return user
        }

        @Get('/checkExistByEmail/:userEmail')
        async checkExistByEmail(@Param('userEmail') userEmail : string) : Promise<boolean> {
            const user = await this.registerModel.findOne(
                { userEmail: userEmail}
            )
            console.log(user)
            return user ? true : false
        }


        @Get('/checkExistByUsername/:userName')
        async checkExistByUsername(@Param('userName') userName : string) : Promise<boolean> {
            const user = await this.registerModel.findOne(
                { userName: userName }
            )
            console.log(user)
            return user ? true : false
        }


        // @Post('/createNewAccount')
        // async register(@Body() body: updateUserInfoDTO) : Promise<object> {
        //     const registerCheck = await this.registerModel.findOne(
        //         { userName: body.userName }
        //     )
        //     console.log(registerCheck)
        //     if (registerCheck) {
        //         throw new BadRequestException("User already registerd.") 
        //     }
        //     const newUser = new this.registerModel({
        //         name: body.name,
        //         userName: body.userName,
        //         userEmail: body.userEmail,
        //         password: body.password,

        //         userRole: 'user',
        //         age: body.age,
        //         gender: body.gender,
        //         phone: body.phone,
        //     })
        //     await newUser.save()
        //     return newUser
        // }


        @Post('/createNewAccount')
        async register(@Body() RegisterDTO: registerDTO) : Promise<object> {
            const user = await this.userService.create(RegisterDTO)
            const payload = {
                userEmail: user.userEmail,
                userName: user.userName,
                userRole: user.userRole,
            };

            const token = await this.authService.signPayload(payload);
            return { user, token }
        }
    
}
