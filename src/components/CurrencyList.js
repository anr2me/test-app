import React, { Component } from 'react';
import { List } from 'semantic-ui-react'
import './CurrencyList.css';
import { connect } from 'react-redux';
import actions, { remItem } from './../redux/actions';
import CurrencyListItem from './CurrencyListItem';


class CurrencyList extends Component{

	render() {
		console.log('ListThisProps: ',this.props);
		const {itemList} = this.props;
		return (
			<List>
				{itemList.map((item) => <CurrencyListItem key={item.sym} item={item} remItem={remItem} />)}
			</List>
		);		
	}
}

const mapStateToProps = state => {
	console.log('ListState: ',state);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyList)
