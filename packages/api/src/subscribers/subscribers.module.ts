import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersEntity } from './subscribers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribersController } from './subscribers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubscribersEntity])],
  providers: [SubscribersService],
  controllers: [SubscribersController],
  exports: [SubscribersService],
})
export class SubscribersModule {}
