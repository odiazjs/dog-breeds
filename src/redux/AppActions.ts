import { Action } from 'redux-actions';
import { AppState } from './AppReducer';

export class AppActions {
	static readonly SET_STATE = '@@set/STATE';

	static setState(state: any): Action<AppState> {
		return {
			type: AppActions.SET_STATE,
			payload: state
		};
	}
}
