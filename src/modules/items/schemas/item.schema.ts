import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true,
})
export class Item extends Document {
    @Prop()
    name : string;
 
    @Prop()
    weight: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
