import { Injectable } from '@nestjs/common';
import { Property, PropertyDocument } from './schemas/property.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EnumTrueFalse } from 'src/common/enums/common.enum';
import { UpdatePropertyDto } from './dto/update.dto';
import { CreatePropertyDto } from './dto/create.dto';
import { FilterPropertiesDto } from './dto/filter.dto';
import { pagination } from 'src/common/utils/pagination.util';
import { ResponseType } from 'src/types';
import { Helper } from 'src/common/helpers';
import { ResponseCode } from 'src/common/enums/responseCode';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name)
    private propertyModel: Model<PropertyDocument>,
  ) {}
  async create(data: CreatePropertyDto): Promise<ResponseType<Property>> {
    const property = new this.propertyModel(data);
    await property.save();
    return Helper.response(property);
  }
  async findAll(
    query?: FilterPropertiesDto,
  ): Promise<ResponseType<{ list: Property[]; total: number }>> {
    const searchField: Array<keyof Property> = ['title', 'address'];
    const filter = {
      isDeleted: { $ne: EnumTrueFalse.YES },
    };
    if (query?.search) {
      filter['$or'] = searchField.map((key) => ({
        [key]: { $regex: query.search, $options: 'i' },
      }));
    }
    let list = this.propertyModel.find(filter);
    list = pagination(list, query?.page, query?.take);
    const total = await this.propertyModel.countDocuments(filter);
    return Helper.response({ list: await list.exec(), total });
  }
  async findOne(id: string): Promise<ResponseType<Property | null>> {
    const property = await this.propertyModel.findById(id);
    if (!property) {
      return Helper.response(
        null,
        ResponseCode.NOT_FOUND,
        'Property not found',
      );
    }

    return Helper.response(property);
  }
  async update(
    data: UpdatePropertyDto,
  ): Promise<ResponseType<{ propertyId: string } | null>> {
    const { propertyId, ...rest } = data;
    const property = await this.propertyModel
      .findByIdAndUpdate(propertyId, rest, {
        runValidators: true,
      })
      .exec();
    if (!property) {
      return Helper.response(
        null,
        ResponseCode.NOT_FOUND,
        'Property not found',
      );
    }
    return Helper.response({ propertyId });
  }
  async delete(id: string): Promise<ResponseType<null>> {
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
      return Helper.response(
        null,
        ResponseCode.NOT_FOUND,
        'Property not found',
      );
    }
    return Helper.response(null);
  }
}
