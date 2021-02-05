import { formatAttributeList } from './../../src/getters/_utils';

describe('[commercetools-getters] internal utilities helpers', () => {
  const attributesRaw = [
    { attributeDefinition: { type: { name: 'text' } }, value: 'val', name: 'color', _translated: 'val' },
    { attributeDefinition: { type: { name: 'date' } }, value: 'val', name: 'name', _translated: 'val' },
    { attributeDefinition: { type: { name: 'datetime' } }, value: 'val', name: 'name', _translated: 'val' },
    { attributeDefinition: { type: { name: 'time' } }, value: 'val', name: 'name', _translated: 'val' },
    { attributeDefinition: { type: { name: 'number' } }, value: 'val', name: 'name', _translated: 'val' },
    { attributeDefinition: { type: { name: 'enum' } }, value: { label: 'Val', key: 'val' }, name: 'name', _translated: 'val' },
    { attributeDefinition: { type: { name: 'lenum' } }, value: { label: { en: 'Val' }, key: 'val' }, name: 'name', _translated: 'val' },
    { attributeDefinition: { type: { name: 'ltext' } }, value: { en: 'Val' }, name: 'name', _translated: 'val' },
    { attributeDefinition: { type: { name: 'money' } }, value: 'val', name: 'name', _translated: 'val' },
    { attributeDefinition: { type: { name: 'boolean' } }, value: 'val', name: 'name', _translated: 'val' },
    { attributeDefinition: { type: { name: 'reference' } }, value: { id: 'val', typeId: 'val' }, name: 'name', _translated: null },
    { attributeDefinition: { type: { name: 'uknnowb' } }, value: null, name: 'name', _translated: null }
  ];

  it('transforms custom value attribute fields to normalized "value" and copies "value" to "label" if it is empty', () => {
    const normalziedAttributeList = [
      { value: 'val', name: 'color', label: 'val' },
      { value: 'val', name: 'name', label: 'val' },
      { value: 'val', name: 'name', label: 'val' },
      { value: 'val', name: 'name', label: 'val' },
      { value: 'val', name: 'name', label: 'val' },
      { value: 'val', name: 'name', label: 'val' },
      { value: 'val', name: 'name', label: 'val' },
      { value: { en: 'Val'}, name: 'name', label: 'val' },
      { value: 'val', name: 'name', label: 'val' },
      { value: 'val', name: 'name', label: 'val' },
      { value: { typeId: 'val', id: 'val' }, name: 'name', label: null },
      { value: null, name: 'name', label: null }
    ];
    expect(formatAttributeList(attributesRaw)).toEqual(normalziedAttributeList);
  });
});
