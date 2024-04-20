import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/repository/entity.repository';
import { Item } from './schemas/item.schema';

@Injectable()
export class ItemsRepository extends EntityRepository<Item> {
    constructor(@InjectModel(Item.name) itemModel: Model<Item>) {
        super(itemModel);
    }
}
