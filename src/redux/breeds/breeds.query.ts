import { gql } from '@apollo/client';
import { loader } from 'graphql.macro';

const breedsGql = loader('./breeds.gql');

export const GET_BREEDS = gql`
	query GetBreeds {
	dogs {
		id,
		breed,
		subbreeds,
		displayImage,
		images {
			id,
			url
		}
  }
}
`;
