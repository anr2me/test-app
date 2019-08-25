import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Button, Label, Grid, Segment } from 'semantic-ui-react';
import { CurrencyNames } from './../Utils';
import { remItem } from './../redux/actions';
import './CurrencyListItem.css';

class CurrencyListItem extends Component {

	render() {
		console.log('ItemThisProps: ', this.props);
		const { item, remItem, baseCurrency, baseAmount } = this.props;
		return (
			<List.Item>
				<List.Content>
					<Segment>
						<Grid columns="equal">
							<Grid.Row stretched>
								<Grid.Column textAlign="left">
									<Grid columns="equal">
										<Grid.Column textAlign="left" width="4">
											<Label>{item.sym}</Label>
										</Grid.Column>
										<Grid.Column textAlign="right" >
											<Label className="cur_amount">{Number(parseFloat(baseAmount * item.exrate).toFixed(item.decimals)).toLocaleString('default',{minimumFractionDigits:item.decimals,maximumFractionDigits:item.decimals})}</Label>
										</Grid.Column>
									</Grid>
									<Label size="small">{item.sym} - {CurrencyNames[item.sym]}</Label>
									<Label size="small">1 {baseCurrency} = {item.sym} {Number(parseFloat(item.exrate).toFixed(item.decimals)).toLocaleString('default',{minimumFractionDigits:item.decimals,maximumFractionDigits:item.decimals})}</Label>
								</Grid.Column>
								<Grid.Column width={4}>
									<Button floated="right" onClick={() => remItem(item.id)}> (-) </Button>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Segment>
				</List.Content>
			</List.Item>
		);
	}
}

const mapStateToProps = ({ baseCurrency, baseAmount }) => {
	console.log('ItemThisState2: ', { baseCurrency, baseAmount });
	return {
		baseCurrency, 
		baseAmount
	}
}

const mapDispatchToProps = dispatch => {
	return {
		remItem: (id) => {
			console.log('remItem!');
			dispatch(remItem(id));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyListItem)
