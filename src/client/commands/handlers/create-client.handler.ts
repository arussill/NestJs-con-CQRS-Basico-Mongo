import {} from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Client } from '../../../client/models/client.model';
import { CreateClientCommand } from '../impl/create-client.command';

/**
 * Este es el que escucha a los comandos
 */

@CommandHandler(CreateClientCommand)
export class CreateClientHandler
  implements ICommandHandler<CreateClientCommand>
{
  constructor(private readonly eventPublisher: EventPublisher) {}
  async execute(createClientcommand: CreateClientCommand): Promise<any> {
    const { idDocument, name, lastName } = createClientcommand.createClientDto;
    /**
     * El mergeObjectContext une la instancia creada de cliete con los eventos para luego publicarlos
     */
    const client = await this.eventPublisher.mergeObjectContext(
      new Client(idDocument, name, lastName),
    );

    //Aqui la instancia ya puede hacer uso o llamado de los eventos (lo prepara) pero no lo ejecuta
    client.createNewClient(createClientcommand.createClientDto);

    //este ejecuta el evento
    client.commit();

    // return client;
  }
}
