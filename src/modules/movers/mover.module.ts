import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mover, MoverSchema } from './schemas/mover.schema';
import { MoversController } from './mover.controller';
import { MoversService } from './mover.service';
import { MoversRepository } from './mover.repository';
import { ItemModule } from '../items/items.module';
import { LoggerService } from 'src/common/util/logging.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Mover.name, schema: MoverSchema }]),
        ItemModule
    ],
    controllers: [MoversController],
    providers: [MoversService, MoversRepository, LoggerService],
    exports: [MoversService],
})
export class MoverModule {}
