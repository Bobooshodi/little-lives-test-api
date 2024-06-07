import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';

export class BaseModel {
  @AutoMap()
  @IsNotEmpty()
  id: string;

  @AutoMap()
  @IsNotEmpty()
  createdDate: Date;

  @AutoMap()
  @IsNotEmpty()
  updatedDate: Date;

  @AutoMap()
  deletedDate: Date;
}
