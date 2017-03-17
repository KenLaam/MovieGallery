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
    TouchableHighlight,
    RefreshControl,
    NavigatorIOS,
} from 'react-native';

export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        var movie = this.props.movie;
    }

    componentDidMount() {
        console.log(this.props.movie.id);
    }

    render() {
        return (
            <View>


            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
    },
});