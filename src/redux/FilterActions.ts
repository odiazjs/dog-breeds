import { Action } from 'redux-actions';
import { AppState } from './AppReducer';

export class FilterActions {
	static readonly CHANGE_DATE = '@@change/DATE';
	static readonly FORMAT_DATE = '@@format/DATE';

	static changeDate(state: any): Action<AppState> {
		return {
			type: FilterActions.CHANGE_DATE,
			payload: {}
		};
	}

	static formatDate(state: any): Action<AppState> {
		return {
			type: FilterActions.FORMAT_DATE,
			payload: {}
		};
	}
}
