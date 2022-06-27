import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.itemsModel.find().exec();
  }

  async findOne(id: string): Promise<Items> {
    const item = await this.itemsModel.findOne({_id: id}).exec();
    if(!item) throw new NotFoundException("Item Not Exists");
    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Items> {
    return await this.itemsModel.findOneAndUpdate({_id: id},updateItemDto).exec();
  }

  async remove(id: string): Promise<Items> {
    const item = await this.itemsModel.findOneAndDelete({_id: id}).exec();
    if(!item) throw new NotFoundException("Item Not Exists");
    return item;
  }
}
