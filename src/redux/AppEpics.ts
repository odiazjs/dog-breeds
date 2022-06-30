import { Action } from 'redux-actions';
import { ofType, StateObservable } from 'redux-observable';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AppActions } from './AppActions';
import { AppState, RootState } from './AppReducer';

export class AppEpics {
	constructor() { }

	static init() {
		return [
			AppEpics.setStateEpic,
			AppEpics.setFavoriteEpic
		];
	}

	static setStateEpic = (
		action$: Observable<Action<AppState>>,
		state$: StateObservable<AppState>
	): Observable<Action<AppState>> => {
		return action$.pipe(
			ofType(AppActions.SET_STATE),
			map((action: Action<AppState>) => {
				console.info(`Epic fired: { setStateEpic } - Action: ${JSON.stringify(action)}`);
				return { type: 'END_STATE', payload: action.payload };
			})
		);
	};

	static setFavoriteEpic = (
		action$: Observable<Action<AppState>>,
		state$: StateObservable<AppState>
	): Observable<Action<AppState>> => {
		return action$.pipe(
			ofType(AppActions.SET_FAVORITE),
			map((action: Action<any>) => {
				console.info(`Epic fired: { setStateEpic } - Action: ${JSON.stringify(action)}`);
				return { type: AppActions.SET_STATE, payload: action.payload };
				// return state$.pipe(
				// 	map((state:any) => {
				// 		const { favorite } = action.payload;
				// 		const mergedState = {...state.appState, favorite }
				// 		return { type: AppActions.SET_STATE, payload: mergedState };
				// 	})
				// )
			})
		);
	};
}
