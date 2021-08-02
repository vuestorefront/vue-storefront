import { SizeValue } from './types/size.value';

type SizeSpecification = {
  [key in SizeValue]: number;
}

export type ColumnsSpecification = {
  [key in SizeValue]?: number
}

export default class ComponentWidthCalculator {
  private readonly breakpoints: SizeSpecification

  public constructor (
    private readonly widths: SizeSpecification,
    calculator?: ComponentWidthCalculator
  ) {
    if (!calculator) {
      this.breakpoints = { ...this.widths };
    } else {
      this.breakpoints = calculator.getBreakpoints();
    }
  }

  public getWidths (): SizeSpecification {
    return { ...this.widths };
  }

  public getBreakpoints (): SizeSpecification {
    return { ...this.breakpoints };
  }

  public limitSize (value: number): ComponentWidthCalculator {
    const newWidths = { ...this.widths };

    for (let size in newWidths) {
      const sizeKey = size as SizeValue;
      if (newWidths[sizeKey] <= value) {
        continue;
      }

      newWidths[sizeKey] = value;
    }

    return new ComponentWidthCalculator(newWidths, this);
  }

  public reduceSizes (columnsSpec: ColumnsSpecification): ComponentWidthCalculator {
    const newWidths = { ...this.widths };

    for (let size in columnsSpec) {
      const sizeKey = size as SizeValue;
      const columnsCount = columnsSpec[sizeKey];

      if (!columnsCount) {
        continue;
      }

      newWidths[sizeKey] = Math.round(newWidths[sizeKey] / columnsCount);
    }

    return new ComponentWidthCalculator(newWidths, this);
  }

  public multiplySizes (columnsSpec: ColumnsSpecification): ComponentWidthCalculator {
    const newWidths = { ...this.widths };

    for (let size in columnsSpec) {
      const sizeKey = size as SizeValue;
      const columnsCount = columnsSpec[sizeKey];

      if (!columnsCount) {
        continue;
      }

      newWidths[sizeKey] = newWidths[sizeKey] * columnsCount;
    }

    return new ComponentWidthCalculator(newWidths, this);
  }

  public limitAllByPercent (percent: number): ComponentWidthCalculator {
    const newWidths = { ...this.widths };

    for (let size in newWidths) {
      const sizeKey = size as SizeValue;

      newWidths[sizeKey] = Math.round(newWidths[sizeKey] * percent / 100);
    }

    return new ComponentWidthCalculator(newWidths, this);
  }
}
