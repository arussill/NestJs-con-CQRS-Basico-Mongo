import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientCreatedEvent } from '../impl/client-created.event';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ClientCreated } from '../../entities/client-created.entity';

/**
 * Este es el manejador de eventos
 */

@EventsHandler(ClientCreatedEvent)
export class ClientCreatedHandler implements IEventHandler<ClientCreatedEvent> {
  constructor(
    @InjectModel(ClientCreated.name)
    private readonly clientModel: Model<ClientCreated>,
  ) {}
  async handle(clientCreatedEvent: ClientCreatedEvent) {
    const client = await this.clientModel.create(
      clientCreatedEvent.createClientDto,
    );
    return client;
  }
}
