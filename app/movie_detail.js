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
    TouchableHighlight,
    RefreshControl,
    NavigatorIOS,
} from 'react-native';

import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';


export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.movie.id);
    }

    render() {
        return (
            <Image style={styles.image}
                   resizeMode='contain'
                   indicator={Progress}
                   source={{uri:"https://image.tmdb.org/t/p/w342/" + this.props.movie.poster_path}}/>
        );

    }
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
    },
});
module.exports = MovieDetail;