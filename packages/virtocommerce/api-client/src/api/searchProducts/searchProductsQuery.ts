import gql from 'graphql-tag';

export default gql`
  query SearchProducts (
        $storeId: String!,
        $userId: String!,
        $currencyCode: String!,
        $cultureName: String,
        $filter: String,
        $after: String,
        $first: Int,
        )
        {
      products(  
        storeId: $storeId,
        userId: $userId,
        after: $after,
        first: $first,
        filter: $filter,
        currencyCode: $currencyCode,
        cultureName: $cultureName) {  
       
       items
       {
        name   
        id
        code
        slug
        outline
        imgSrc
        images { url }
        description { content id  languageCode  reviewType }
        availabilityData { isActive isAvailable isBuyable isInStock availableQuantity }
        price { actual { amount formattedAmount } discountAmount { amount formattedAmount } sale { amount formattedAmount } list { amount formattedAmount } }
       }
       totalCount

  }
}
`;
