import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Post()
    async createNewItem(@Body()createItemDto: CreateItemDto) {
        return await this.itemsService.createItem(createItemDto);
    }

    @Get()
    async getAllItems(){
        return await this.itemsService.getItems()
    }
}
