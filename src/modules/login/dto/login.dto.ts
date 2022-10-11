/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { IsString } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";



export class loginDTO {


    
    @IsString() readonly userEmail: string;

    @IsString() readonly password: string;

}

export class updateLoginInfoDTO extends PartialType(loginDTO) {}