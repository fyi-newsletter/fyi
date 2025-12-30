import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { SubscribersEntity } from './subscribers.entity';

@EventSubscriber()
export class SubscribersSubscriber implements EntitySubscriberInterface<SubscribersEntity> {
  listenTo() {
    return SubscribersEntity;
  }

  afterInsert(event: InsertEvent<SubscribersEntity>) {
    const wwwHost = process.env.WWW_HOST;
    const verificationLink = `${wwwHost}/subscribers/verify?token=${event.entity.uuid}`;
    console.log('Send verification link via email');
    console.log(verificationLink);
  }
}
