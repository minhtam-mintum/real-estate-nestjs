import { Body, Controller, Get, Post } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { Property } from './schemas/property.schema';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}
  @Post()
  create(@Body() body: Partial<Property>) {
    return this.propertiesService.create(body);
  }
  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }
}
