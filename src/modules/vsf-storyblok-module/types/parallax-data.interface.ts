import ItemData from './item-data.interface';

export default interface ParallaxData extends ItemData {
  direction: 'up' | 'down'
}
