import { Action } from 'redux-actions';
import { Dog } from '../common/base-model';
import { ApolloActions } from './ApolloActions';
import { AppActions } from './AppActions';
import { FilterActions } from './FilterActions';

export interface RootState {
	appState: AppState;
}

export interface AppState {
	isLoadingData?: boolean;
	storeState?: StoreState;
}

export interface StoreState {
	dogs: Dog[];
}

export const initialAppState: AppState = {
	isLoadingData: false,
	storeState: {
		dogs: []
	}
};

export const initialRootState: RootState = {
	appState: initialAppState
};

export const appReducer = (
	state: AppState = initialAppState,
	action: Action<AppState>
): AppState => {
	switch (action.type) {
		case AppActions.SET_STATE:
			return {
				...state
			};
		case 'STORE_STATE':
			return {
				...state,
				isLoadingData: false,
				storeState: action.payload as any
			};
		case ApolloActions.GRAPHQL:
			return {
				...state,
				isLoadingData: true
			};
		default:
			return state;
	}
};
