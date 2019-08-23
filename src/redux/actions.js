let actions = {
	ADD_ITEM: 'ADD_ITEM',
	REM_ITEM: 'REM_ITEM',
	UPDATE_ALL: 'UPDATE_ALL',
}

function addItem(data) {
  return {
    type: actions.ADD_ITEM,
    data,
  }
}

function remItem(id) {
  return {
    type: actions.REM_ITEM,
    id,
  }
}

function updateAll(id) {
  return {
    type: actions.UPDATE_ALL,
  }
}

export default actions;
export { addItem, remItem, updateAll };