import { Injectable, NotFoundException } from '@nestjs/common';

import { ItemsRepository } from './items.repository';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
    constructor(private readonly itemsRepository: ItemsRepository) {}

    async createItem(createItemDto: CreateItemDto) {
        return await this.itemsRepository.create(createItemDto);
    }

    async getItem(id: string) {
        return await this.itemsRepository.findOne({ _id: id });
    }

    async getItems() {
        return await this.itemsRepository.find();
    }
}
