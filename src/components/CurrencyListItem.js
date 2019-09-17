import React, { Component } from 'react';
import { List, Button, Label, Grid, Segment } from 'semantic-ui-react';
import { CurrencyNames } from './../Utils';
import './CurrencyListItem.css';

class CurrencyListItem extends Component {

	render() {
		console.log('ItemThisProps: ', this.props);
		const { item, onDelete, baseCurrency, baseAmount } = this.props;
		return (
			<List.Item>
				<List.Content>
					<Segment>
						<Grid columns="equal">
							<Grid.Row stretched>
								<Grid.Column textAlign="left">
									<Grid columns="equal">
										<Grid.Column textAlign="left" width={4}>
											<Label size="large">{item.sym}</Label>
										</Grid.Column>
										<Grid.Column textAlign="right" >
											<Label className="cur_amount" size="large">{Number(parseFloat(baseAmount * item.exrate).toFixed(item.decimals)).toLocaleString('default',{minimumFractionDigits:item.decimals,maximumFractionDigits:item.decimals})}</Label>
										</Grid.Column>
									</Grid>
									<Label size="small">{item.sym} - {CurrencyNames[item.sym]}</Label>
									<Label size="small">1 {baseCurrency} = {item.sym} {Number(parseFloat(item.exrate).toFixed(item.decimals)).toLocaleString('default',{minimumFractionDigits:item.decimals,maximumFractionDigits:item.decimals})}</Label>
								</Grid.Column>
								<Grid.Column textAlign="center" mobile={6} computer={4}>
									<Button floated="right" onClick={()=>onDelete(item.id)} icon={{name:"times circle", size:"big"}} negative />
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Segment>
				</List.Content>
			</List.Item>
		);
	}
}

export default CurrencyListItem;