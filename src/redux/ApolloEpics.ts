import { Action } from 'redux-actions';
import { ofType, StateObservable } from 'redux-observable';
import { delay, from, map, mergeMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { apolloClient } from '../config/ApolloClient';
import { ApolloActions, GraphqlAction } from './ApolloActions';
import { AppState } from './AppReducer';

export class ApolloEpics {
	constructor() {}

	static init() {
		return [ApolloEpics.graphqlEpic, ApolloEpics.queryEpic, ApolloEpics.mutationEpic];
	}

	static graphqlEpic = (
		action$: Observable<Action<AppState>>,
		state$: StateObservable<AppState>
	): Observable<Action<AppState>> => {
		return action$.pipe(
			ofType(ApolloActions.GRAPHQL),
			map((action: GraphqlAction<AppState>) => {
				console.warn(
					`Epic fired: { graphqlEpic } - GraphqlAction: Query: ${action.query} - Mutation: ${action.mutation}`
				);

				const result = { ...action };

				if (action.query) {
					result.type = ApolloActions.QUERY;
				} else if (action.mutation) {
					result.type = ApolloActions.MUTATION;
				}

				return result;
			})
		);
	};

	static queryEpic = (
		action$: Observable<Action<AppState>>,
		state$: StateObservable<AppState>
	): Observable<Action<AppState>> => {
		return action$.pipe(
			ofType(ApolloActions.QUERY),
			mergeMap((action: GraphqlAction<AppState>) => {
				const { query, variables } = action;
				console.warn(
					`Epic fired: { queryEpic } - GraphqlAction: ${JSON.stringify(variables)} - payload: ${
						action.payload
					}`
				);

				const apolloQuery$ = from(apolloClient.query({ query, variables }));

				return apolloQuery$.pipe(
					map((graphqlResult: { data: any }) => {
						return { type: 'STORE_STATE', payload: graphqlResult.data };
					})
				);
			})
		);
	};

	static mutationEpic = (
		action$: Observable<Action<AppState>>,
		state$: StateObservable<AppState>
	): Observable<Action<AppState>> => {
		return action$.pipe(
			ofType(ApolloActions.MUTATION),
			map((action: GraphqlAction<AppState>) => {
				console.warn(`Epic fired: { mutationEpic } - GraphqlAction: ${JSON.stringify(action)}`);
				return { type: 'END_STATE', payload: action.payload };
			})
		);
	};
}
