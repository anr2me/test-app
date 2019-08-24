import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Dimmer, Loader } from 'semantic-ui-react'
import { remItem } from './../redux/actions';
import { getExrates, getExratesPending, getExratesError } from './../redux/reducers';
import fetchExrates from './../services/httpService';
import CurrencyListItem from './CurrencyListItem';
import './CurrencyList.css';


class CurrencyList extends Component{

	constructor(props) {
        super(props);

        this.shouldComponentRender = this.shouldComponentRender.bind(this);
    }

	componentWillMount() {
		console.log('ListThisPropsWillMount: ',this.props);
		const {fetchExrates, baseCurrency, itemList} = this.props;
		fetchExrates(baseCurrency, itemList.map((item)=>{return item.sym}).join(','));
	}

	shouldComponentRender() {
		const {fetchPending} = this.props;
		console.log('ListThisPending2: ',fetchPending);
		if(fetchPending !== true) return false;
		
        return true;
    }

	render() {
		console.log('ListThisProps: ',this.props);
		const {itemList, baseCurrency, baseAmount} = this.props;

		/*if (!this.shouldComponentRender()) {
			console.log('ListThisPending: ',this.props.fetchPending);
			return (
				<Dimmer active inverted>
					<Loader size='large'>Loading</Loader>
				</Dimmer>
			);
		}*/
		
		return (
			<List>
				{itemList.map((item) => <CurrencyListItem key={item.id} item={item} remItem={remItem} baseCurrency={baseCurrency} baseAmount={baseAmount} />)}
			</List>
		);		
	}
}

const mapStateToProps = (state) => {
  return {
    baseCurrency: state.baseCurrency,
	baseAmount: state.baseAmount,
	itemList: getExrates(state),
	fetchError: getExratesError(state),
    fetchPending: getExratesPending(state)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchExrates
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList)
