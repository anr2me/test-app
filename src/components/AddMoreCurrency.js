import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import { CurrencyNames } from './../Utils';
import { addItem } from './../redux/actions';
import styled from 'styled-components';

const StyledDropdown= styled(Dropdown)`
  &&& {
    background-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR)};
    color: ${props => (props.theme.PRIMARY_TEXT_COLOR)};
    border-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR_FAINT)};
    transition: all 0.5s ease;
    transition-property: color,background-color,border,font-size;

    &.select_currency{
        text-transform: capitalize;
        font-weight: bold;
    }

    &:hover{
        border-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR_STRONG)};
    }

    &>.menu>.item{
        background-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR)};
        color: ${props => (props.theme.PRIMARY_TEXT_COLOR)};
        border-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR_FAINT)};
        transition: all 0.5s ease;
        transition-property: color,background-color,border,font-size;

        &:hover{
            background-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR_FAINT)};
            color: ${props => (props.theme.PRIMARY_TEXT_COLOR_FAINT)};
        }
    }

    &>input.search{
        background-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR)};
        color: ${props => (props.theme.PRIMARY_TEXT_COLOR)};
        border-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR_FAINT)};
        transition: all 0.5s ease;
        transition-property: color,background-color,border,font-size;
    }
  }
`;

class AddMoreCurrency extends Component{

    constructor(props) {
        super(props);

        // local state
        this.state = {
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

    // Save Form data in local state
    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = (e) => {
        console.log('CurThisOnSubmit: ',this.state,' / e: ',e);
        // Get DropDown value
        const { currency } = this.state;
        // Reset Form values
        this.setState({ currency:'' });
        if (currency!=="") {
            this.props.dispatch(addItem((currency).toUpperCase()));
        }
        //Show AddMore Button
        this.props.history.push('/');
    }

	render() {
        console.log('CurThisState: ',this.state);
        console.log('CurThisProps: ',this.props);
        const {currency} = this.state;
        
		return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Field>
                        <StyledDropdown className="select_currency" name='currency' ref="currency" placeholder='Currency' value={currency} fluid search selection options={this.state.currencyOptions} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field width={4}>
                        <Button floated="right" type="submit" content="Submit" primary />
                    </Form.Field>
                </Form.Group>
            </Form>
        );

	}
}

export default connect()(AddMoreCurrency)
