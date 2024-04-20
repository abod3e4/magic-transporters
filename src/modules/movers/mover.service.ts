import {
    BadRequestException,
    HttpException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { MoversRepository } from './mover.repository';
import { CreateMoverDto } from './dto/create-mover.dto';
import { ItemsService } from '../items/items.service';
import mongoose, { Types } from 'mongoose';
import { LoadMoverDto } from './dto/load-mover.dto';
import { QuestState } from './enums/quest-state.enum';
import { log } from 'console';
import { LoggerService } from 'src/common/util/logging.service';
import { UpdateMoverStateDto } from './dto/update-mover-state.dto';

@Injectable()
export class MoversService {
    constructor(
        private readonly moversRepository: MoversRepository,
        private readonly itemsService: ItemsService,
        private readonly logger: LoggerService,
    ) {}

    async createMover(createMoverDto: CreateMoverDto) {
        return await this.moversRepository.create(createMoverDto);
    }

    async getMover(id: string) {
        return await this.moversRepository.findOne({ _id: id });
    }

    async getMovers() {
        return await this.moversRepository.find();
    }

    async loadMover(id: string, { items }: LoadMoverDto) {
        let mover = await this.getMover(id);
        if (!mover) throw new NotFoundException('Mover not found.');

        let newWeight = mover.currentWeight;
        let newEnergy = mover.currentEnergy;
        let newItems: mongoose.Schema.Types.ObjectId[] = [];

        // Check if mover can carry more
        if (!mover.canCarryMore && mover.questState == QuestState.ON_A_MISSION)
            throw new BadRequestException(
                'The mover state is on a mission, so it can not carry more.',
            );

        for (const id of items) {
            let item = await this.itemsService.getItem(id);

            if (
                mover.canCarryMore &&
                mover.currentWeight < mover.weightLimit &&
                mover.currentEnergy < mover.energy
            ) {
                newWeight += item.weight;
                newEnergy += item.weight;
                newItems.push(item._id);

                if (newWeight > mover.weightLimit || newEnergy > mover.energy) {
                    throw new BadRequestException(
                        'you can not add all these items',
                    );
                }
            }
        }

        this.logger.log(new Date().toLocaleString() + ' loading state.');

        return await this.moversRepository.findOneAndUpdate(
            { _id: mover._id },
            {
                currentWeight: newWeight,
                currentEnergy: newEnergy,
                items: newItems,
                questState: QuestState.LOADING,
            },
        );
    }

    async updateMoverState(id: string, { questState }: UpdateMoverStateDto) {
        let mover = await this.getMover(id);

        if (!mover) throw new NotFoundException('Mover not found.');

        if (mover.currentEnergy == 0 && mover.items.length == 0)
            throw new BadRequestException(
                'Can not start mission because it does not carry any item.',
            );

        mover = await this.moversRepository.findOneAndUpdate(
            { _id: id },
            {
                canCarryMore: false,
                questState,
            },
        );

        this.logger.log(new Date().toLocaleString() + ` on a mission.`);
        return mover;
    }

    async endMoverMission(id: string) {
        let mover = await this.getMover(id);

        if (!mover) throw new NotFoundException('Mover not found.');

        if (mover.questState == QuestState.RESTING)
            throw new BadRequestException(
                'Can not end mission because the mover state is Resting',
            );

        if (mover.questState == QuestState.LOADING)
            throw new BadRequestException(
                'Can not end mission because the mover is Loading items and the mission does not started.',
            );

        if (mover.questState == QuestState.DONE && mover.items.length == 0)
            throw new BadRequestException(
                'The mission is ended and the state is Done, add some item to mover.',
            );

        mover = await this.moversRepository.findOneAndUpdate(
            { _id: mover._id },
            {
                questState: QuestState.DONE,
                currentWeight: 0,
                currentEnergy: 0,
                canCarryMore: true,
                missionsCompletedCount: mover.missionsCompletedCount + 1,
                items: [],
            },
        );
        this.logger.log(new Date().toLocaleString() + ` mission complete / done.`);
        return mover;
    }

    async moversWithMostCompletedMissions() {
        return await this.moversRepository.find(
            {},
            { sort: { missionsCompletedCount: -1 } },
        );
    }
}
