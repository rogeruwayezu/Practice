import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { ListItem, Separator } from '../components/List';

const styles = EStyleSheet.create({
    $blue: '$primaryBlue',
    $green: '$primaryGreen',
    $orange: '$primaryOrange',
    $purple: '$primaryPurple',
});


class Themes extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    };

    handleThemesPress = (color) => {
        this.props.navigation.goBack();
    };

    render() {
        return(
            <ScrollView>
                <StatusBar translucent={false} barStyle="default" />
                <ListItem text="Blue" onPress={() => this.handleThemesPress(styles.$blue)} 
                  selected
                  checkmark={false}
                  iconBackground={styles.$blue}
                />
                <Separator />

                <ListItem text="Orange" onPress={() => this.handleThemesPress(styles.$orange)} 
                  selected
                  checkmark={false}
                  iconBackground={styles.$orange}
                />
                <Separator />

                <ListItem text="Green" onPress={() => this.handleThemesPress(styles.$green)} 
                  selected
                  checkmark={false}
                  iconBackground={styles.$green}
                />
                <Separator />

                <ListItem text="Purple" onPress={() => this.handleThemesPress(styles.$purple)} 
                  selected
                  checkmark={false}
                  iconBackground={styles.$purple}
                />
                <Separator />

        

            </ScrollView>
        );
    }
}


export default Themes;