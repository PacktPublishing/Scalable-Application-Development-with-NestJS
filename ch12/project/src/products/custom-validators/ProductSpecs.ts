import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ProductSpecs', async: false })
export class ProductSpecs implements ValidatorConstraintInterface {
  accepetedSpecs = [
    'ram',
    'processor',
    'ssd',
    'hdd',
    'brand',
    'model',
    'color',
    'weight',
    'dimensions',
    'material',
    'capacity',
    'power',
    'voltage',
    'warranty',
    'condition',
    'chip',
    'year',
    'other_features',
    // we can support more specs as the application grows
  ];

  validate(specs: Record<string, string>) {
    const keys = Object.keys(specs);
    if (keys.length === 0) return true; // no specs provided

    return keys.every(
      (key) => this.accepetedSpecs.includes(key) && specs[key].trim() !== '',
    );
  }

  defaultMessage() {
    return 'Product specs must be a valid object with supported specs';
  }
}
