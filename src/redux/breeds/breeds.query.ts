import { gql } from '@apollo/client';
import { loader } from 'graphql.macro';

const breedsGql = loader('./breeds.gql');

export const GET_BREEDS = gql`
	${breedsGql}
`;
