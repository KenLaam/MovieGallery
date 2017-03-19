/**
 * Created by ken on 3/17/17.
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
} from 'react-native';

// import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';


export default class MovieDetail extends Component {
    componentDidMount() {
        console.log(this.props.movie);
    }

    render() {
        return (
            <Image style={styles.image}
                   resizeMode='cover'
                   source={{uri:"https://image.tmdb.org/t/p/w342/" + this.props.movie.poster_path}}
            >
                <Text
                    style={styles.description}
                >{this.props.movie.overview}</Text>
            </Image>
        );

    }
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        backgroundColor: 'transparent'
    }
});
module.exports = MovieDetail;