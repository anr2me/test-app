import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Segment, Label, Input, Divider, Checkbox, Grid } from 'semantic-ui-react';
import { CurrencyNames } from './../Utils';
import { setBaseAmount } from './../redux/actions';
import { getItemList, getBaseAmount, getBaseCurrency } from './../redux/reducers';
import { getTheme, getThemeId } from './../redux/themeReducer';
import { setThemeId } from '../redux/themeActions';
import CurrencyList from './CurrencyList';
import AddMoreCurrency from './AddMoreCurrency';
import AddMoreButton from './AddMoreButton';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR)};
    color: ${props => (props.theme.PRIMARY_TEXT_COLOR)};
  }
`

const StyledContainer = styled(Container)`
  &&& {
    padding-top: 1em;
  }
`;

const StyledSegment = styled(Segment)`
  &&& {
    border-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR_FAINT)};
    background-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR)};
    color: ${props => (props.theme.PRIMARY_TEXT_COLOR)};

    &.app_wrapper{
      width:100%;
      max-width:460px;
      margin:auto;
      border-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR_STRONG)};
    }
  }
`;

const StyledLabel = styled(Label)`
  &&& {
    background-color: transparent;
    color: ${props => (props.theme.PRIMARY_TEXT_COLOR)};
    border-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR_FAINT)};
  
    &.small {
    font-style: italic;
  }
}`;

const StyledInput = styled(Input)`
  &&& {
    &.base_amount>input{
      text-align: right;
      font-weight: bold;

      background-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR)};
      color: ${props => (props.theme.PRIMARY_TEXT_COLOR)};
      border-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR_FAINT)};
    }

    &.error>input{
      background-color: ${props => (props.theme.ERROR_BACKGROUND_COLOR)};
      color: ${props => (props.theme.ERROR_TEXT_COLOR)};
      border-color: ${props => (props.theme.ERROR_BACKGROUND_COLOR_FAINT)};
    }
  }
`;

const StyledCheckbox = styled(Checkbox)`
  &&&& {
    &.dark_mode>input~label{
      background-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR)};
      color: ${props => (props.theme.PRIMARY_TEXT_COLOR)} !important;
      border-color: ${props => (props.theme.PRIMARY_BACKGROUND_COLOR_FAINT)};
    }
  }
`;

class App extends Component{

  constructor(props) {
    super(props);

    // local state
    this.state = {
      baseAmount: parseFloat(this.props.baseAmount).toFixed(4),
    }
  }

  // Save Form data in local state
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    console.log('AppThisState: ',this.state,' / ',{[name]:value});
    console.log('AppThisProps: ',this.props);
    // since setState is async we shouldn't use it's value immediately
    const { baseAmount } = {...this.state, [name]:value };
    this.props.dispatch(setBaseAmount(parseFloat(baseAmount)));
  }

  handleBlur = (e) => {
    console.log('CurThisOnBlurState: ',this.state,' / e: ',e,' CurThisOnBlurProps: ',this.props);
    this.setState({baseAmount: parseFloat(this.props.baseAmount).toFixed(4)});
  }

  handleTheme = (e, { name, checked }) => {
    this.setState({ [name]: checked });
    console.log('AppThisState2: ',this.state,' / ',{[name]:checked});
    console.log('AppThisProps2: ',this.props);
 
    this.props.dispatch(setThemeId(checked===true?1:0));
  }
	
	render() {
		const {itemList, baseCurrency, baseAmount, theme, themeId} = this.props;
		return (
      <ThemeProvider theme={theme}>
        <StyledContainer textAlign="center">
          <GlobalStyle />
          <StyledSegment className="app_wrapper" textAlign="left">
            <Grid columns="equal">
              <Grid.Column>
                <StyledLabel size="small">{baseCurrency} - {CurrencyNames[baseCurrency]}</StyledLabel>
              </Grid.Column>
              <Grid.Column textAlign="right">
                <StyledCheckbox className="dark_mode" name="cb_dark_mode" ref="cb_dark_mode" size="small" floated="right" onChange={this.handleTheme} toggle label='Dark Mode' checked={(themeId===1?true:false)} />
              </Grid.Column>
            </Grid>
            <StyledInput className="base_amount" name="baseAmount" ref="baseAmount" error={Number.isNaN(parseFloat(this.state.baseAmount))} fluid labelPosition="left" size="large" type="text" placeholder="Amount" value={/*parseFloat(this.props.baseAmount).toFixed(4)*/this.state.baseAmount || baseAmount} onChange={this.handleChange} onBlur={this.handleBlur}>
            <StyledLabel basic>{baseCurrency}</StyledLabel>
            <input />
            </StyledInput>
            <Divider />

            <CurrencyList itemList={itemList} />

            <StyledSegment>
              <React.Fragment>
                <Switch>
                  <Route exact path="/add" component={AddMoreCurrency} />
                  <Route exact path="/" component={AddMoreButton} />
                  <Route component={AddMoreButton} />
                </Switch>
              </React.Fragment>
            </StyledSegment>
          </StyledSegment>
        </StyledContainer>
      </ThemeProvider>
		)	
	}
}

const mapStateToProps = (state) => {
  return {
    itemList: getItemList(state),
    baseCurrency: getBaseCurrency(state),
    baseAmount: getBaseAmount(state),
    theme: getTheme(state),
    themeId: getThemeId(state),
  }
}

export default connect(mapStateToProps, null)(App)

