import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from './client.controller';
import { ClientCreated, ClientSchema } from './entities/client-created.entity';
import { ClientCreatedHandler } from './events/handlers/client-created.handler';
import { CreateClientHandler } from './commands/handlers/create-client.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  controllers: [ClientController],
  providers: [ClientCreatedHandler, CreateClientHandler],
  imports: [
    ConfigModule,
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: ClientCreated.name,
        schema: ClientSchema,
      },
    ]),
  ],
})
export class ClientModule { }
