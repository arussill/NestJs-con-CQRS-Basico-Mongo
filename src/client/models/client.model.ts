import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientCreatedEvent } from '../events/impl/client-created.event';
/**
 * Este es el modelo del comando
 */
export class Client extends AggregateRoot {
  constructor(
    private readonly idDocument: string,
    private readonly name: string,
    private readonly lastName: string,
  ) {
    super();
  }

  //Metodo que lanza el evento ClientCreatedEvent
  createNewClient(createClientDto: CreateClientDto) {
    try {
      this.apply(new ClientCreatedEvent(createClientDto));
    } catch (error) {
      if (error.code == 11000) {
        throw new BadRequestException(
          `Client exists in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      throw new InternalServerErrorException(
        `Can't create Client - Check server logs`,
      );
    }
  }
  //Todo: comprar helado evento
}
