import { Action } from 'redux-actions';
import { AppState } from './AppReducer';

export class AppActions {
	static readonly SET_STATE = '@@set/STATE';
	static readonly SET_FAVORITE = '@@set/FAVORITE';

	static setState(state: any): Action<AppState> {
		return {
			type: AppActions.SET_STATE,
			payload: state
		};
	}

	static setFavorite(args: any): Action<AppState> {
		return {
			type: AppActions.SET_FAVORITE,
			payload: args
		};
	}
}
