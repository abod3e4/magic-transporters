import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Item } from 'src/modules/items/schemas/item.schema';
import { QuestState } from '../enums/quest-state.enum';

@Schema({
    timestamps: true,
})
export class Mover extends Document {
    @Prop({ type: Number, required: true })
    weightLimit: number;

    @Prop({ type: Number, required: true })
    energy: number;

    @Prop({ type: String, default: QuestState.RESTING })
    questState: string;

    @Prop({ type: Number, required: false, default: 0 })
    currentWeight: number;

    @Prop({ type: Number, required: false, default: 0 })
    currentEnergy: number;

    @Prop({ type: Boolean, required: false, default: 1 })
    canCarryMore: boolean;

    @Prop({ type: Number, required: false, default: 0 })
    missionsCompletedCount : number;

    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        ref: Item.name,
        default: [],
    })
    items: mongoose.Schema.Types.ObjectId[];
}

export const MoverSchema = SchemaFactory.createForClass(Mover);
