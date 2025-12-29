import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersEntity } from './subscribers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forFeature([SubscribersEntity]),
	],
	providers: [SubscribersService],
	exports: [SubscribersService],
})
export class SubscribersModule { }
