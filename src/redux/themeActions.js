let themeActions = {
	SET_THEME: 'SET_THEME',
}

export const setThemeId = (id) => ({ type: themeActions.SET_THEME, id });

export default themeActions;
