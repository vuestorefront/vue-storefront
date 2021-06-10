import FileProcessingRepository from './file-processing.repository';
import ObjectBuilderInterface from './object-builder.interface';

export default class FileProcessingRepositoryFactory {
  private plushieBuilder: ObjectBuilderInterface;

  public constructor (plushieBuilder: ObjectBuilderInterface) {
    this.plushieBuilder = plushieBuilder;
  }

  public create (uploadUrl: string) {
    return new FileProcessingRepository(uploadUrl, this.plushieBuilder);
  }
}
