import { Entity, Column, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { SubscriberProps } from '@readfyi/shared';
import { SubscriptionsEntity } from 'src/subscriptions/subscriptions.entity';

@Entity('subscribers')
export class SubscribersEntity extends BaseEntity implements SubscriberProps {
  @Index()
  @Column({ unique: true })
  email: string;

  @Column({ type: 'timestamptz', nullable: true })
  verifiedAt?: Date;

  @OneToMany(
    () => SubscriptionsEntity,
    (subscription) => subscription.subscriber,
  )
  subscriptions?: SubscriptionsEntity[];
}
