import React, { Component } from 'react';
import { List, Button } from 'semantic-ui-react';
import './CurrencyListItem.css';

class CurrencyListItem extends Component{

	render() {
    console.log('ItemThisProps: ',this.props);
		const {item, remItem} = this.props;
		return (
			<List.Item>
				<List.Content>{item.sym} - {item.name}<Button onClick={()=>remItem(item.id)}> x </Button></List.Content>
			</List.Item>
		);		
	}
}

export default CurrencyListItem
