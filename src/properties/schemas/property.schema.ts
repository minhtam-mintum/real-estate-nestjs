import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EnumTrueFalse } from 'src/common/enums/common.enum';
import { LegalStatus } from 'src/common/enums/propertyStatus.enum';

export type PropertyDocument = Property & Document;
@Schema({ timestamps: true })
export class Property {
  @Prop()
  propertyId!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  area!: number;

  @Prop({ required: true })
  address!: string;

  @Prop({ enum: LegalStatus, required: true })
  legalStatus!: LegalStatus;

  @Prop({ default: EnumTrueFalse.NO })
  isDeleted!: EnumTrueFalse;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
PropertySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    const { _id, ...rest } = ret;
    rest.propertyId = _id.toString();
    return rest;
  },
});
