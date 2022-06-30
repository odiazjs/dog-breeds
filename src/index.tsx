import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { combineReducers, applyMiddleware, legacy_createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { Action } from 'redux-actions';
import { appReducer, AppState, initialRootState, RootState } from './redux/AppReducer';
import { AppEpics } from './redux/AppEpics';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './config/ApolloClient';
import { ApolloEpics } from './redux/ApolloEpics';

export const epics = combineEpics(...AppEpics.init(), ...ApolloEpics.init());

export const reducers = combineReducers({
	appState: appReducer
});

const epicMiddleware = createEpicMiddleware<Action<any>, Action<any>, AppState>();

export default function configureStore(initialState?: RootState) {
	const store = legacy_createStore(reducers, initialState, applyMiddleware(epicMiddleware));
	epicMiddleware.run(epics as any);
	return store;
}

const store = configureStore(initialRootState);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<Provider store={store}>
		<ApolloProvider client={apolloClient}>
			<App store={store}/>
		</ApolloProvider>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
