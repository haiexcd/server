/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { News } from 'src/Entities/news.entity';
import { NewsService } from './news.service';
import { Model } from 'mongoose';
import { updateNewsInfoDTO } from './dto/news.dto';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    @InjectModel(News.name) private readonly newsModel: Model<News>,
  ) {}



    @Get('/')
    async getAllNewsFeedStory() : Promise<object> {
        const news = await this.newsModel.find()
        console.log(news)
        return news
    }


    @Post('/')
    async postNewsFeedStory(@Body() body: updateNewsInfoDTO) : Promise<object> {
        const news = new this.newsModel({ 
            publisherName: body.publisherName,
            publisherTime: body.publisherTime,
            comment: body.comment,
            content: body.content,
            likedIdList: body.likedIdList,
        })
        console.log(news)
        await news.save()
        return news
    }

}


