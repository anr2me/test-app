import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Label, Input, Divider } from 'semantic-ui-react';
import { CurrencyNames } from './../Utils';
import { setBaseAmount } from './../redux/actions';
import CurrencyList from './CurrencyList';
import AddMoreCurrency from './AddMoreCurrency';
import './App.css';


class App extends Component{

  constructor(props) {
    super(props);

    // local state
    this.state = {
      baseAmount: "10.0000",
    }
  }

  // Save Form data in local state
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    console.log('AppThisState: ',this.state,' / ',{[name]:value});
    console.log('AppThisProps: ',this.props);
    // since setSate is async we shouldn't count on it's value immediately
    const { baseAmount } = {...this.state, [name]:value };
    return setBaseAmount(parseFloat(baseAmount));
  }

  handleBlur = (e) => {
    console.log('CurThisOnBlurState: ',this.state,' / e: ',e,' CurThisOnBlurProps: ',this.props);
    this.setState({baseAmount: parseFloat(this.state.baseAmount || this.props.baseAmount).toFixed(4)});
  }
	
	render() {
		const {itemList, baseCurrency, dispatch} = this.props;
		return (
			<Container textAlign="center">
        <Segment className="app_wrapper" textAlign="left">
          <Label size="small">
            {baseCurrency} - {CurrencyNames[baseCurrency]}
          </Label>
          <Input className="base_amount" name="baseAmount" ref="baseAmount" fluid labelPosition="left" type="text" placeholder="Amount" value={this.state.baseAmount || this.props.baseAmount} onChange={(e, pair)=>dispatch(this.handleChange(e, pair))} onBlur={(e)=>this.handleBlur(e)}>
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

