import { Injectable, NotFoundException } from '@nestjs/common';
import { Property, PropertyDocument } from './schemas/property.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EnumTrueFalse } from 'src/common/enums/common.enum';
import { UpdatePropertyDto } from './dto/update.dto';
import { CreatePropertyDto } from './dto/create.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name)
    private propertyModel: Model<PropertyDocument>,
  ) {}
  async create(data: CreatePropertyDto): Promise<Property> {
    const property = new this.propertyModel(data);
    return property.save();
  }
  async findAll(): Promise<Property[]> {
    return this.propertyModel
      .find({
        $or: [
          { isDeleted: EnumTrueFalse.NO },
          { isDeleted: { $exists: false } },
        ],
      })
      .exec();
  }
  async findOne(id: string): Promise<Property | null> {
    const property = await this.propertyModel.findById(id);
    console.log(id);
    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }
  async update(data: UpdatePropertyDto): Promise<{ propertyId: string }> {
    const { propertyId, ...rest } = data;
    const property = await this.propertyModel
      .findByIdAndUpdate(propertyId, rest, {
        runValidators: true,
      })
      .exec();
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return { propertyId };
  }
  async delete(id: string): Promise<{ propertyId: string }> {
    const property = await this.propertyModel
      .findByIdAndUpdate(
        id,
        { isDeleted: EnumTrueFalse.YES },
        {
          runValidators: true,
        },
      )
      .exec();
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return { propertyId: id };
  }
}
