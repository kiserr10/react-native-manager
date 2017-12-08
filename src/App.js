import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import LoginForm from './components/LoginForm';

class App extends Component {

	componentWillMount(){
		// Initialize Firebase
		const config = {
			apiKey: 'AIzaSyA0eaarTV4WXUwWfPhezg1v7FT1a7umk2A',
			authDomain: "native-manager-17d4d.firebaseapp.com",
			databaseURL: "https://native-manager-17d4d.firebaseio.com",
			projectId: "native-manager-17d4d",
			storageBucket: "native-manager-17d4d.appspot.com",
			messagingSenderId: "125562174463"
		};
		firebase.initializeApp(config);
	}

	render(){
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
		return(
			<Provider store={store}>
				<LoginForm />
			</Provider>
		);
	}
}

export default App;
