//Location with all the different scenes or routes that users can go to //

import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';




const RouterComponent = () => {
	return (
		<Router sceneStyle={{ paddingTop: 65 }}>
			<Scene key="login" component={LoginForm} title="Please Login" />
		</Router>
	);
};

export default RouterComponent;
