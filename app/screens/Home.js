import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Container } from '../components/Container';
import { connect } from 'react-redux';

import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';

import { swapCurrency, changeCurrencyAmount } from '../actions/currencies';


const TEMP_CONVERSION_RATE = 0.7974;
const TEMP_CONVERSION_DATE = new Date();

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    isFetching: PropTypes.bool,
    lastConvertedDate: PropTypes.object,
  };
  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' });
  };
  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote' });
  };
handleTextChange = (amount) => {
  this.props.dispatch(changeCurrencyAmount(amount));
};
handleSwapCurrency = () =>{
  this.props.dispatch(swapCurrency());
};

handleOptionsPress = () => {
  this.props.navigation.navigate('Options');
};
  render() {

    let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
    if (this.props.isFetching) {
      quotePrice = '...';
    }

    return (
        <Container>
          <StatusBar translucent={false} barStyle="light-content" />
          <Header onPress={this.handleOptionsPress} />

          <KeyboardAvoidingView behavior="padding">
          <Logo />
          <InputWithButton 
            buttonText={this.props.baseCurrency} 
            onPress={this.handlePressBaseCurrency} 
            defaultValue={this.props.amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
          />
          <InputWithButton 
            onPress={this.handlePressQuoteCurrency}
            buttonText={this.props.quoteCurrency}
            editable={false} 
            value={quotePrice}
           />

            <LastConverted 
              base={this.props.baseCurrency}
              quote={this.props.quoteCurrency}
              date={this.props.lastConvertedDate}
              conversionRate={this.props.conversionRate}

            />

            <ClearButton 
             text="Reverse currencies"
             onPress={this.handleSwapCurrency}
            />
          </KeyboardAvoidingView>
        </Container>
      );
    }
  }

const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};

  return {
    baseCurrency,
    quoteCurrency,
    amount: state.currencies.amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching: conversionSelector.isFetching,
    lastConvertedDate: conversionSelector.date ? new Date
    (conversionSelector.date) : new Date(),
  };
};


export default connect(mapStateToProps)(Home);