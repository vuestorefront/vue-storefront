# Droppoint shipping 
 [droppoint-shipping]
 
 Allows the customer to select a shipping droppoint instead of specifying delivery address. When a droppoint is selected, the address for the droppoint will used as shipping address. Extra fields can be added, in order to get the name of the person picking up the delivery for example.
 
 Add the extension to enabled extensions in local.json. And add a shipping method with the property "droppoint" set to true in shipping methods.
 
 resource/shipping_methods.json:
 ```json
  {
    "name": "GLS Pakkeshop",
    "code": "glsparcelshop",
    "cost": 10,
    "costInclTax": 10,
    "default": false,
    "offline": true,
    "droppoint": true
  }
```

Reference shipping method code in local config, when specifying the endpoint.

config/local.json:
```json
  "droppointShipping": {
    "glsparcelshop": {
      "endpoint": "http://localhost:8090/api/ext/gls-parcelshop"
    }
```

In the themes Shipping.vue component, hide the regular shipping form, when a shipping method has "droppoint" set to true.

```html

            <h4>Shipping method</h4>
          </div>
          <div v-for="(method, index) in shippingMethods" :key="index" class="col-md-6 mb15">
            <label class="radioStyled"> {{ method.name }} | {{ method.cost | price }}
              <input
                type="radio"
                :value="method.code"
                name="shipping-method"
                v-model="shipping.shippingMethod"
                @change="$v.shipping.shippingMethod.$touch(); shipping.droppoint = method.droppoint; shipping.endpoint = method.endpoint"
              >
              <span class="checkmark"/>
            </label>
          </div>
     <div v-if="shipping.droppoint">  <!-- Added "droppoint" property in resource/shipping_methods.json -->
            <droppoint-map :shipping-method="shipping.shippingMethod" :endpoint="shipping.endpoint" />
          </div>
          <div v-else>
            <div class="col-xs-12 col-sm-6 mb25">
              <input
...

<script>
import { coreComponent } from 'lib/themes'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Tooltip from 'theme/components/core/Tooltip.vue'
import { required, minLength } from 'vuelidate/lib/validators'
import DroppointMap from 'src/extensions/droppoint-shipping/components/DroppointMap.vue'

```
The endpoint must return json in the following structure:

```javascript
{
  extraFields: {
    pickup_name: {
      title: "Name of person who will pick up the package",
    }
  },
  droppoints: [
    {
      id: droppoint.Number,
      name: droppoint.CompanyName,
      streetname: droppoint.Streetname,
      streetname2: droppoint.Streetname2,
      zipcode: droppoint.ZipCode,
      country: droppoint.CountryCodeISO3166A2,
      city: droppoint.CityName,
      icon: {url: 'assets/gls.png'},
      position: {
        lat: parseFloat(droppoint.Latitude),
        lng: parseFloat(droppoint.Longitude)
      }
    }
  ]
}
```

Extra fields are passed along to the API where they can be transformed into an attribute the backend system can understand.
For Magento2 for example this would be extensionAttributes.