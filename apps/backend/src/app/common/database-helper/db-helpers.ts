import { Injectable } from '@nestjs/common';
import { Model, ModelCtor, WhereOptions, Order, Includeable } from 'sequelize';
import { tryCatch } from '../../utils/promise-wrapper';
import { AppException } from '../exception/app.exception';

@Injectable()
export class DatabaseHelpers {
  /**
   * Get records from database
   */
  async fnGet<T extends Model>(
    model: ModelCtor<T>,
    query: WhereOptions = {},
    include: Includeable[] = [],
    order: Order = [['id', 'DESC']]
  ): Promise<T[]> {
    const options: any = {
      where: query,
      order: order,
    };

    if (include.length > 0) {
      options.include = include;
    }

    const result = await tryCatch<T[]>(model.findAll(options));

    if (result.error) {
      throw AppException.serverError(result.error.message, result.error);
    }

    return result.data;
  }

  /**
   * Update records in database
   */
  async fnUpdate<T extends Model>(
    model: ModelCtor<T>,
    data: any,
    condition: WhereOptions
  ): Promise<boolean> {
    const result = await tryCatch<[number]>(
      model.update(data, { where: condition })
    );

    if (result.error) {
      throw AppException.serverError(result.error.message, result.error);
    }

    if (result.data[0] === 0) {
      throw AppException.notFound('No Record Found To Update');
    }

    return true;
  }

  /**
   * Create a record in database
   */
  async fnPost<T extends Model>(
    model: ModelCtor<T>,
    data: any
  ): Promise<T> {
    const result = await tryCatch<T>(model.create(data));

    if (result.error) {
      throw AppException.badRequest(result.error.message, result.error);
    }

    return result.data;
  }

  /**
   * Delete records from database
   */
  async fnDelete<T extends Model>(
    model: ModelCtor<T>,
    condition: WhereOptions
  ): Promise<boolean> {
    const result = await tryCatch<number>(
      model.destroy({ where: condition })
    );

    if (result.error) {
      throw AppException.badRequest(result.error.message, result.error);
    }

    if (result.data === 0) {
      throw AppException.notFound('No Record Found To Delete');
    }

    return true;
  }
}
