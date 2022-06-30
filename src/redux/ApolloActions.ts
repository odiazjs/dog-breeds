import { Action } from 'redux-actions';
import { AppState } from './AppReducer';
import { gql, DocumentNode, TypedDocumentNode } from '@apollo/client';

export class ApolloActions {
	static readonly GRAPHQL = '@@apollo/GRAPHQL';
	static readonly QUERY = '@@apollo/QUERY';
	static readonly MUTATION = '@@apollo/MUTATION';

	static graphQL(action: ApolloAction<any>): GraphqlAction<AppState> {
		return Object.assign(
			{
				type: ApolloActions.GRAPHQL,
				payload: {}
			},
			{ ...action }
		);
	}

	static query(action: ApolloAction<any>): GraphqlAction<AppState> {
		return Object.assign(
			{
				type: ApolloActions.QUERY,
				payload: {}
			},
			{ ...action }
		);
	}

	static mutation(action: ApolloAction<any>): GraphqlAction<AppState> {
		return Object.assign(
			{
				type: ApolloActions.MUTATION,
				payload: {}
			},
			{ ...action }
		);
	}
}

export interface ApolloAction<T> {
	query?: DocumentNode;
	mutation?: DocumentNode;
	variables?: any;
}

export interface GraphqlAction<T> extends Action<T> {
	query?: DocumentNode | TypedDocumentNode<any, any> | any;
	mutation?: DocumentNode;
	variables?: any;
}
