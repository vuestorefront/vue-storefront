import find from 'lodash-es/find'

const getDefaultShippingMethods= (shippingMethods: any[]) => {

  let default_shipping_methods=[]
  for(let brand_id in shippingMethods){
    let store_data= shippingMethods[brand_id]
    let shipping_method_data = find(shippingMethods[brand_id]['shipping_methods'], (m)=>{return m._id==store_data['default_shipping_method']})
    default_shipping_methods.push({brand_id, default_shipping_method:shipping_method_data})
  }
  return default_shipping_methods
}

export default getDefaultShippingMethods
