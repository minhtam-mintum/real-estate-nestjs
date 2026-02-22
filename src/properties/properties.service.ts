import { Injectable } from '@nestjs/common';
import { Property, PropertyDocument } from './schemas/property.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name)
    private propertyModel: Model<PropertyDocument>,
  ) {}
  async create(data: Partial<Property>): Promise<Property> {
    const property = new this.propertyModel(data);
    return property.save();
  }
  async findAll(): Promise<Property[]> {
    return this.propertyModel.find().exec();
  }
}
