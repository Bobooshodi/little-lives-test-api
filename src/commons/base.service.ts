import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

export abstract class BaseService<Entity, Model> extends AutomapperProfile {
  protected constructor(
    @InjectMapper() mapper: Mapper,
  ) {
    super(mapper);
  }

  protected repository;
  protected entity;
  protected model;

  async findAll(): Promise<Model[]> {
    const records: Entity[] = await this.repository.find();

    return this.mapper.mapArray(records, this.entity, this.model);
  }

  async findOne(id: number): Promise<Model | null> {
    const record: Entity = await this.repository.findOneBy({ id });
    return this.mapper.map(record, this.entity, this.model);
  }

  async remove(id: number): Promise<any> {
    await this.repository.delete(id);
  }
}
