
import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
// import { Exclude, Expose } from 'class-transformer';
import { SubscriberProps } from '@t5mm-com/shared';

@Entity('subscribers', {
	orderBy: {
		name: 'ASC'
	}
})
export class SubscribersEntity extends BaseEntity implements SubscriberProps {

	@Index()
	@Column({ unique: true })
	email: string;

	@Column({ type: 'timestamptz', nullable: true })
	verifiedAt?: Date;

}
