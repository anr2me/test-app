import React, { Component } from 'react';
import { List, Button, Label, Grid, Segment } from 'semantic-ui-react';
import { CurrencyNames } from './../Utils';
import styled from 'styled-components';

const StyledSegment = styled(Segment)`
  &&& {
    border-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR_FAINT)};
    background-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR)};
    color: ${props => (props.theme.PRIMARY_TEXT_COLOR)};
  }
`;

const StyledLabel = styled(Label)`
&&& {
	background-color: transparent;
	color: ${props => (props.theme.PRIMARY_TEXT_COLOR)};
    border-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR_FAINT)};
  
    &.small {
    	font-style: italic;
	}
}`;

class CurrencyListItem extends Component {

	render() {
		console.log('ItemThisProps: ', this.props);
		const { item, onDelete, baseCurrency, baseAmount } = this.props;
		return (
			<List.Item>
				<List.Content>
					<StyledSegment>
						<Grid columns="equal">
							<Grid.Row stretched>
								<Grid.Column textAlign="left">
									<Grid columns="equal">
										<Grid.Column textAlign="left" width={4}>
											<StyledLabel size="large">{item.sym}</StyledLabel>
										</Grid.Column>
										<Grid.Column textAlign="right" >
											<StyledLabel className="cur_amount" size="large">{Number(parseFloat(baseAmount * item.exrate).toFixed(item.decimals)).toLocaleString('default',{minimumFractionDigits:item.decimals,maximumFractionDigits:item.decimals})}</StyledLabel>
										</Grid.Column>
									</Grid>
									<StyledLabel size="small">{item.sym} - {CurrencyNames[item.sym]}</StyledLabel>
									<StyledLabel size="small">1 {baseCurrency} = {item.sym} {Number(parseFloat(item.exrate).toFixed(item.decimals)).toLocaleString('default',{minimumFractionDigits:item.decimals,maximumFractionDigits:item.decimals})}</StyledLabel>
								</Grid.Column>
								<Grid.Column textAlign="center" mobile={6} computer={4}>
									<Button floated="right" onClick={()=>onDelete(item.id)} icon={{name:"times circle", size:"big"}} negative />
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</StyledSegment>
				</List.Content>
			</List.Item>
		);
	}
}

export default CurrencyListItem;