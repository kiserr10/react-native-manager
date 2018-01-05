import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import { employeeFetch } from '../actions';
import EmployeeListItem from './EmployeeListItem';

class EmployeeList extends Component {

	componentWillMount() {
		this.props.employeeFetch();
		this.createDataSource(this.props);
	}
	componentWillReceiveProps(nextProps){
		//nextProps are the next set of props that this component component will be rendered with
		//this.props is still the old set of props
		this.createDataSource(nextProps);
	}
	createDataSource({ employees }){
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.dataSource = ds.cloneWithRows(employees);
	}

	renderRows(employee){
		<EmployeeListItem employee={employee}/>;
	}
	render(){
		return (
			<ListView
				createDataSource={this.createDataSource}
				renderRows={this.renderRows()}
			/>
		);
	}
}
const mapStateToProps = state => {
	const employees = _.map(state.employees, (val, uid) => {
		return { ...val, uid };
	});
	return { employees };
};

export default connect(mapStateToProps, { employeeFetch })(EmployeeList);
