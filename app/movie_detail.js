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
    LayoutAnimation,
    TouchableOpacity,
    Animated,
    ScrollView,
} from 'react-native';

import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';


export default class MovieDetail extends Component {
    constructor() {
        super();
        this.state = {
            height: 200,
            lines: 2,
            marginScroll: 400,
        }
    }

    componentDidMount() {
        console.log(this.props.movie);
    }

    render() {
        var marginScroll = this.state.marginScroll;
        var lines = this.state.lines;
        return (
            <Image style={styles.background}
                   resizeMode='cover'
                   indicator={Progress}
                   source={{uri:"https://image.tmdb.org/t/p/original" + this.props.movie.poster_path}}
            >
                <View style={{marginTop: marginScroll}}
                >
                    <ScrollView>
                        <TouchableOpacity onPress={() => this._clickToOpen()}>
                            <View style={styles.description}>
                                <Text style={styles.title}>{this.props.movie.title}</Text>
                                <Text>{this.props.movie.release_date}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Image
                                        style={styles.icon}
                                        source={require('./assets/ic_vote.png')}
                                    />
                                    <Text style={styles.vote}>{this.props.movie.vote_average}</Text>
                                    <Image
                                        style={styles.icon}
                                        source={require('./assets/ic_rate.png')}
                                    />
                                    <Text style={styles.vote}>{this.props.movie.vote_count}</Text>
                                </View>
                                <Text style={styles.overview}
                                      numberOfLines={lines}
                                >{this.props.movie.overview}</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Image>
        );
    }

    _clickToOpen() {
        var height = this.state.height;
        var lines = this.state.lines;
        var marginScroll = this.state.marginScroll;
        if (height == 200) {
            height = 50;
            lines  = 0;
            marginScroll = 300;
        } else {
            height = 200;
            lines  = 2;
            marginScroll = 400;
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({
            height,
            lines,
            marginScroll
        })
    }
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 64,
        marginBottom: 30,
    },

    description: {
        backgroundColor: '#0C0E10',
        margin: 28,
        padding: 8,
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },

    icon: {
        height: 16,
        width: 16,
        marginRight: 4,
    },

    vote: {
        flex: 1,
        color: '#8A8D8E',
    },

    overview: {
        textAlign: 'justify',
        color: 'white',
    },
});
module.exports = MovieDetail;