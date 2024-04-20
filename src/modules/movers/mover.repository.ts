import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { EntityRepository } from 'src/common/repository/entity.repository';
import { Mover } from './schemas/mover.schema';

@Injectable()
export class MoversRepository extends EntityRepository<Mover> {
  constructor(@InjectModel(Mover.name) moverModel: Model<Mover>) {
    super(moverModel);
  }
}
