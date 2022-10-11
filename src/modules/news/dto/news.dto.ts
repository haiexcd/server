/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { IsArray, IsObject, IsOptional, IsString } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";





export class contentDTO {
    
    @IsString() readonly image: string;

   
    @IsString() readonly text: string;

   
    @IsString() readonly video: string;
}


export class likedIdListDTO {
    
    @IsString() readonly userId: string;
}


export class commentDTO {
    
    @IsObject() readonly content: contentDTO;


    @IsString() readonly publisherName: string;


    @IsString() readonly publishedTime: Date;
}


export class likeListDTO {

    @IsString() readonly publisherName: string;


    @IsString() readonly publisherTime: Date;


    @IsObject() readonly content: contentDTO;
}


export class newsDTO {


    @IsString() readonly publisherName: string;

   
    @IsString() readonly publisherTime: Date;


    @IsObject() readonly content: contentDTO;


    @IsArray() @IsOptional() readonly comment: [commentDTO];


    @IsArray() @IsOptional() readonly likedIdList: [likedIdListDTO];

}



export class updateNewsInfoDTO extends PartialType(newsDTO) {}