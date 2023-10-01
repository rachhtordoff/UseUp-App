import React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Dimensions, View, Text, StyleSheet} from 'react-native';
import { colors, fonts } from '../../styles';
import AllProducts from '../products/all_products.js';
import ExpiringSoon from '../products/expiring_soon.js';
import ExpiredProducts from '../products/expired_products.js';


const styles = StyleSheet.create({
  tabheaderText: {
    fontSize:16,
    fontWeight:"600"
  },
  tabheader: {
    flex: 1
  
  },
  container: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden', // This ensures children don't spill outside the rounded corners
    marginBottom: 40,
    fontFamily: fonts.primaryRegular,

  },
  tabLabel: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    textTransform: 'none',
    fontWeight:"800"
  },
  tabBar: {
    backgroundColor: colors.white,
    elevation: 0,
    shadowOpacity: 0,
    width:"100%",
    borderBottomWidth: 0.5, // Adjust the width as per your requirement
    borderBottomColor: '#D3D3D3'
  },
  tabIndicator: {
    borderRadius: 10,
    height: 2,
    backgroundColor: 'blue',
  },
});

const FirstRoute = () => (
  <View style={ styles.tabheader}>
    <AllProducts />
  </View>
);

const SecondRoute = () => (
  <View style={ styles.tabheader}>
    <ExpiringSoon />
  </View>
);

const ThirdRoute = () => (
  <View style={ styles.tabheader}>
    <ExpiredProducts />

  </View>
);

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,

});


const NavPills = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'All Products' },
    { key: 'second', title: 'Expiring Soon' },
    { key: 'third', title: 'Expired' },

  ]);

  
  return (
    <TabView
      style={{ flex: 1, width: '100%' }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={props => (
        <TabBar
          {...props}
          style={styles.tabBar}
          labelStyle={styles.tabLabel}
          pressColor="transparent"
          indicatorStyle={styles.tabIndicator}
          activeColor={colors.primaryGradientStart} // color of the label when active
          inactiveColor={colors.lightGray} // color of the label when inactive
        />
      )}
    />
  );
}

export default NavPills;