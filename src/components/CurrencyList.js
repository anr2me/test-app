import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Dimmer, Loader } from 'semantic-ui-react'
import { remItem } from './../redux/actions';
import { getBaseAmount, getBaseCurrency, getNeedFetch, getItemList, getFetchPending, getFetchError } from './../redux/reducers';
import  fetchExrates from './../services/httpService';
import CurrencyListItem from './CurrencyListItem';
import { getThemeId } from '../redux/themeReducer';

class CurrencyList extends Component{

	constructor(props) {
		super(props);
	
		this.handleDeleteItem = this.handleDeleteItem.bind(this);
	}

	handleDeleteItem(id){
		console.log('ThisProps: ',this.props, ' ID: ',id);
		this.props.remItem(id);
	}
	

	componentDidMount() {
		console.log('ListThisPropsDidMount: ',this.props);
		const {fetchExrates, baseCurrency, itemList} = this.props;
		// Initial fetching
		fetchExrates(baseCurrency, itemList.map((item)=>{return item.sym}).join(','));
	}
	
	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('ListThisPropsDidUpdate: ',this.props, ' PrevProps: ',prevProps);
		const {fetchExrates, baseCurrency, itemList, needFetch} = this.props;
		if (needFetch === true && prevProps.needFetch === false)
		{
			fetchExrates(baseCurrency, itemList.map((item)=>{return item.sym}).join(','));
		}
	}


	render() {
		console.log('ListThisProps: ',this.props);
		const {itemList, baseCurrency, baseAmount, fetchPending, themeId} = this.props;

		if (fetchPending) {
			console.log('ListThisPending: ',fetchPending);
			return (
				<Dimmer className="fetch_dimmer" active inverted={themeId===1?false:true}>
					<Loader className="fetch_loader" size='large'>Loading</Loader>
				</Dimmer>
			);
		}
		
		return (
			<List>
				{itemList.map((item) => <CurrencyListItem key={item.id} item={item} onDelete={this.handleDeleteItem} baseCurrency={baseCurrency} baseAmount={baseAmount} />)}
			</List>
		);		
	}
}

const mapStateToProps = (state) => {
  return {
    baseCurrency: getBaseCurrency(state),
	baseAmount: getBaseAmount(state),
	itemList: getItemList(state),
	fetchError: getFetchError(state),
	fetchPending: getFetchPending(state),
	needFetch: getNeedFetch(state),
	themeId: getThemeId(state),
  }
}

// Custom dispatch
const mapDispatchToProps = dispatch => bindActionCreators({
	fetchExrates,
	remItem,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList)
