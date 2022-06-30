import { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Action, Dispatch } from 'redux';
import './App.scss';
import { ApolloActions } from './redux/ApolloActions';
import { AppState } from './redux/AppReducer';
import { GET_BREEDS } from './redux/breeds/breeds.query';
import { cloneDeep } from 'lodash';
import { FavoriteComponent } from './components/favorite/favorite-component';
import { DogListComponent } from './components/dog-list/dog-list.component';

export const App: React.FC<{ appState: AppState, store: any }> = (redux: { appState: AppState, store: any }) => {

	const { appState, store } = redux;
	const dispatch = useDispatch();
	console.log(' App State: ', { appState, store });

	const [state, setState] = useState({ dogs: [] as any });

	/** @memoized */
	const makeBreedsQuery = useCallback(
		() => dispatch(ApolloActions.graphQL({ query: GET_BREEDS, variables: {} })),
		[dispatch]
	);

	useEffect(() => {
		makeBreedsQuery();
		store.subscribe(() => {
			const state = store.getState();
			if (state.appState.dogs.length) {
				setState({
					dogs: [...cloneDeep(state.appState.dogs)] as any
				})
			}
		})

	}, []);

	return (
		<div className={`App ${appState.isLoadingData ? 'loading' : ''}`}>
			<div className="App">
				<div className="wrapper">
					<div className="box header">
						<div className="app-title">Dog Breeds</div>
						<FavoriteComponent appState={appState as any}></FavoriteComponent>
					</div>
					<div className="box content">
						<DogListComponent dogs={state.dogs} favorite={appState?.favorite}></DogListComponent>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: AppState) => ({
	...state
});

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>, props: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);

