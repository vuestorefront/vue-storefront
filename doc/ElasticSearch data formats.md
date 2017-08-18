The service is using ElasticSearch data format compliant with ElasticSuite for Magento 1.x/2.x from Smile (https://github.com/Smile-SA/smile-magento-elasticsearch).

## Product type 

```json
{  
   "_index":"magento2_default_catalog_product_20170817_112451",
   "_type":"product",
   "_id":"8",
   "_version":1,
   "_score":1,
   "_source":{  
      "entity_id":"8",
      "attribute_set_id":"10",
      "type_id":"simple",
      "sku":"6347471",
      "has_options":"0",
      "required_options":"0",
      "created_at":"2017-04-06 15:55:49",
      "updated_at":"2017-04-06 15:55:49",
      "visibility":"4",
      "price":[  
         {  
            "price":"6.0000",
            "original_price":"6.9000",
            "is_discount":true,
            "customer_group_id":"0"
         },
         {  
            "price":"6.0000",
            "original_price":"6.9000",
            "is_discount":true,
            "customer_group_id":"1"
         },
         {  
            "price":"6.0000",
            "original_price":"6.9000",
            "is_discount":true,
            "customer_group_id":"4"
         },
         {  
            "price":"6.0000",
            "original_price":"6.9000",
            "is_discount":true,
            "customer_group_id":"5"
         }
      ],
      "category":[  
         {  
            "category_id":2
         },
         {  
            "category_id":4,
            "is_parent":true,
            "name":"Książki"
         },
         {  
            "category_id":34,
            "is_parent":true,
            "name":"dla dzieci"
         },
         {  
            "category_id":249,
            "is_parent":true,
            "name":" 4-8 lat"
         }
      ],
      "name":[  
         "W kosmosie"
      ],
      "image":[  
         "/9/9/99906347471.jpg"
      ],
      "ean":[  
         "9788374373319"
      ],
      "pkwiu":[  
         "58.11.13"
      ],
      "availability":[  
         "1"
      ],
      "isbn":[  
         "978-83-7437-331-9"
      ],
      "authors_es":[  
         "_24819_,_24819_,_24819_"
      ],
      "publishers_es":[  
         "_62024_,_62024_,_62024_"
      ],
      "producers_es":[  
         "_62024_,_62024_,_62024_"
      ],
      "status":[  
         1
      ],
      "option_text_status":[  
         "Enabled"
      ],
      "tax_class_id":[  
         2
      ],
      "option_text_tax_class_id":[  
         "Taxable Goods"
      ],
      "description":[  
         "Opowieści dla ciekawskich świata, dla małych odkrywców i podróżników. Dziecko dowie się: kogo ratuje pogotowie, gdzie na akcję wyjeżdża straż pożarna i policja, jak podróżować koleją, po co ludzie lecą w kosmos i dlaczego warto zostać marynarzem. Na kartach książeczki maluch odnajdzie wiele niespodzianek i ciekawostek, a wesołe i mądre rymowanki zachęcą go do zabawy."
      ],
      "short_description":[  
         "Opowieści dla ciekawskich świata, dla małych odkrywców i podróżników. Dziecko dowie się: kogo ratuje pogotowie, gdzie na akcję wyjeżdża straż pożarna i policja, jak podróżować koleją, po co ludzie lecą w kosmos i dlaczego warto zostać marynarzem...."
      ],
      "special_price":[  
         6
      ],
      "stock":{  
         "is_in_stock":false,
         "qty":0
      }
   }
}
```


## Category type

```json
{  
   "_index":"magento2_default_catalog_category_20170817_075531",
   "_type":"category",
   "_id":"8",
   "_version":1,
   "_score":1,
   "_source":{  
      "entity_id":"8",
      "attribute_set_id":"3",
      "parent_id":"7",
      "created_at":"2017-04-06 15:42:48",
      "updated_at":"2017-07-12 08:24:10",
      "path":"1/2/8",
      "position":"143",
      "level":"3",
      "children_count":"0",
      "erp_id":"1074115879",
      "is_active":"1",
      "name":[  
         "pojzady"
      ],
      "url_path":[  
         "Zabawki/pojzady-3848"
      ]
   }
}
```