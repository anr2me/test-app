import { base, darkTheme, lightTheme } from "./../themes";
import themeActions from './themeActions';

const initialState = {
    themeId: 0,
    theme: { ...base, ...lightTheme }
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case themeActions.SET_THEME:
        let seltheme = {...lightTheme}
        switch (action.id){
            case 1:
                seltheme = {...darkTheme};
                break;
            default:                
        }
        return {...state, themeId:action.id, theme: { ...base, ...seltheme }};
    default:
        return state;
  }
};

export default themeReducer;

export const getTheme = state => state.themeReducer.theme;
export const getThemeId = state => state.themeReducer.themeId;