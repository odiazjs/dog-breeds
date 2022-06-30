import { useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Action, Dispatch } from 'redux';
import './App.scss';
import { ApolloActions } from './redux/ApolloActions';
import { AppState, RootState } from './redux/AppReducer';
import { GET_BREEDS } from './redux/breeds/breeds.query';
import { Breed } from './common/base-model';

export const App: React.FC<RootState> = (state: RootState) => {
	const { appState } = state;
	const dispatch = useDispatch();

	/** @memoized */
	const makeBreedsQuery = useCallback(
		(id: number) => dispatch(ApolloActions.graphQL({ query: GET_BREEDS, variables: { id } })),
		[dispatch]
	);

	return (
		<div className={`App ${appState.isLoadingData ? 'loading' : ''}`}>
			<main className='grid-wrap'>
				<div className='grid'>
					<div className='nav-bar'>
						<div className='app-info fixedHeightContainer'>
							<label>App State</label>
							<pre className='content'>{JSON.stringify(appState, null, 2)}</pre>
						</div>
						<br></br>
						<label>Dog Breeds</label>
						<br></br>
						<br></br>
						<div className='products'>
							<button
								onClick={() => {
									makeBreedsQuery(1);
								}}
							>
								Load Breeds
							</button>
							{appState.storeState?.breeds.map((breed: Breed) => {
								return <div key={breed.id}>{breed.name}</div>;
							})}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

const mapStateToProps = (state: AppState) => ({
	...state
});

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>, props: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
