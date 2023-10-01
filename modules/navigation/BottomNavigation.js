import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../home/home.js';
import RecipeFinder from '../recipes/recipesView';
import UserPage from '../User/userView';
import ShoppingList from '../shopping/ShoppingListView';

import { colors } from '../../styles';

const homeIcon = require('../../assets/images/icons/home.png');
const productsIcon = require('../../assets/images/icons/product.png');
const recipeIcon = require('../../assets/images/icons/recipe.png');
const userIcon = require('../../assets/images/icons/user.png');
const shoppingIcon = require('../../assets/images/icons/list.png');

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    headerImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
    },
});

// const headerLeftComponentMenu = (navigation) => {
//     return (
//       <TouchableOpacity
//         onPress={() => navigation.toggleDrawer()}
//         style={{
//           paddingHorizontal: 16,
//           paddingVertical: 12,
//         }}
//       >
//         <Image
//           source={require('../../assets/images/drawer/menu.png')}
//           resizeMode="contain"
//           style={{
//             height: 20,
//           }}
//         />
//       </TouchableOpacity>    
//     )
// }



const BottomNav = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: () => null, // This hides the label
        })}
        screenOptions={{
          "tabBarActiveTintColor": "blue",
          "tabBarInactiveTintColor": "gray",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]


        }}
      >
        {/* <Tab.Screen name="Home" component={Home}   options={{
        tabBarIcon: ({ color, size }) => (
        <Image source={homeIcon} style={{ width: size, height: size, tintColor: color }} />
            ),

    headerBackground: () => (
        <Image style={styles.headerImage} source={require('../../assets/images/topBarBg.png')} />
        ),
        headerTitleStyle: {
            color: colors.white,
            fontWeight: "700",
            fontSize: 16,
        },
      headerTitleAlign: 'center', 
    }} /> */}
          <Tab.Screen name="Shopping List" component={ShoppingList}  options={{
    tabBarIcon: ({ color, size }) => (
        <Image source={shoppingIcon} style={{ width: size, height: size, tintColor: color }} />
            ),    
    headerBackground: () => (
        <Image style={styles.headerImage} source={require('../../assets/images/topBarBg.png')} />
        ),
        headerTitleStyle: {
            color: colors.white,
            fontWeight: "700",
            fontSize: 14,
        },
      headerTitleAlign: 'center', 
      
    }}  />
        <Tab.Screen name="Products" component={Home}   options={{
    tabBarIcon: ({ color, size }) => (
        <Image source={productsIcon} style={{ width: size, height: size, tintColor: color }} />
            ),
    headerBackground: () => (
        <Image style={styles.headerImage} source={require('../../assets/images/topBarBg.png')} />
        ),
        headerTitleStyle: {
            color: colors.white,
            fontWeight: "700",
            fontSize: 14,
        },
      headerTitleAlign: 'center', 
      
    }}  />
        <Tab.Screen name="Recpies" component={RecipeFinder}  options={{
    tabBarIcon: ({ color, size }) => (
    <Image source={recipeIcon} style={{ width: size, height: size, tintColor: color }} />
        ),          
    headerBackground: () => (
        <Image style={styles.headerImage} source={require('../../assets/images/topBarBg.png')} />
        ),
        headerTitleStyle: {
            color: colors.white,
            fontWeight: "700",
            fontSize: 14,
        },
      headerTitleAlign: 'center', 
      
    }}  />
        <Tab.Screen name="Profile" component={UserPage}  options={{
    tabBarIcon: ({ color, size }) => (
        <Image source={userIcon} style={{ width: size, height: size, tintColor: color }} />
            ),    
    headerBackground: () => (
        <Image style={styles.headerImage} source={require('../../assets/images/topBarBg.png')} />
        ),
        headerTitleStyle: {
            color: colors.white,
            fontWeight: "700",
            fontSize: 14,
        },
      headerTitleAlign: 'center', 
      
    }}  />
      </Tab.Navigator>
    );
  };
  
    export default BottomNav;
  