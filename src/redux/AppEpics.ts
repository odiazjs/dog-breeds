import { Action } from 'redux-actions';
import { ofType, StateObservable } from 'redux-observable';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AppActions } from './AppActions';
import { AppState } from './AppReducer';

export class AppEpics {
	constructor() {}

	static init() {
		return [AppEpics.setStateEpic];
	}

	static setStateEpic = (
		action$: Observable<Action<AppState>>,
		state$: StateObservable<AppState>
	): Observable<Action<AppState>> => {
		return action$.pipe(
			ofType(AppActions.SET_STATE),
			map((action: Action<AppState>) => {
				console.warn(`Epic fired: { setStateEpic } - Action: ${JSON.stringify(action)}`);
				return { type: 'END_STATE', payload: action.payload };
			})
		);
	};
}
