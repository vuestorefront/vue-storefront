import { ObjectBuilderInterface } from 'src/modules/budsies';

import FileProcessingRepository from './file-processing.repository';
import Item from './item.model';
import ItemApiResponse from './item-api-response.interface';

export default class FileProcessingRepositoryFactory {
  public constructor (
    private itemBuilder: ObjectBuilderInterface<Item, ItemApiResponse>
  ) {}

  public create (uploadUrl: string) {
    return new FileProcessingRepository(uploadUrl, this.itemBuilder);
  }
}
