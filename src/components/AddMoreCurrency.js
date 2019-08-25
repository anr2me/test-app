import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import { CurrencyNames } from './../Utils';
import { addItem } from './../redux/actions';
import './AddMoreCurrency.css';

class AddMoreCurrency extends Component{

    constructor(props) {
        super(props);

        // local state
        this.state = {
            showAddMore: true,
            currency: '',
            currencyOptions: Object.keys(CurrencyNames).map((sym) => {
                return {
                  key: sym,
                  text: sym,
                  value: sym,
                }
            }),
        }
    }

    toggleAddMore = () => {
        this.setState(state => ({ showAddMore: !state.showAddMore }));
    };

    // Save Form data in local state
    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = (e) => {
        console.log('CurThisOnSubmit: ',this.state,' / e: ',e);
        // Get DropDown value
        const { currency } = this.state;
        // Reset Form values
        this.toggleAddMore();
        this.setState({ currency:'' });
        if (currency!=="") {
            this.props.dispatch(addItem((currency).toUpperCase()));
        }
    }

	render() {
        console.log('CurThisState: ',this.state);
        console.log('CurThisProps: ',this.props);
        const {currency, showAddMore} = this.state;
        
		if(showAddMore){
            return(
                <Button fluid onClick={this.toggleAddMore} icon={{name:"plus circle", size:"large"}} labelPosition='left' color="green" content="Add More Currencies" />              
            );
        }
     
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Dropdown className="select_currency" name='currency' ref="currency" placeholder='Currency' value={currency} fluid search selection options={this.state.currencyOptions} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field width={4}>
                        <Button floated="right" type="submit" content="Submit" color="blue" />
                    </Form.Field>
                </Form.Group>
            </Form>
        );

	}
}

export default connect()(AddMoreCurrency)
