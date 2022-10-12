/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { News } from 'src/Entities/news.entity';
import { NewsService } from './news.service';
import { Model } from 'mongoose';
import { updateCommentInfoDTO, updateNewsInfoDTO } from './dto/news.dto';

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

    @Patch('/addComment/:_id')
    async addComment(@Param('_id') _id : string, @Body() body: updateCommentInfoDTO) : Promise<object> {
        const news = await this.newsModel.find(
            { _id: _id }
        )
        if (!news.length) {
            throw new BadRequestException('Story not found.')
        }
        const query = { _id: _id }
        const update = { 
            $push: {
                comment: {
                    publisherName: body.publisherName,
                    content: {
                        image: body.content.image,
                        video: body.content.video,
                        text: body.content.text,
                    },
                },
            },

        };
        const options = { upsert: false }
        await this.newsModel.updateOne(query, update, options)
        .then((result) => {
            const { matchedCount, modifiedCount } = result;
            if (matchedCount && modifiedCount) {
                console.log(`Successfully added a new comment.`);
            }
        })
        .catch((err) => console.error(`Failed to add comment: ${err}`));

        const newsUpdated = (await this.newsModel.find(query))[0];
        const comment = newsUpdated.comment[newsUpdated.comment.length - 1];
        return comment
    }


    @Delete('/deleteComment/:postId/:commentId')
    async deleteComment(@Param('postId') postId : string, @Param('commentId') commentId : string) : Promise<object> {
        try {
            const result = await this.newsModel.updateOne(
                { postId: postId },
                {
                    $pull: { comment: { commentId: commentId } },
                }
            );
            return result
        } catch (err) {
            console.log(err);
            throw new BadRequestException('Something went wrong');
        }
    }

}


