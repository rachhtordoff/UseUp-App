import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Image} from 'react-native';
import { ListItem, Avatar, Card } from 'react-native-elements';
import BarcodeScanner from '../barcodeScanner/BarcodeScanner';
import {Button, ButtonSize, Header} from 'react-native-ui-lib';

const App = () => {
  // This is sample data. You'd replace this with your actual fridge items fetched from a data source.
  const fridgeItems = [
    {
      id: 1,
      name: 'Milk',
      expiryDate: '2023-09-10',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Eggs',
      expiryDate: '2023-09-05',
      image: 'https://via.placeholder.com/150',
    },
    // ... add more items
  ];
  const [showScanner, setShowScanner] = useState(false);
  const styles = StyleSheet.create({
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50, // Adjust this value according to your preference
    },
    logo: {
      width: 150, // Or your desired logo width
      height: 50,  // Or your desired logo height
      resizeMode: 'contain'
    },
    // ... other styles
  });
  

return (
    <View style={{ flex: 1 }}>
    <View style={styles.logoContainer}>
    <Image 
        source={{ uri: 'https://i.ibb.co/1qWWY03/Screenshot-2023-08-08-at-10-40-19.png' }} 
        style={styles.logo} 
      />
    </View>
      {showScanner ? (
        <BarcodeScanner
          onScan={(data) => {
            // Handle the scanned data
            console.log(data);
            // Optionally fetch item details from an API here based on the scanned data
            setShowScanner(false);  // Close the scanner after scanning
          }}
        />
      ) : (
        <>

          <ScrollView>
            {fridgeItems.map(item => (
              <Card key={item.id}>
                <ListItem bottomDivider>
                  <Avatar source={{ uri: item.image }} />
                  <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>Expiry: {item.expiryDate}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </Card>
            ))}
          </ScrollView>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button 
                size={ButtonSize.large} 
                onPress={() => setShowScanner(true)} 
                label="Scan Barcode" 
            />
        </View>


        </>
      )}
    </View>
  );
  
            }
export default App;
