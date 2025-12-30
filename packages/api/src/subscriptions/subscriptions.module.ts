import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { SubscribersModule } from 'src/subscribers/subscribers.module';
import { SubscriptionsEntity } from './subscriptions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionsEntity]), SubscribersModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
