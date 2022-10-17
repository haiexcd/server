import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from 'src/Entities/news.entity';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      '',
      [],
    ),
    MongooseModule.forFeature([
      {
        name: News.name,
        schema: NewsSchema,
      },
    ]),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
