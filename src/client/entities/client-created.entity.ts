import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
/**
 * Este es el esquema de la base de datos
 */
@Schema({collection:'clients'})
export class ClientCreated extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  idDocument: string;

  @Prop()
  name: string;

  @Prop()
  lastName: string;
}
export const ClientSchema = SchemaFactory.createForClass(ClientCreated);
