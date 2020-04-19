import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
// import { HttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

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
				authorization: localStorage.getItem('auth_user')
					? `token ${JSON.parse(localStorage.getItem('auth_user')).token}`
					: '',
			},
		};
	});
	return forward(operation);
});

const httpLink = createUploadLink({
	uri: 'http://localhost:5000/graphql',
	// uri: 'https://instaphotosharing-app.herokuapp.com/graphql',
});
const wsLink = new WebSocketLink({
	// uri: 'ws://instaphotosharing-app.herokuapp.com/graphql',
	uri: 'ws://localhost:5000/graphql',
	options: { reconnect: true },
});

const httpOrWs = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	httpLink
);

const link = ApolloLink.from([authLink, errorLink, httpOrWs]);

const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });

const cache = new InMemoryCache({ fragmentMatcher });

const initialData = {
	authUser: {
		token: localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')).token : '',
		userId: localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')).userId : '',
		__typename: 'AuthResponse',
	},
	signingInOrUp: false,
	notifications: [],
	githubCode: '',
};

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
