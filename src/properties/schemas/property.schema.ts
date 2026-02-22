import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyDocument = Property & Document;

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  area!: number;

  @Prop({ required: true })
  address!: string;

  @Prop({ enum: ['SO_RIENG', 'SO_CHUNG', 'K99'], required: true })
  legalStatus!: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
