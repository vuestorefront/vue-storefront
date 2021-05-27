import { Value } from './value.interface';

export interface MutableValue extends Value {
  isNew: boolean
}
