import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { useQuery } from '@apollo/client';

//Test graphql Endpoint
const graphQLEndpoint = 'https://32ypr38l61.sse.codesandbox.io/';

export const apolloClient = new ApolloClient({
	uri: graphQLEndpoint,
	cache: new InMemoryCache()
});
