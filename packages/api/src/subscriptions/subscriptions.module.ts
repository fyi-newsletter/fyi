import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { SubscribersModule } from 'src/subscribers/subscribers.module';

@Module({
	imports: [SubscribersModule],
	controllers: [SubscriptionsController],
	providers: [SubscriptionsService]
})
export class SubscriptionsModule { }
