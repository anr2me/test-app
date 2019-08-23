import { CurrencyNames, uniqueId } from './../Utils';
import actions from './actions';

const initialList = ['IDR','SGD'];
const INITIAL_STATE = {
	itemList: initialList.map((item) => {
		return { id:uniqueId('item_'), sym:item, name:CurrencyNames[item] }
	})
}

let reducers = (state = INITIAL_STATE, action) => {  
	switch (action.type) { 
		case actions.ADD_ITEM:
			return {...state};
		case actions.REM_ITEM:
			return {...state};
		default:      
			return state;  
	}
}

export default reducers;