import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateClientCommand } from './commands/impl/create-client.command';
import { Client } from './models/client.model';

@Controller('clients')
export class ClientController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/create')
  async createClient(@Body() createClientDto: CreateClientDto): Promise<any> {
    return await this.commandBus.execute<CreateClientCommand, Client>(
      new CreateClientCommand(createClientDto),
    );
  }
}
