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
    Image
} from 'react-native';

export default class ListMovie extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            movies: ds.cloneWithRows([]),
        };
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    movies: this.state.movies.cloneWithRows(responseJson.results)
                })
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
                    dataSource={this.state.movies}
                    renderRow={this.movieCell}
                />

            </View>
        );
    }

    movieCell(rowData) {
        return (
            <View style={styles.row}>
                <View style={styles.poster}>
                    <Image style={{ height: 150,}}
                           source={{uri:"https://image.tmdb.org/t/p/w342/" + rowData.poster_path}}/>
                </View>

                <View style={styles.content}>
                    <Text>{rowData.title}</Text>
                    <Text>{rowData.overview}</Text>
                </View>
            </View>
        );

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
        margin: 10,
    },

    content: {
        flex: 7,

    },

    title: {},

    description: {}


});