/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Content {
    @Prop()
    image: string;

    @Prop()
    text: string;

    @Prop()
    video: string;
}

@Schema()
export class LikedIdList {
    @Prop()
    userId: string;
}

@Schema() 
export class Comment {
    @Prop()
    content: Content;

    @Prop()
    publisherName: string;

    @Prop()
    publishedTime: Date;
}

@Schema()
export class LikeList {
    @Prop()
    publisherName: string;

    @Prop()
    publisherTime: Date;

    @Prop()
    content: Content;
}

@Schema()
export class News {
    @Prop()
    publisherName: string;

    @Prop()
    publisherTime: Date;

    @Prop()
    content: Content;

    @Prop([Comment])
    comment: [Comment];

    @Prop([LikedIdList])
    likedIdList: [LikedIdList];
}


export const NewsSchema = SchemaFactory.createForClass(News)