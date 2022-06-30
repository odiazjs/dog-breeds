import { Action } from 'redux-actions';
import { Favorite } from '../common/base-model';
import { ApolloActions } from './ApolloActions';
import { AppActions } from './AppActions';

export interface RootState {
	appState?: AppState;
}

export interface AppState {
	isLoadingData?: boolean;
	dogs?: [];
	favorite?: Favorite | null;
}

export const initialAppState: AppState = {
	isLoadingData: false,
	dogs: [],
	favorite: null
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
			const destructured = {
				...state,
				isLoadingData: false,
				...action.payload
			}
			return destructured
		case ApolloActions.GRAPHQL:
			return {
				...state,
				isLoadingData: true
			};
		default:
			return state;
	}
};
