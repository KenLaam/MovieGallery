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
    Image,
    TouchableHighlight,
    RefreshControl,
    TabBarIOS,
    NavigatorIOS,
} from 'react-native';

export default class ListMovie extends Component {

    now_playing = 'https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=';
    top_rated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=';

    constructor() {
        super();
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            url: this.now_playing,
            page: 1,
            movieList: [],
            movieDS: dataSource.cloneWithRows([]),
            refreshing: false,
            selectedTab: "nowPlaying",
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

        this._fetchData()
            .then(() => this.setState({
                refreshing: false,
            }));
    }

    _fetchData() {
        return fetch(this.state.url + this.state.page)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    page: this.state.page++,
                    movieList: this.state.movieList.concat(responseJson.results),
                    movieDS: this.state.movieDS.cloneWithRows(this.state.movieList.concat(responseJson.results))
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
        this.state.selectedTab = "nowPlaying";
        this._fetchData();
    }

    _fetchTopRated() {
        this.state.url = this.top_rated;
        this.state.page = 1;
        this.state.movieList = [];
        this.state.selectedTab = "topRated";
        this._fetchData();
    }

    render() {
        return (
            <TabBarIOS
                tintColor="black"
                unselectedTintColor="#8F9393"
                barTintColor="#EABD67">
                <TabBarIOS.Item
                    icon={require('./assets/ic_play.png')}
                    title="Now Playing"
                    selected={this.state.selectedTab === 'nowPlaying'}
                    onPress={() => {
                        this._fetchNowPlaying()
                    }}
                >
                    {this._renderMovieList()}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={require('./assets/ic_star.png')}
                    title="Top Rated"
                    selected={this.state.selectedTab === 'topRated'}
                    onPress={() => {
                       this._fetchTopRated()
                    }}
                >
                    {this._renderMovieList()}
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    }

    _renderMovieList() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
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
                underlayColor="white"
                activeOpacity={0.23}
                onPress={() => this._clickToDetail(movie)}
            >

                <View style={styles.row}>
                    <View style={styles.poster}>
                        <Image style={styles.image}
                               resizeMode="contain"
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
        console.log('Movie  id', movie.id);
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
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
});