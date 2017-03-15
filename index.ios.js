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
    View
} from 'react-native';

import ListMovie from "./app/list_movie"

export default class MovieGallery extends Component {
    render() {
        return (
            <ListMovie/>
        );
    }
}

AppRegistry.registerComponent('MovieGallery', () => MovieGallery);
