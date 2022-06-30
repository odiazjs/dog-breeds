import { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Action, Dispatch } from 'redux';
import './App.scss';
import { ApolloActions } from './redux/ApolloActions';
import { AppState, RootState } from './redux/AppReducer';
import { GET_BREEDS } from './redux/breeds/breeds.query';
import { DogComponent } from './components/DogComponent';
import { Dog } from './common/base-model';
import { cloneDeep } from 'lodash';

export const App: React.FC<RootState> = (redux: any) => {
	
	const { appState, store } = redux;
	const dispatch = useDispatch();
	console.log(' App Store: ', store);

	const [state, setState] = useState({ dogs: [] as any });

	/** @memoized */
	const makeBreedsQuery = useCallback(
		() => dispatch(ApolloActions.graphQL({ query: GET_BREEDS, variables: {} })),
		[dispatch]
	);

	const toggleFavorites = (dog: Dog) => {
		const mapped: Dog[] = state.dogs.map((item: Dog) => {
			if (item.id != dog.id) {
				item.isFavorite = false;
			} else {
				item.isFavorite = true;
			}
			return item;
		})
		setState({dogs: mapped})
	}

	useEffect(() => {
        makeBreedsQuery();
		
		store.subscribe(() => {
			const state = store.getState();
			if (state.appState.storeState.dogs.length) {
				setState({
					dogs: [...cloneDeep(state.appState.storeState.dogs)] as any
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
					</div>
					<div className="box content">

						{/** Content */}
						{state.dogs.map((dog: any) => {
							return <DogComponent dog={dog} fun={{toggleFavorites}} ></DogComponent>
						})}

					</div>
					<div className="box footer">

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

