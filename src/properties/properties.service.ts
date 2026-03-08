import { Injectable, NotFoundException } from '@nestjs/common';
import { Property, PropertyDocument } from './schemas/property.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EnumTrueFalse } from 'src/common/enums/common.enum';
import { UpdatePropertyDto } from './dto/update.dto';
import { CreatePropertyDto } from './dto/create.dto';
import { FilterPropertiesDto } from './dto/filter.dto';
import { pagination } from 'src/common/utils/pagination.util';

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
  async findAll(
    query?: FilterPropertiesDto,
  ): Promise<{ list: Property[]; total: number }> {
    const searchField: Array<keyof Property> = ['title', 'address'];
    const filter = {
      isDeleted: { $ne: EnumTrueFalse.YES },
      $or: searchField.map((key) => ({
        [key]: { $regex: query?.search, $options: 'i' },
      })),
    };
    let list = this.propertyModel.find(filter);
    list = pagination(list, query?.page, query?.take);
    const total = await this.propertyModel.countDocuments(filter);
    return { list: await list.exec(), total };
  }
  async findOne(id: string): Promise<Property | null> {
    const property = await this.propertyModel.findById(id);
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
