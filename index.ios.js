import React, {
  AppRegistry,
  MapView,
  StyleSheet,
  View
} from 'react-native';

import Api from './src/api';

var Weather = React.createClass({
    getInitialState: function() {
        return {
            pin: {
                latitude: 0,
                longitude: 0
            },
            city: '',
            tempurature: '',
            description: '',
        }
    },
    render: function() {
        return <MapView
            annotations={[this.state.pin]}
            onRegionChangeComplete={this.onRegionChangeComplete}
            style={styles.map}>
        </MapView>
    },
    onRegionChangeComplete: function({ latitude, longitude }) {
        this.setState({
            pin: {
                latitude,
                longitude
            }
        });

        Api(latitude, longitude)
            .then((data) => {
                console.log(data);
                this.setState(data)
            });
    }
});

var styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

AppRegistry.registerComponent('weather', () => Weather);
