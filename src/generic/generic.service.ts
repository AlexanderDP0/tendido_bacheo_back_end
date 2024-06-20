import * as moment from 'moment';

import { FilterOneArgs, Sort } from 'src/user/filter';
import { FilterQuery, Model } from 'mongoose';

import { ObjectId } from 'mongodb';

interface QueryOptions<T> {
  limit?: number;
  skip?: number;
  sort?: { [P in keyof T]?: 1 | -1 } | Sort | any;
}

export abstract class GenericService<T> {
  constructor(private model: Model<T>) {}

  async create(item: T): Promise<T> {
    item['createdAt'] = moment().utc().toDate();
    try {
      return (await new this.model(item).save()) as T;
    } catch (e) {
      return;
    }
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    item['updatedAt'] = moment().utc().toDate();
    try {
      await this.model.findByIdAndUpdate(id, item).exec();
      return await this.model.findById(id);
    } catch (e) {
      return;
    }
  }

  async delete(_id: string): Promise<T> {
    try {
      return await this.model.findOneAndDelete({ _id }).exec();
    } catch (e) {
      return;
    }
  }

  async findOneById(filter: FilterOneArgs<T>): Promise<T> {
    try {
      if (filter.where) {
        return await this.model.findOne(filter.where).exec();
      }
      return await this.model.findById(filter.id).exec();
    } catch (e) {
      return;
    }
  }

  async find(
    where?: FilterQuery<T>,
    { skip, limit, sort }: QueryOptions<T> = {
      skip: 0,
      limit: 0,
      sort: null,
    },
  ): Promise<T[]> {
    try {
      return this.model
        .find(this.parseFilter(where))
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .exec();
    } catch (e) {
      return;
    }
  }

  async count(where?: FilterQuery<T>): Promise<number> {
    try {
      return await this.model.countDocuments(where);
    } catch (e) {
      return;
    }
  }

  protected reviver(_key: string, value: unknown) {
    try {
      const dateFormat =
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.{0,1}\d*))(?:Z|(\+|-)([\d|:]*))?$/;
      if (typeof value === 'string' && dateFormat.test(value)) {
        return new Date(value);
      } else if (typeof value === 'string' && ObjectId.isValid(value)) {
        const val = new ObjectId(value);

        if (val?.toString() === value) {
          return val;
        }
      }
      return value;
    } catch {
      return value;
    }
  }

  protected parseFilter(filter: FilterQuery<T>): FilterQuery<T> {
    return filter ? JSON.parse(JSON.stringify(filter), this.reviver) : filter;
  }
}
