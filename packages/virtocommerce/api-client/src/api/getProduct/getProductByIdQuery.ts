import gql from 'graphql-tag';

export default gql`
  query GetProductById (
        $id: String!,
        $storeId: String!,
        $userId: String!,
        $currencyCode: String!,
        $cultureName: String)
        {
    product(  
        id: $id,
        storeId: $storeId,
        userId: $userId,
        currencyCode: $currencyCode,
        cultureName: $cultureName) {  
       
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
}
`;

