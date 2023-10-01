// app.js
import React, { useContext,useState,  useEffect} from 'react';
import BottomNav from './modules/navigation/BottomNavigation'; // Import the BottomNav component
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthContext from './modules/Authentication/authContext';  // adjust the path
import LoginPage from './modules/login/LoginView.js'
import { StyleSheet, Image } from 'react-native';
import SplashScreenComponent from './modules/utilities/splashscreen.js';  // adjust the path
import ProductDetails from './modules/products/new_product.js'
import BarcodeScanner from './modules/barcodeScanner/BarcodeScanner.js'
import { colors } from './styles';
import ReceiptScanner from './modules/receiptScanner/ReceiptScanner';
import ReceiptItems from './modules/receiptScanner/ReceiptItems';
import WasteScreen from './modules/products/wasteproduct';
import EditProduct from './modules/products/edit_product';

// Create a context for the authentication status

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 100, // set your desired height
  },
    headerImage2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 56, // set your desired height
  },
});

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an app loading process. 
    // You might replace this with actual initialization logic, e.g., fetching user data.
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);  // 3 seconds delay
  }, []);

  if (isLoading) {
    return <SplashScreenComponent />;
  }

  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Products" : "Login"}>
        {isLoggedIn ? (
          <>
        <Stack.Screen name="Products" component={BottomNav}   options={{
            headerShown: false
            }} />

        <Stack.Screen name="New Product" component={ProductDetails}
          options={{
            headerBackground: () => (
              <Image style={styles.headerImage2} source={require('./assets/images/topBarBg.png')} />
              ),
              headerTitleStyle: {
                  color: colors.white,
                  fontWeight: "700",
                  fontSize: 14,
              },
            headerTitleAlign: 'center', 
            }}
            
          />
          <Stack.Screen name="Barcode Scanner" component={BarcodeScanner} />
          <Stack.Screen name="Receipt Scanner" component={ReceiptScanner} />
          <Stack.Screen name="Receipt Items" component={ReceiptItems} />
          <Stack.Screen name="Bin It!" component={WasteScreen} />
          <Stack.Screen name="Edit Product" component={EditProduct} />


          </>
        ) : (
          <Stack.Screen name="Login" component={LoginPage}
          options={{
            headerShown: false
            }}
          />
        )}
      </Stack.Navigator>
        
      </NavigationContainer>
  );


  
};


export default App;

