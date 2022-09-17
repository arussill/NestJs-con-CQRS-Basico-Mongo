import { CreateClientDto } from '../../dto/create-client.dto';

export class ClientCreatedEvent {
  constructor(public readonly createClientDto: CreateClientDto) {}
}
