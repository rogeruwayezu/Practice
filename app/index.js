import React from 'react';
import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Navigator from './config/routes';
import  { AlertProvider } from './components/Alert';

EStyleSheet.build({
    $primaryOrange: '#D57A66',
    $primaryGreen: '#00BD9D',
    $primaryPurple: '#9E768F',
    $primaryBlue: '#4F6D7A',
    
    $white: '#ffff',
    $border: '#E2E2E2',
    $inputText: '#797979',
    $lightGray: '#F0F0F0',
    $darkText: '#343434',
});

export default () => <AlertProvider><Navigator /></AlertProvider>;   