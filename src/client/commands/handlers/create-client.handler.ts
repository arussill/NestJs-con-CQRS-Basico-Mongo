import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientCreated } from 'src/client/entities/client-created.entity';
import { Client } from '../../../client/models/client.model';
import { CreateClientCommand } from '../impl/create-client.command';

/**
 * Este es el que escucha a los comandos
 */

@CommandHandler(CreateClientCommand)
export class CreateClientHandler
  implements ICommandHandler<CreateClientCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,

    @InjectModel(ClientCreated.name)
    private readonly clientModel: Model<ClientCreated>,) { }

  async execute(createClientcommand: CreateClientCommand): Promise<any> {

    const { idDocument, name, lastName } = createClientcommand.createClientDto;

    const existClient = await this.clientModel.exists({ idDocument })

    if (existClient) {
      throw new BadRequestException(`Ya existe el idDocument ${idDocument}`);
    }

    /**
     * El mergeObjectContext une la instancia creada de cliete con los eventos para luego publicarlos
     */
    const client = await this.eventPublisher.mergeObjectContext(
      new Client(idDocument, name, lastName),
    );

    //Aqui la instancia ya puede hacer uso o llamado de los eventos (lo prepara) pero no lo ejecuta
    client.createNewClient(createClientcommand.createClientDto);

    client.commit();

    return client;
  }
}
