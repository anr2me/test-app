import uniqueId from 'lodash/uniqueId';

const CurrencyNames = {
	'USD':'United State Dollar',
	'CAD':'Canadian Dollar',
	'IDR':'Indonesian Rupiah',
	'GBP':'British Pound',
	'CHF':'Swiss Franc',
	'SGD':'Singapore Dollar',
	'INR':'Indian Rupee',
	'MYR':'Malaysian Ringgit',
	'JPY':'Japanese Yen',
	'KRW':'South Korean Won',
	'EUR':'Euro'
}

class Store {
	
	addItem(name,data){
		localStorage.setItem(name,JSON.stringify(data));
	}
	
	getItem(name){
		var data = localStorage.getItem(name);
		return (data && JSON.parse(data)) || [];
	}
	
	removeItem(name){
		localStorage.removeItem(name);
	}
	
	clear(){
		localStorage.clear();
	}
}

export default Store;

export { CurrencyNames, uniqueId };
