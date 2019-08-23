import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import { connect } from 'react-redux';
import actions from './../redux/actions';
import CurrencyList from './CurrencyList';


class App extends Component{
	
	render() {
		const {itemList} = this.props;
		return (
			<Container>
				<CurrencyList itemList={itemList} />
			</Container>
		)	
	}
}

const mapStateToProps = state => {
	console.log('State: ',state);
  return {
    itemList: state.itemList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateAll: () =>
      dispatch({
        type: actions.UPDATE_ALL,
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

