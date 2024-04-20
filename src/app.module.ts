import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoverModule } from './modules/movers/mover.module';
import { ItemModule } from './modules/items/items.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: process.env.DB_URI,
            }),
        }),
        MoverModule,
        ItemModule,
    ],

    controllers: [],
    providers: [],
})
export class AppModule {}
