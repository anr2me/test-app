import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Label, Input, Divider } from 'semantic-ui-react';
import { CurrencyNames } from './../Utils';
import { setBaseAmount } from './../redux/actions';
import CurrencyList from './CurrencyList';
import AddMoreCurrency from './AddMoreCurrency';
import './App.css';


class App extends Component{

  // Save Form data in local state
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    console.log('AppThisState: ',this.state);
    console.log('AppThisProps: ',this.props);
    const { baseAmount } = {...this.props, ...this.state};
    return setBaseAmount(parseFloat(baseAmount));
  }
	
	render() {
		const {itemList, baseCurrency, baseAmount, dispatch} = {...this.props, ...this.state};
		return (
			<Container textAlign="center">
        <Segment className="app_wrapper" textAlign="left">
          <Label size="small">
            {baseCurrency} - {CurrencyNames[baseCurrency]}
          </Label>
          <Input name="baseAmount" className="base_amount" fluid labelPosition="left" type="text" placeholder="Amount" value={baseAmount} onChange={(e, pair)=>dispatch(this.handleChange(e, pair))}>
            <Label basic>{baseCurrency}</Label>
              <input />
          </Input>
          <Divider />

				  <CurrencyList itemList={itemList} />

          <Segment>
            <AddMoreCurrency />
          </Segment>
        </Segment>
			</Container>
		)	
	}
}

const mapStateToProps = ({ itemList, baseCurrency, baseAmount })  => {
	//console.log('State: ',state);
  return {
    itemList,
    baseCurrency,
    baseAmount
  }
}

export default connect(mapStateToProps, null)(App)

