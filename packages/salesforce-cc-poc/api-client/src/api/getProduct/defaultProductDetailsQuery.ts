import gql from 'graphql-tag';

export default gql`
query($productId: String!, $selectedColor: String) {
    product(id: $productId, selectedColor: $selectedColor) {
        name
        id
        masterId
        longDescription
        shortDescription
        currency
        price
        priceMax
        prices {
            sale
            list
        }
        image
        manufacturerName
        brand
        options {
            description
            id
            name
            values {
                default
                id
                name
                price
            }
        }
        primaryCategoryId
        images(allImages: true, size: "large") {
            title
            alt
            link
        }
        variants {
            id
            variationValues {
                key
                value
            }
        }
        variationAttributes {
            variationAttributeType {
                id
                name
            }
            variationAttributeValues {
                name
                value
                orderable
                swatchImage {
                    link
                    style
                }
            }
        }
        inventory {
            ats
            backorderable
            id
            orderable
            preorderable
            stockLevel
        }
        type {
            bundle
            item
            master
            option
            set
            variant
            variationGroup
        }
        productPromotions {
            calloutMsg
            promotionId
            promotionalPrice
        }
    }
}
`;
