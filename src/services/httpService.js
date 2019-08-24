import { fetchExratesPending, fetchExratesSuccess, fetchExratesError } from './../redux/actions';

function fetchExrates(baseCurrency, symbols){
		return dispatch => {
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


export default fetchExrates;

