import { uniqueId } from './../Utils';
import actions from './actions';

const initialList = ['IDR','EUR'];
const initialState = {
	baseCurrency: 'USD',
	baseAmount: 10.0,
	needFetch: false,
	fetchRetry: 0,
	fetchError: '',
	fetchPending: false,
	itemList: initialList.map((item) => {
		return { id:uniqueId('item_'), sym:item, exrate:0.0, decimals:4 }
	})
}

let reducers = (state = initialState, action) => {
	console.log("Action: ",action);
	switch (action.type) { 
		case actions.ADD_ITEM:
			return {...state, needFetch:true, itemList: state.itemList.concat({ id:uniqueId('item_'), sym:action.data, exrate:0.0, decimals:4 })};
		case actions.REM_ITEM:
			return {...state, itemList: state.itemList.filter(obj => obj.id !== action.id)};
		case actions.SET_BASE_AMOUNT:
			return {...state, baseAmount:action.amount};

		case actions.NEED_FETCH:
			return {...state, needFetch:action.needFetch};
		case actions.FETCH_EXRATES_PENDING:
			return {...state, fetchPending:true, needFetch:false};
		case actions.FETCH_EXRATES_SUCCESS:
			return {...state, fetchPending:false, needFetch:false, fetchRetry:0,
				itemList: state.itemList.map((obj)=>{
					let newObj = Object.assign({},obj);
					newObj.exrate = parseFloat(action.data[obj.sym]);
					newObj.decimals = (newObj.exrate>=100.0?2:4);
					return newObj;
				})};
		case actions.FETCH_EXRATES_ERROR:
			return {...state, fetchPending:false, fetchRetry:(state.fetchRetry+1), needFetch:(state.fetchRetry<2), fetchError:action.error};
		default:      
			return state;  
	}
}

export default reducers;

export const getBaseCurrency = state => state.reducers.baseCurrency;
export const getBaseAmount = state => state.reducers.baseAmount;
export const getItemList = state => state.reducers.itemList;

export const getNeedFetch = state => state.reducers.needFetch;
export const getFetchPending = state => state.reducers.fetchPending;
export const getFetchError = state => state.reducers.fetchError;
