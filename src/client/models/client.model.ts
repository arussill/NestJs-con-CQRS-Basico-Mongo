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

    this.apply(new ClientCreatedEvent(createClientDto));

  }


  //Todo: comprar helado evento
}
