/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { isObject, isString, IsString } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";



export class registerDTO {

    @IsString() readonly userEmail: string;

    @IsString() readonly userName: string;

    @IsString() readonly password: string;

    @IsString() readonly userRole: string;

}

export class updateRegisterInfoDTO extends PartialType(registerDTO) {}
