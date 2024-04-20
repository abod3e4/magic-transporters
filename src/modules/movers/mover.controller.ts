import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MoversService } from './mover.service';
import { CreateMoverDto } from './dto/create-mover.dto';
import { LoadMoverDto } from './dto/load-mover.dto';
import { UpdateMoverStateDto } from './dto/update-mover-state.dto';

@Controller('movers')
export class MoversController {
    constructor(private readonly moversService: MoversService) {}

    @Post()
    async createNewMover(@Body() createMoverDto: CreateMoverDto) {
        return await this.moversService.createMover(createMoverDto);
    }

    @Get()
    async getAllMovers() {
        return await this.moversService.getMovers();
    }

    @Post('load/:id')
    async loadMover(
        @Param('id') id: string,
        @Body() loadMoverDto: LoadMoverDto,
    ) {
        return await this.moversService.loadMover(id, loadMoverDto);
    }

    @Put('start/:id')
    async updateState(
        @Param('id') id: string,
        @Body() updateMoverStateDto: UpdateMoverStateDto,
    ) {
        return await this.moversService.updateMoverState(
            id,
            updateMoverStateDto,
        );
    }

    @Get('end/:id')
    async endMission(@Param('id') id: string) {
        return await this.moversService.endMoverMission(id);
    }

    @Get('/most_completed')
    async getMoversWithMostCompletedMissions() {
        return await this.moversService.moversWithMostCompletedMissions()
    }
}
