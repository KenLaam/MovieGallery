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
    NavigatorIOS,
    TabBarIOS
} from 'react-native';

import ListMovie from "./app/list_movie";

export default class MovieGallery extends Component {

    now_playing = 'https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=';
    top_rated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=';

    constructor() {
        super();
        this.state = {
            selectedTab: 'nowPlaying',
        };
    }

    render() {
        return (
            <TabBarIOS
                tintColor='black'
                unselectedTintColor='#8F9393'
                barTintColor='#FFA726'>
                <TabBarIOS.Item
                    icon={require('./app/assets/ic_play.png')}
                    title='Now Playing'
                    selected={this.state.selectedTab === 'nowPlaying'}
                    onPress={() => {
                        this._fetchNowPlaying()
                    }}
                >
                    <NavigatorIOS
                        initialRoute={{
                            component: ListMovie,
                            title: 'Movie Gallery',
                            backButtonTitle: 'Back',
                            passProps: {
                                baseUrl: this.now_playing,
                            }
                        }}
                        style={styles.navbar}
                        barTintColor={'#FFA726'}
                    />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={require('./app/assets/ic_star.png')}
                    title='Top Rated'
                    selected={this.state.selectedTab === 'topRated'}
                    onPress={() => {
                       this._fetchTopRated()
                    }}
                >
                    <NavigatorIOS
                        initialRoute={{
                            component: ListMovie,
                            title: 'Movie Gallery',
                            backButtonTitle: 'Back',
                            passProps: {
                                baseUrl: this.top_rated,
                            }
                        }}
                        style={styles.navbar}
                        barTintColor={'#FFA726'}
                    />
                </TabBarIOS.Item>
            </TabBarIOS>
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
