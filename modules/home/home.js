import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import { ListItem, Avatar, Card, withTheme } from 'react-native-elements';
import { Button, ButtonSize, Header } from 'react-native-ui-lib';
import { colors, fonts } from '../../styles';
import NavPills from '../navigation/navpills'; // Adjust the import path accordingly
import BarcodeScanner from '../barcodeScanner/BarcodeScanner';
import ReceiptScanner from '../receiptScanner/ReceiptScanner';
import NewProduct from '../products/new_product.js'
import { useNavigation } from '@react-navigation/native';


const barcodeIcon = require('../../assets/images/icons/barcode.png');
const scanIcon = require('../../assets/images/icons/scan.png');
const createIcon = require('../../assets/images/icons/edit.png');

const App = () => {

  const [showOptions, setShowOptions] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showReceiptScanner, setShowReceiptScanner] = useState(false);
  const navigation = useNavigation();


const styles = StyleSheet.create({
    pageContainer: {
      fontFamily: fonts.primaryRegular,
      height:'100%'
    },
    textHeader: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: "800",
    },
    fabContainer: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      alignItems: 'flex-end',
    },
    fab: {
      backgroundColor: '#5067FF',
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
    },
    fabText: {
      color: 'white',
      fontSize: 24,
      alignSelf: 'center',
    },
    optionsContainer: {
      marginBottom: 15,
      alignItems: 'flex-end',
    },
    fabOption: {
      backgroundColor: 'white',
      elevation: 6,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 150,
      height: 40,
      borderRadius: 5,
    }

  });

  return (
    <View style={styles.pageContainer}>
        <NavPills />

          <View style={styles.fabContainer}>
            {showOptions && (
              <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.fabOption} onPress={() => {
                  setShowOptions(false);
                  navigation.navigate('Receipt Scanner');

                }}>
                  <Text>Scan Receipt</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.fabOption} onPress={() => {
                  setShowOptions(false);
                  navigation.navigate('Barcode Scanner');

                }}>
                  <Text>Scan Barcode</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.fabOption} onPress={() => {
                  setShowOptions(false);
                  navigation.navigate('New Product');
                }}>
                  <Text>Manual Import</Text>
                </TouchableOpacity>



              </View>
            )}

            <TouchableOpacity style={styles.fab} onPress={() => setShowOptions(!showOptions)}>
              <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
          </View>
    </View>
  );
};


export default App;
