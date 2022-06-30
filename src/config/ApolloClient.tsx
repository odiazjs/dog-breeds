import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { useQuery } from '@apollo/client';

//Test graphql Endpoint
const graphQLEndpoint = 'http://localhost:9000/graphql/';

export const apolloClient = new ApolloClient({
	uri: graphQLEndpoint,
	cache: new InMemoryCache()
});

//Test graphql query
const LAUCHES = gql`
	query Launches {
		launches {
			mission_name
			mission_id
		}
	}
`;
interface ITestApollo {}
//Test component
export const TestApollo: React.FC<ITestApollo> = () => {
	const { loading, error, data } = useQuery(LAUCHES);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	console.log('Data returned from graphQl', data);

	return <p>Testing data from graphQL</p>;
};
