/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";



export class userDTO {

    @IsString() readonly name: string;

 
    @IsString() readonly userName: string;

    
    @IsString() readonly userEmail: string;

    
    @IsString() readonly password: string;

    
    @IsString() readonly userRole: string;

    
    @IsNumber() readonly age: number;

    
    @IsString() readonly gender: string;

    
    @IsNumber() readonly phone: number;

    @IsString() readonly img: string;


}

export class updateUserInfoDTO extends PartialType(userDTO) {}