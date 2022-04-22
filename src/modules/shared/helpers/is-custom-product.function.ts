/* budsies_general_general/product/old_budsie_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/old_selfie_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_budsie_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_selfie_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_bulk_sample_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_specialty_commission_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_petsie_cat_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_petsie_dog_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_petsie_other_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_huggables_cat_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_huggables_dog_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_huggables_other_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_forevers_cat_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_forevers_dog_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_forevers_other_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_waggables_dog_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/crayola_bundle_imaginable_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_pillow_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_buddy_pillow_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_bulk_pillow_sample_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_pals_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_printed_socks_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_printed_masks_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_printed_keychains_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_felted_magnets_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_phrase_pillow_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_petsies_phrase_pillow_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_budsies_puppet_id'),
            (int)Mage::getStoreConfig('budsies_general_general/product/bundle_selfies_puppet_id'), */

const customProductsSkus = ['customPrintedSocks_bundle'];

export default function isCustomProduct (productSku: string): boolean {
  return customProductsSkus.includes(productSku);
}
