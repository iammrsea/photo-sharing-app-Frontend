import { InMemoryCache, IntrospectionFragmentMatcher, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';

import introspectionQueryResultData from './fragmentTypes.json';

import { resolvers } from './resolvers.js';

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = new ApolloLink((operation, forward) => {
	operation.setContext(({ headers }) => {
		return {
			headers: {
				...headers,
				authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZThmYTg4OWM3ODkyNDBiMjgyNDI3NWMiLCJ1c2VybmFtZSI6Ik1pa2UgRG9lIiwiaWF0IjoxNTg2NDczMTIwLCJleHAiOjE1ODY3MzIzMjB9.6NrpmslA0tnEzV0O07Y5cCOls1bMOqsBkIHeTfAmaUo`,
			},
		};
	});
	return forward(operation);
});

const httpLink = new HttpLink({
	uri: 'http://localhost:5000/graphql',
});
const link = ApolloLink.from([authLink, errorLink, httpLink]);

const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });

const cache = new InMemoryCache({ fragmentMatcher });

const initialData = {};

cache.writeData({
	data: initialData,
});

const client = new ApolloClient({
	cache,
	link,
	connectToDevTools: true,
	resolvers,
});
client.onResetStore(() => {
	cache.writeData({
		data: initialData,
	});
});
export const createClient = () => client;
