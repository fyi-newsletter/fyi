import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OmitBase, SubscriberProps } from '@readfyi/shared';
import { SubscribersEntity } from './subscribers.entity';
import { Repository } from 'typeorm';
import { validate as isUuid } from 'uuid';

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

  findOne(uuidOrEmail: string): Promise<SubscriberProps | null> {
    return this.subscribersRepository.findOne({
      where: isUuid(uuidOrEmail)
        ? [{ uuid: uuidOrEmail }]
        : [{ email: uuidOrEmail }],
    });
  }

  async findOneOrCreate(email: string): Promise<SubscriberProps> {
    let subscriber = await this.findOne(email);

    if (!subscriber) {
      subscriber = await this.create({ email });
    }

    return subscriber;
  }

  async updateOne(
    uuidOrEmail: string,
    data: Omit<OmitBase<SubscriberProps>, 'email' | 'deletedAt'>,
  ) {
    const subscriber = await this.findOne(uuidOrEmail);

    if (!subscriber) throw new NotFoundException();

    return this.subscribersRepository.save(Object.assign(subscriber, data));
  }
}
