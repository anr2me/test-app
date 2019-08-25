let actions = {
	ADD_ITEM: 'ADD_ITEM',
  REM_ITEM: 'REM_ITEM',
  SET_BASE_AMOUNT: 'SET_BASE_AMOUNT',
  
  SET_NEED_FETCH: 'SET_NEED_FETCH',
  FETCH_EXRATES_PENDING: 'FETCH_EXRATES_PENDING',
  FETCH_EXRATES_SUCCESS: 'FETCH_EXRATES_SUCCESS',
  FETCH_EXRATES_ERROR: 'FETCH_EXRATES_ERROR',
}

export const addItem = (data) => ({ type: actions.ADD_ITEM, data });
export const remItem = (id) => ({ type: actions.REM_ITEM, id });
export const setBaseAmount = (amount) => ({ type: actions.SET_BASE_AMOUNT, amount });

export const setNeedFetch = (needFetch) => ({ type: actions.SET_NEED_FETCH, needFetch });
export const fetchExratesPending = () => ({ type: actions.FETCH_EXRATES_PENDING });
export const fetchExratesSuccess = (data) => ({ type: actions.FETCH_EXRATES_SUCCESS, data });
export const fetchExratesError = (error) => ({ type: actions.FETCH_EXRATES_ERROR, error });

export default actions;
