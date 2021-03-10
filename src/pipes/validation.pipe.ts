import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this._toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }

  private _toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Object, Array, Number];

    return !types.includes(metatype);
  }
}
