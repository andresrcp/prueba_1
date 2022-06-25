import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Items, ItemsDocument } from './schema/items.schema';

@Injectable()
export class ItemsService {

  constructor(@InjectModel(Items.name) private itemsModel:Model<ItemsDocument>){

  }

  async create(createItemDto: CreateItemDto): Promise<Items> {
    const cretedItem = await this.itemsModel.create(createItemDto);
    return cretedItem;
  }

  async findAll(): Promise<Items[]> {
    return this.itemsModel.find().exec();
  }

  async findOne(id: string): Promise<Items> {
    return this.itemsModel.findOne({_id: id}).exec();
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  async remove(id: string) {
    const deletedItem = await this.itemsModel.findByIdAndRemove({_id: id}).exec();
    return `This action removes a #${id} item`;
  }
}
