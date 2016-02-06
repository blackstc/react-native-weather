var React = require('react-native');
var {
    AppRegistry,
    MapView,
    View,
    Text,
    StyleSheet
} = React;

var Api = require('./src/api');

var Weather = React.createClass({
    getInitialState: function() {
        return {
            pin: {
                latitude: 0,
                longitude: 0
            },
            city: '',
            tempurature: '',
            description: ''
        };
    },
    render: function() {
        return <View style={styles.container}>
            <MapView
                annotations={[this.state.pin]}
                onRegionChangeComplete={this.onRegionChangeComplete}
                style={styles.map}>
            </MapView>
            <View style={styles.textWrapper}>
                <Text style={styles.text}>{this.state.city}</Text>
                <Text style={styles.text}>{this.state.tempurature}</Text>
                <Text style={styles.text}>{this.state.description}</Text>
            </View>
        </View>
    },
    onRegionChangeComplete: function(region) {
        this.setState({
            pin: {
                longitude: region.longitude,
                latitude: region.latitude
            }
        });

        Api(region.latitude, region.longitude)
        .then((data) => {
            this.setState(data);
            console.log(this.state);
        });
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    map: {
        flex: 2,
        marginTop: 30
    },
    textWrapper: {
        flex: 1,
        alignItems: 'center',
        margin: 10
    },
    text: {
        fontSize: 30,
        margin: 10
    }
});

AppRegistry.registerComponent('weather', () => Weather);
