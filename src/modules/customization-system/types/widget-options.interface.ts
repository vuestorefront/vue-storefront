import { WidgetOptionAlignment } from './widget-option-alignment.type';
import { WidgetOptionShape } from './widget-option-shape.type';

export interface WidgetOptions {
  alignment?: WidgetOptionAlignment,
  hideTitle?: boolean,
  placeholder?: string,
  shape?: WidgetOptionShape,
  useCompactSpacing?: boolean
}
