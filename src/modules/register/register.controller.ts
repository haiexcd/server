/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Register } from 'src/Entities/register.entity';
import { RegisterService } from './register.service';
import { Model } from 'mongoose';
import { updateRegisterInfoDTO } from './dto/register.dto';



@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService,
        @InjectModel(Register.name) private readonly registerModel: Model<Register>,
        ) {}

        @Get('/getUserById/:id')
        async getUserById(@Param('_id') _id : string) : Promise<object> {
            const user = await this.registerModel.findOne(
                { _id: _id }
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


        @Get('/checkExistByUsername/:username')
        async checkExistByUsername(@Param('userName') userName : string) : Promise<boolean> {
            const user = await this.registerModel.findOne(
                { userName: userName }
            )
            console.log(user)
            return user ? true : false
        }


        @Post('/createNewAccount')
        async register(@Body() body: updateRegisterInfoDTO) : Promise<object> {
            const registerCheck = await this.registerModel.findOne(
                { userName: body.userName }
            )
            console.log(registerCheck)
            if (registerCheck) {
                throw new BadRequestException("User already registerd.") 
            }
            const newUser = new this.registerModel({
                userName: body.userName,
                userEmail: body.userEmail,
                password: body.password,
                userRole: 'user',
            })
            await newUser.save()
            return newUser
        }

}
