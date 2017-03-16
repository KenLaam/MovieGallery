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
} from 'react-native';

import InfiniteScrollView from 'react-native-infinite-scroll-view';

export default class ListMovie extends Component {

    constructor() {
        super();
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            now_playing: 'https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=',
            top_rated: 'https://api.themoviedb.org/3/movie/top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=',
            page: 0,
            moviesList: [],
            moviesDB: dataSource.cloneWithRows([]),
            refreshing: false,
        };
    }

    componentDidMount() {
        this.fetchData()
    }

    refreshData() {
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            page: 0,
            moviesList: [],
            moviesDB: dataSource.cloneWithRows([]),
            refreshing: true,
        });
        this.fetchData()
            .then(() => this.setState({
                refreshing: false,
            }));
    }

    fetchData() {
        this.state.page++;
        return fetch(this.state.now_playing + this.state.page)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("before " + (this.state.moviesList.concat(responseJson.results)).length);
                this.setState({
                    moviesList: this.state.moviesList.concat(responseJson.results),
                    moviesDB: this.state.moviesDB.cloneWithRows(this.state.moviesList.concat(responseJson.results))
                });
                console.log("after " + this.state.moviesList.length);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.refreshData.bind(this)}
                        />}
                    dataSource={this.state.moviesDB}
                    renderRow={this.movieCell.bind(this)}
                    onEndReachedThreshold={3}
                    onEndReached={this.fetchData()}
                />
            </View>
        );
    }

    movieCell(movie) {
        return (
            <TouchableHighlight
                underlayColor="white"
                activeOpacity={0.3}
                onPress={() => this.toMovieDetail(movie)}
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

    toMovieDetail(movie) {
        console.log(movie.id);
    }

}


const onButtonPress = () => {
    alert('Button has been pressed!');
};

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