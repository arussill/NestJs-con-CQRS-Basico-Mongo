import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientModule,
    MongooseModule.forRoot(process.env.MONGODB),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
