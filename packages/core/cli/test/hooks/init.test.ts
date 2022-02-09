import {expect, test} from '@oclif/test'
import {t} from 'i18next'

describe('hooks', () => {
  test
  .hook('init')
  .do(() => {
    expect(t('command.store_create.description')).to.be.equal('Create a new Vue Storefront store.')
  })
  .it('initializes i18next')
})
