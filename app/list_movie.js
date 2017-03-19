/**
 * Created by ken on 3/15/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    ListView,
    TouchableHighlight,
    RefreshControl,
    TabBarIOS,
    NavigatorIOS,
} from 'react-native';

import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';

import MovieDetail from "./movie_detail"

export default class ListMovie extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            url: this.props.baseUrl,
            page: 1,
            movieList: [],
            movieDS: dataSource.cloneWithRows([]),
            refreshing: true,
            selectedTab: 'nowPlaying',
        };
    }

    componentDidMount() {
        this._fetchData();
    }

    _refreshData() {
        this.setState({
            page: 1,
            movieList: [],
            refreshing: true,
        });

        this._fetchData();
    }

    _fetchData() {
        return fetch(this.state.url + this.state.page)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    page: this.state.page++,
                    movieList: this.state.movieList.concat(responseJson.results),
                    movieDS: this.state.movieDS.cloneWithRows(this.state.movieList.concat(responseJson.results)),
                    refreshing: false,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _fetchNowPlaying() {
        this.state.url = this.now_playing;
        this.state.page = 1;
        this.state.movieList = [];
        this.state.selectedTab = 'nowPlaying';
        this._fetchData();
    }

    _fetchTopRated() {
        this.state.url = this.top_rated;
        this.state.page = 1;
        this.state.movieList = [];
        this.state.selectedTab = 'topRated';
        this._fetchData();
    }

    render() {
        return (
            <TabBarIOS
                tintColor='black'
                unselectedTintColor='#8F9393'
                barTintColor='#FFA726'>
                <TabBarIOS.Item
                    icon={require('./assets/ic_play.png')}
                    title='Now Playing'
                    selected={this.state.selectedTab === 'nowPlaying'}
                    onPress={() => {
                        this._fetchNowPlaying()
                    }}
                >
                    {this._renderMovieList()}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={require('./assets/ic_star.png')}
                    title='Top Rated'
                    selected={this.state.selectedTab === 'topRated'}
                    onPress={() => {
                       this._fetchTopRated()
                    }}
                    style={styles.icon}
                >
                    {this._renderMovieList()}
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }

    _renderMovieList() {
        return (
            <View style={styles.container}>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._refreshData.bind(this)}
                        />}
                    dataSource={this.state.movieDS}
                    renderRow={(movie)=>this._renderMovieCell(movie)}
                    onEndReachedThreshold={2}
                    enableEmptySections={true}
                    onEndReached={() => this._fetchData()}
                />
            </View>
        );
    }

    _renderMovieCell(movie) {
        return (
            <TouchableHighlight
                underlayColor='white'
                activeOpacity={0.23}
                onPress={() => this._clickToDetail(movie)}
            >

                <View style={styles.row}>
                    <View style={styles.poster}>
                        <Image style={styles.image}
                               resizeMode='contain'
                               indicator={Progress}
                               source={{uri:"https://image.tmdb.org/t/p/w342/" + movie.poster_path}}/>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.title}>{movie.title}</Text>
                        <Text style={styles.description}
                              numberOfLines={4}>{movie.overview}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _clickToDetail(movie) {
        this.props.navigator.push({
            component: MovieDetail,
            passProps: {
                movie: movie,
            },
        })
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF9800',
    },

    row: {
        flexDirection: 'row',

    },

    poster: {
        flex: 3,
        margin: 5,
    },

    content: {
        flex: 7,
    },

    image: {
        height: 150,
    },

    title: {
        fontSize: 23,
    },

    description: {
        fontSize: 16,
    },

    icon: {
        height: 24,
        width: 24,
    },
});
module.exports = ListMovie;
