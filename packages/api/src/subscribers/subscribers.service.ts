import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OmitBase, SubscriberProps } from '@t5mm-com/shared';
import { SubscribersEntity } from './subscribers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscribersService {
  private readonly logger = new Logger(SubscribersService.name);

  constructor(
    @InjectRepository(SubscribersEntity)
    private subscribersRepository: Repository<SubscribersEntity>,
  ) {}

  async create(
    subscriber: OmitBase<SubscriberProps>,
  ): Promise<SubscribersEntity> {
    this.logger.log(`Creating subscriber: ${JSON.stringify(subscriber)}`);
    return this.subscribersRepository.save(subscriber);
  }

  findOneByEmail(
    email: SubscriberProps['email'],
  ): Promise<SubscriberProps | null> {
    return this.subscribersRepository.findOneBy({ email });
  }

  async findOneOrCreate(email: string): Promise<SubscriberProps> {
    let subscriber = await this.findOneByEmail(email);

    if (!subscriber) {
      subscriber = await this.create({ email });
    }

    return subscriber;
  }
}
