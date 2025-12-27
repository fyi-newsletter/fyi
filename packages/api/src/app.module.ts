import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscribersModule } from './subscribers/subscribers.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
	imports: [SubscribersModule, SubscriptionsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
