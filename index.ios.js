/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS
} from 'react-native';

import ListMovie from "./app/list_movie";

export default class MovieGallery extends Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: ListMovie,
                    title: 'Movie Gallery',
                }}
                style={styles.navbar}
                barTintColor={'#FFA726'}
                shadowHidden={false}
            />
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        flex: 1,
        backgroundColor: '#FF9800',
    }
});

AppRegistry.registerComponent('MovieGallery', () => MovieGallery);
