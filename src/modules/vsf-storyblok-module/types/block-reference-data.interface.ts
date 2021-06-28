import ItemData from './item-data.interface';

export default interface BlockReferenceData extends ItemData {
  reference: { content: { body: any } }
}
