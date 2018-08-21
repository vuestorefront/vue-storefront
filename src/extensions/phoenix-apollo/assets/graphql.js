import gql from 'graphql-tag'

export const RANDOM_TAG = gql`{
    randomTag {
      id
      label
      type
    }
  }`
