import { Action } from 'redux-actions';
import { ofType, StateObservable } from 'redux-observable';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AppActions } from './AppActions';
import { AppState } from './AppReducer';
import { FilterActions } from './FilterActions';

export class FilterEpics {
	constructor() {}

	static init() {
		return [FilterEpics.changeDateEpic, FilterEpics.formataDateEpic];
	}

	static changeDateEpic = (
		action$: Observable<Action<AppState>>,
		state$: StateObservable<AppState>
	): Observable<Action<AppState>> => {
		return action$.pipe(
			ofType(FilterActions.CHANGE_DATE),
			map((action: Action<AppState>) => {
				const {
					payload: {}
				} = action;
				console.warn(`Epic fired: { changeDateEpic } - Action: ${JSON.stringify(action)}`);
				return FilterActions.formatDate({});
			})
		);
	};

	static formataDateEpic = (
		action$: Observable<Action<AppState>>,
		state$: StateObservable<AppState>
	): Observable<Action<AppState>> => {
		return action$.pipe(
			ofType(FilterActions.FORMAT_DATE),
			map((action: Action<AppState>) => {
				const {
					payload: {}
				} = action;
				console.warn(`Epic fired: { formataDateEpic } - Action: ${JSON.stringify(action)}`);
				return AppActions.setState({ ...action.payload });
			})
		);
	};
}
