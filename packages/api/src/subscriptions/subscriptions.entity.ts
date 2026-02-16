import {
  Entity,
  Column,
  Index,
  RelationId,
  ManyToOne,
  AfterLoad,
} from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { NewsletterEnum, SubscriptionProps } from '@fyi-newsletter/shared';
import { SubscribersEntity } from 'src/subscribers/subscribers.entity';

@Entity('subscriptions')
@Index(['subscriber', 'newsletter'], {
  unique: true,
  where: `"deletedAt" IS NULL`,
})
export class SubscriptionsEntity
  extends BaseEntity
  implements SubscriptionProps
{
  @RelationId((subscription: SubscriptionsEntity) => subscription.subscriber)
  subscriberUuid: string;

  @Column({ type: 'enum', enum: NewsletterEnum })
  newsletter: NewsletterEnum;

  @ManyToOne(
    () => SubscribersEntity,
    (subscriber) => subscriber.subscriptions,
    {
      onDelete: 'CASCADE',
      nullable: false,
      eager: true,
    },
  )
  subscriber: SubscribersEntity;

  @AfterLoad()
  loadComputedFields() {
    if (!this.subscriber) return;
  }
}
