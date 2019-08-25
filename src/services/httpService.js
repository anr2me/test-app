import { fetchExratesPending, fetchExratesSuccess, fetchExratesError, setNeedFetch } from './../redux/actions';

export default function fetchExrates(baseCurrency, symbols){
		return dispatch => {
			console.log('Fetching!!');
			dispatch(fetchExratesPending());
			fetch('https://api.exchangeratesapi.io/latest?base='+baseCurrency+'&symbols='+symbols)
			.then(res => res.json())
			.then(res => {
				if(res.error) {
					throw(res.error);
				}
				dispatch(fetchExratesSuccess(res.rates));
				return res.rates;
			})
			.catch(error => {
				dispatch(fetchExratesError(error));
			})
		}
}

export function triggerFetch(needFetch) { return dispatch => { console.log('triggerFetch!!'); dispatch(setNeedFetch(needFetch)) } };


