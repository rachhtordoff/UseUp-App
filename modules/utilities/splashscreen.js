import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

const useupicon = require('../../assets/images/backgroundimage2.png');

const SplashScreenComponent = () => {
    return (
        <View style={styles.container}>
            <Image source={useupicon} style={styles.image} />
            <ActivityIndicator size="large" color="#ffffff" style={styles.spinner} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'  // assuming you want a black background, change as necessary
    },
    image: {
        width: "100%",
        height: "100%",
        position: 'absolute', // so it's at the background
    },
    spinner: {
        marginTop:350
    }
});

export default SplashScreenComponent;
