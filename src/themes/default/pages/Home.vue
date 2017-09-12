<template>
  <div id='hp'>
    Products:
    <ul id='example-1'>
      <li v-for='product in products'>
        {{ product._source.name[0] }} - {{ product._source.price[0].price }} <button v-on:click="addToCart(product)">Add to cart</button>
      </li>
    </ul>

    Cart:
    <ul id='example-2'>
      <li v-for='product in cartItems'>
        {{ product._source.name[0] }} - {{ product._source.price[0].price }}  - x{{ product.quantity }}
      </li>
    </ul>    

    Categories:
    <ul id='example-3'>
      <li v-for='cat in categories'>
        {{ cat.name }}
      </li>
    </ul>    

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { corePage } from 'lib/themes'

export default {
  computed: {
    cartItems () {
      return this.$store.state.cart.items
    },
    categories () {
      return this.$store.state.catalog.categories
    }

  },
  data () {
    return {
      products: [
        {
          '_index': 'vue_storefront_catalog',
          '_type': 'product',
          '_id': '5639',
          '_score': 1.0,
          '_source': {
            'entity_id': '5639',
            'attribute_set_id': '13',
            'type_id': 'simple',
            'sku': '6339957',
            'has_options': '0',
            'required_options': '0',
            'created_at': '2017-04-06 17:56:47',
            'updated_at': '2017-04-06 17:56:47',
            'visibility': '4',
            'price': [
              {
                'price': '77.0000',
                'original_price': '89.9900',
                'is_discount': true,
                'customer_group_id': '0'
              },
              {
                'price': '77.0000',
                'original_price': '89.9900',
                'is_discount': true,
                'customer_group_id': '1'
              },
              {
                'price': '77.0000',
                'original_price': '89.9900',
                'is_discount': true,
                'customer_group_id': '4'
              },
              {
                'price': '77.0000',
                'original_price': '89.9900',
                'is_discount': true,
                'customer_group_id': '5'
              }
            ],
            'category': [
              {
                'category_id': 2
              },
              {
                'category_id': 3,
                'is_parent': true,
                'name': 'Filmy'
              },
              {
                'category_id': 28,
                'is_parent': true,
                'name': 'Blu-ray'
              },
              {
                'category_id': 87,
                'is_parent': true,
                'name': 'komedia'
              }
            ],
            'name': [
              'Rekiny wojny (Blu-ray)'
            ],
            'image': [
              '/9/9/99906339957.jpg'
            ],
            'ean': [
              '7321999343767'
            ],
            'pkwiu': [
              'brak'
            ],
            'availability': [
              '5'
            ],
            'isbn': [
              'GBSY34376'
            ],
            'publishers_es': [
              '_63173_,_63173_'
            ],
            'producers_es': [
              '_63173_,_63173_'
            ],
            'directors_es': [
              '_19380_,_19380_'
            ],
            'actors_es': [
              '_15986_,_19771_,_19771_,_695_,_695_,_15986_'
            ],
            'status': [
              1
            ],
            'option_text_status': [
              'Enabled'
            ],
            'tax_class_id': [
              2
            ],
            'option_text_tax_class_id': [
              'Taxable Goods'
            ],
            'description': [
              'Film reżysera trylogii Kac Vegas. Historia dwóch kumpli (Jonah Hill i Miles Teller), którym udaje się wykorzystać mało znany projekt rządowy, pozwalający niewielkim firmom brać udział w przetargach na kontrakty dla amerykańskiej armii. Panowie zaczynają skromnie, ale wkrótce dorabiają się fortuny. Sytuacja zaczyna ich przerastać, gdy wygrywają kontrakt o wartości 300 mln USD na uzbrojenie wojska w Afganistanie. Aby go zrealizować, muszą podjąć współpracę z typami spod „ciemnej gwiazdy”.'
            ],
            'short_description': [
              'Film reżysera trylogii Kac Vegas. Historia dwóch kumpli (Jonah Hill i Miles Teller), którym udaje się wykorzystać mało znany projekt rządowy, pozwalający niewielkim firmom brać udział w przetargach na kontrakty dla amerykańskiej armii. Panowie zaczynają...'
            ],
            'special_price': [
              77
            ],
            'stock': {
              'is_in_stock': true,
              'qty': 0
            }
          }
        },
        {
          '_index': 'vue_storefront_catalog',
          '_type': 'product',
          '_id': '5632',
          '_score': 1.0,
          '_source': {
            'entity_id': '5632',
            'attribute_set_id': '13',
            'type_id': 'simple',
            'sku': '6339950',
            'has_options': '0',
            'required_options': '0',
            'created_at': '2017-04-06 17:56:38',
            'updated_at': '2017-04-06 17:56:38',
            'visibility': '4',
            'price': [
              {
                'price': '26.5000',
                'original_price': '29.9900',
                'is_discount': true,
                'customer_group_id': '0'
              },
              {
                'price': '26.5000',
                'original_price': '29.9900',
                'is_discount': true,
                'customer_group_id': '1'
              },
              {
                'price': '26.5000',
                'original_price': '29.9900',
                'is_discount': true,
                'customer_group_id': '4'
              },
              {
                'price': '26.5000',
                'original_price': '29.9900',
                'is_discount': true,
                'customer_group_id': '5'
              }
            ],
            'category': [
              {
                'category_id': 2
              },
              {
                'category_id': 3,
                'is_parent': true,
                'name': 'Filmy'
              },
              {
                'category_id': 13,
                'is_parent': true,
                'name': 'akcja i przygoda'
              },
              {
                'category_id': 46,
                'is_parent': true,
                'name': 'familijny'
              },
              {
                'category_id': 3101,
                'name': 'GRUPY'
              },
              {
                'category_id': 3283,
                'is_parent': true,
                'name': ' Filmowe przyjemności '
              },
              {
                'category_id': 3284,
                'is_parent': true,
                'name': ' Filmowy Dzień Dziecka na DVD '
              },
              {
                'category_id': 3373,
                'is_parent': true,
                'name': ' Kino akcji i przygody - najlepsze filmy dla młodzieży '
              }
            ],
            'name': [
              'Mój przyjaciel smok'
            ],
            'image': [
              '/9/9/99906339950.jpg'
            ],
            'ean': [
              '7321917506083'
            ],
            'pkwiu': [
              'brak'
            ],
            'availability': [
              '5'
            ],
            'isbn': [
              'DDS500608'
            ],
            'publishers_es': [
              '_63173_,_63173_,_63173_'
            ],
            'producers_es': [
              '_63173_,_63173_,_63173_'
            ],
            'directors_es': [
              '_68315_'
            ],
            'actors_es': [
              '_15190_,_20002_,_68313_,_68314_'
            ],
            'status': [
              1
            ],
            'option_text_status': [
              'Enabled'
            ],
            'tax_class_id': [
              2
            ],
            'option_text_tax_class_id': [
              'Taxable Goods'
            ],
            'description': [
              'Disney przedstawia magiczną i nizezwykłą przygodę... Tajemniczy dziesięciolatek Pete twierdzi, że mieszka w lesie sam, jedynie w towarzystwie wielkiego, zielonego smoka o imieniu Elliot. Strażniczka leśna Grace oraz jedenastoletnia Natalie będą musiały ustalić pochodzenie chłopca i odkryć prawdę o magicznym stworzeniu.'
            ],
            'short_description': [
              'Disney przedstawia magiczną i nizezwykłą przygodę... Tajemniczy dziesięciolatek Pete twierdzi, że mieszka w lesie sam, jedynie w towarzystwie wielkiego, zielonego smoka o imieniu Elliot. Strażniczka leśna Grace oraz jedenastoletnia Natalie będą musiały...'
            ],
            'special_price': [
              26.5
            ],
            'stock': {
              'is_in_stock': true,
              'qty': 18
            }
          }
        },
        {
          '_index': 'vue_storefront_catalog',
          '_type': 'product',
          '_id': '5626',
          '_score': 1.0,
          '_source': {
            'entity_id': '5626',
            'attribute_set_id': '13',
            'type_id': 'simple',
            'sku': '6339247',
            'has_options': '0',
            'required_options': '0',
            'created_at': '2017-04-06 17:56:29',
            'updated_at': '2017-04-06 17:56:29',
            'visibility': '4',
            'price': [
              {
                'price': '27.0000',
                'original_price': '29.9900',
                'is_discount': true,
                'customer_group_id': '0'
              },
              {
                'price': '27.0000',
                'original_price': '29.9900',
                'is_discount': true,
                'customer_group_id': '1'
              },
              {
                'price': '27.0000',
                'original_price': '29.9900',
                'is_discount': true,
                'customer_group_id': '4'
              },
              {
                'price': '27.0000',
                'original_price': '29.9900',
                'is_discount': true,
                'customer_group_id': '5'
              }
            ],
            'category': [
              {
                'category_id': 2
              },
              {
                'category_id': 3,
                'is_parent': true,
                'name': 'Filmy'
              },
              {
                'category_id': 87,
                'is_parent': true,
                'name': 'komedia'
              }
            ],
            'name': [
              'Złe mamuśki (booklet DVD)'
            ],
            'image': [
              '/9/9/99906339247.jpg'
            ],
            'ean': [
              '9788365509772'
            ],
            'pkwiu': [
              '22.11.20-60.90'
            ],
            'availability': [
              '7'
            ],
            'isbn': [
              'SELL-K+D-01-MONF01811'
            ],
            'publishers_es': [
              '_63182_,_63182_'
            ],
            'producers_es': [
              '_63182_,_63182_'
            ],
            'directors_es': [
              '_58492_,_9528_,_58492_,_9528_'
            ],
            'actors_es': [
              '_9527_,_17326_,_19439_,_16932_,_18848_,_17326_,_19281_,_9527_,_18848_,_19439_,_16932_,_19281_'
            ],
            'status': [
              1
            ],
            'option_text_status': [
              'Enabled'
            ],
            'tax_class_id': [
              2
            ],
            'option_text_tax_class_id': [
              'Taxable Goods'
            ],
            'description': [
              'Mila Kunis („Czarny łabędź”, „To tylko seks”) w nowej komedii twórców trylogii „Kac Vegas”. Opowieść o przykładnych matkach, które postanawiają zerwać się ze smyczy.<br>\r\nMłoda i piękna matka cudownego synka, żona wspaniałego męża, po prostu perfekcyjna pani domu. To oficjalny wizerunek Amy Mitchell. W rzeczywistości przepracowana i wykończona monotonią matczynych obowiązków Amy ma już dość bycia chodzącym ideałem. Pod wpływem wyzwolonych przyjaciółek, wkurzona przez leniwego męża egoistę porzuca gary i pieluchy, a kuchenny fartuch zamienia na seksowną kieckę. I rusza w miasto, by znów poczuć, że żyje! Zakręcone na lokówkę obłudne kury domowe ze szkolnej rady rodziców gotują się z oburzenia, ale Amy nic już nie powstrzyma. Z dziką rozkoszą sieje ferment i zgorszenie, odkrywając przy tym, że szczęśliwa mama to lepsza mama.'
            ],
            'short_description': [
              'Mila Kunis („Czarny łabędź”, „To tylko seks”) w nowej komedii twórców trylogii „Kac Vegas”. Opowieść o przykładnych matkach, które postanawiają zerwać się ze smyczy.\r\nMłoda i piękna matka cudownego synka, żona wspaniałego męża, po...'
            ],
            'special_price': [
              27
            ],
            'stock': {
              'is_in_stock': true,
              'qty': 0
            }
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions('cart', ['addToCart'])
  },
  mixins: [corePage('Home')]
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
