import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';


LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native']);


const BarcodeScanner = () => {
  const [barcodeData, setBarcodeData] = useState(null);
  const navigation = useNavigation();
  const [estimate_expiry, setestimate_expiry] = useState(null);
  const [isScanning, setIsScanning] = useState(true);  // Step 1: isScanning state
  const [isLoading, setIsLoading] = useState(false); // Step 1: isLoading state

  const handleBarCodeScanned = ({ type, data }) => {
    if (!isScanning) return;

    setIsScanning(false);
    setIsLoading(true); // Start loading
    fetchProductData(data);
  };
    const fetchProductData = async (barcode) => {
      const country_code = "world"; // Modify this as needed
      const user_agent = "NameOfYourApp - Android - Version 1.0 - www.yourappwebsite.com";
      const base_url = `https://${country_code}.openfoodfacts.org/api/v0/product/${barcode}.json`;
    
      const headers = {
        "User-Agent": user_agent
      };
    
      try {
        const response = await fetch(base_url, { method: 'GET', headers: headers });
        const products = await response.json();

        if (response.status === 200) {

          function get_estimate_expiry(category, name) {
              const today = new Date();

              if (category == 'Bread') {
                today.setDate(today.getDate() + 6);
                return today;
              
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                const yyyy = today.getFullYear();
              
                return `${dd}/${mm}/${yyyy}`;
             } else if (category == 'Cupboard') {
                today.setFullYear(today.getFullYear() + 2);
                return today;

                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                const yyyy = today.getFullYear();
                return `${dd}/${mm}/${yyyy}`;

            }else if (category == 'Dairy & Eggs') {
                if (name.includes("milk")){
                  today.setDate(today.getDate() + 7);
                  return today;
                
                  const dd = String(today.getDate()).padStart(2, '0');
                  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                  const yyyy = today.getFullYear();
                
                  return `${dd}/${mm}/${yyyy}`;
                } else if (name.includes("cheese")){
                  if (name.includes("soft")){
                    today.setDate(today.getDate() + 14);
                    return today;
                  
                    const dd = String(today.getDate()).padStart(2, '0');
                    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                    const yyyy = today.getFullYear();
                  
                    return `${dd}/${mm}/${yyyy}`;
                  } else {
                    today.setMonth(today.getMonth() + 6);
                    return today;
                
                    const dd = String(today.getDate()).padStart(2, '0');
                    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                    const yyyy = today.getFullYear();
                  
                    return `${dd}/${mm}/${yyyy}`;
                  }
                } else if (name.includes("eggs")){
                  today.setDate(today.getDate() + 21);
                  return today;
                  const dd = String(today.getDate()).padStart(2, '0');
                  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                  const yyyy = today.getFullYear();
                
                  return `${dd}/${mm}/${yyyy}`;

                }
           }else if (category == 'Fish') {
                if (name.includes("fresh")){
                  today.setDate(today.getDate() + 2);
                  return today;
                  const dd = String(today.getDate()).padStart(2, '0');
                  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                  const yyyy = today.getFullYear();
                
                  return `${dd}/${mm}/${yyyy}`;
                } else if (name.includes("frozen")){
                  today.setMonth(today.getMonth() + 6);
                  return today;
                  
                  const dd = String(today.getDate()).padStart(2, '0');
                  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                  const yyyy = today.getFullYear();
                
                  return `${dd}/${mm}/${yyyy}`;
                } else if (name.includes("canned")){
                  today.setFullYear(today.getFullYear() + 3);
                  return today;
                  
                  const dd = String(today.getDate()).padStart(2, '0');
                  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                  const yyyy = today.getFullYear();
                
                  return `${dd}/${mm}/${yyyy}`;
                }

            }else if (category == 'Fruit & Veg') {
              if (name.includes("potatoe")){
                today.setDate(today.getDate() + 10);
                return today;
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                const yyyy = today.getFullYear();
              
                return `${dd}/${mm}/${yyyy}`;
               } 
               else if (name.includes("apple")){
                today.setDate(today.getDate() + 28);
                return today;
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                const yyyy = today.getFullYear();
              
                return `${dd}/${mm}/${yyyy}`;
               }
               else{
                today.setDate(today.getDate() + 7);
                return today;
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                const yyyy = today.getFullYear();
              
                return `${dd}/${mm}/${yyyy}`;
               }

            }else if (category == 'Meat') {
              if (name.includes("chicken") || name.includes("turkey") || name.includes("duck") || name.includes("Goose")) {
                today.setDate(today.getDate() + 3);
                return today;
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                const yyyy = today.getFullYear();
              
                return `${dd}/${mm}/${yyyy}`;
              } else if (name.includes("beef mince") || name.includes("pork mince") || name.includes("lamb mince")) {
                today.setDate(today.getDate() + 5);
                return today;
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                const yyyy = today.getFullYear();
              
                return `${dd}/${mm}/${yyyy}`;


              } else if (name.includes("beef") || name.includes("pork") || name.includes("lamb") || name.includes("goat")) {
                today.setDate(today.getDate() + 5);
                return today;
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                const yyyy = today.getFullYear();
              
                return `${dd}/${mm}/${yyyy}`;

            }
          }
        }

          if (products.status_verbose == "product found") {
                const productData = products && products.product;
                if (!productData) {
                  console.error("Invalid product data:", products);
                  navigation.navigate('New Product', { product: null });
                  return;
              }
                const categoryMapping = {
                  'Breads': 'Bakery',
                  'Biscuits and cakes': 'Bakery',
                  'Biscuits': 'Bakery',
                  'groceries': 'Cupboard',
                  'Condiments': 'Cupboard',
                  'Sauces': 'Cupboard',
                  'Spreads': 'Cupboard',
                  'Sweet spreads': 'Cupboard',
                  'Cocoa and its products': 'Cupboard',
                  'Dairies': 'Dairy & Eggs',
                  'Cheeses': 'Dairy & Eggs',
                  'Dairy desserts': 'Dairy & Eggs',
                  'Fermented milk products': 'Dairy & Eggs',
                  'Fermented dairy desserts': 'Dairy & Eggs',
                  'Plant-based beverages': 'Dairy & Eggs', // Assumed to be alternatives to dairy milk
                  'Fishes': 'Fish',
                  'Seafood': 'Fish',
                  'Frozen foods': 'Frozen',
                  'Fruits and vegetables based foods': 'Fruit & Veg',
                  'Vegetables based foods': 'Fruit & Veg',
                  'Fruits based foods': 'Fruit & Veg',
                  'Meats and their products': 'Meat',
                  'Meats': 'Meat',
                  'Prepared meats': 'Meat',
                  "Sweeteners": "Cupboard",
                  "Salty snacks": "Cupboard",
                  "Yogurts": "Dairy & Eggs",
                  "Vegetable fats": "Cupboard",
                  "Seeds": "Cupboard",
                  "Cakes": "Bakery",
                  "Legumes and their products": "Cupboard",
                  "Frozen desserts": "Frozen",
                  "Canned plant-based foods": "Cupboard",
                  "Poultries": "Meat",
                  "Fruit-based beverages": "Fruit & Veg",
                  "Fatty Fishes": "Fish",
                  "Chocolates": "Cupboard",
                  "Dried products": "Cupboard",
                  "Vegetable oils": "Cupboard",
                  "Nuts and their products": "Cupboard",
                  "Bee products": "Cupboard",
                  "Juices and nectars": "Fruit & Veg",
                  "Fruit and vegetable preserves": "Cupboard",
                  "Honeys": "Cupboard",
                  "Chocolate candies": "Cupboard",
                  "Legumes": "Cupboard",
                  "Olive tree products": "Cupboard",
                  "Breakfast cereals": "Cupboard",
                  "Cow cheeses": "Dairy & Eggs",
                  "Chicken and its products": "Meat",
                  "Chickens": "Meat",
                  "Fruits": "Fruit & Veg",
                  "Hams": "Meat",
                  "Jams": "Cupboard",
                  "Candies": "Cupboard",
                  "Milks": "Dairy & Eggs",
                  "Chips and fries": "Frozen",
                  "Soups": "Cupboard",
                  "Sausages": "Meat",
                  "Canned vegetables": "Cupboard",
                  "Salted spreads": "Cupboard",
                  "Fruit juices": "Fruit & Veg",
                  "Cereal grains": "Cupboard",
                  "Nuts": "Cupboard",
                  "Crisps": "Cupboard",
                  "Teas": "Cupboard",
                  "Ice creams and sorbets": "Frozen",
                  "Meals with meat": "Meat",
                  "French cheeses": "Dairy & Eggs",
                  "Dairy substitutes": "Dairy & Eggs",
                  "Olive oils": "Cupboard",
                  "Dried plant-based foods": "Cupboard",
                  "Pastries": "Bakery",
                  "Pizzas pies and quiches": "Bakery",
                  "Pasta dishes": "Cupboard",
                  "Viennoiseries": "Bakery",
                  "Italian cheeses": "Dairy & Eggs",
                  "Ice creams": "Frozen",
                  "Dried products to be rehydrated": "Cupboard",
                  "Extra-virgin olive oils": "Cupboard",
                  "Virgin olive oils": "Cupboard",
                  "Coffees": "Cupboard",
                  "Canned Fishes": "Fish",
                  "Milk substitutes": "Dairy & Eggs",
                  "Tomatoes and their products": "Fruit & Veg",
                  "Dark chocolates": "Cupboard",
                  "Dried fruits": "Cupboard",
                  "Pizzas": "Bakery",
                  "Meat alternatives": "Meat",
                  "Cured sausages": "Meat",
                  "Fresh foods": "Fruit & Veg",
                  "Tomato sauces": "Cupboard",
                  "Syrups": "Cupboard",
                  "Frozen plant-based foods": "Frozen",
                  "Legume seeds": "Cupboard",
                  "Pickles": "Cupboard",
                  "Rices": "Cupboard",
                  "Cooking helpers": "Cupboard",
                  "Plant milks": "Dairy & Eggs",
                  "Spices": "Cupboard",
                  "Meat preparations": "Meat",
                  "Tunas": "Fish",
                  "Plant-based pickles": "Cupboard",
                  "Pulses": "Cupboard",
                  "White hams": "Meat",
                  "Bonbons": "Cupboard",
                  "Salmons": "Fish",
                  "Pork": "Meat",
                  "Frozen vegetables": "Frozen",
                  "Crackers": "Bakery",
                  "Canned legumes": "Cupboard",
                  "Cooked pressed cheeses": "Dairy & Eggs",
                  "Sandwiches": "Bakery",
                  "Spreadable fats": "Dairy & Eggs",
                  "Tea-based beverages": "Cupboard",
                  "Brioches": "Bakery",
                  "Chocolate biscuits": "Bakery"
                
              };
              
              function mapListToCategory(list) {
                if (list){
                const myList = list.split(', ').map(item => item.trim());
                for (const item of myList) {
                    for (const key in categoryMapping) {
                        if (item.includes(key)) {
                            return categoryMapping[key];
                        }
                    }
                }
              }
                return 'Other';
            }
            
            let estimatedExpiryDate;
            if (productData.categories) {
              const category = mapListToCategory(productData.categories);
              if (productData.product_name) {
                estimatedExpiryDate = get_estimate_expiry(category, productData.product_name);
              } 
             
            } else{
              const category = '';
            }
            let tostringdate;
            if(estimatedExpiryDate){
             tostringdate = `${estimatedExpiryDate.getFullYear()}-${(estimatedExpiryDate.getMonth() + 1).toString().padStart(2, '0')}-${estimatedExpiryDate.getDate().toString().padStart(2, '0')}`;
            }
            const product_dict = {
              categories: mapListToCategory(productData.categories) || '',
              name: `${productData.brands || ''} ${productData.product_name || ''}`,
              price: `${productData.brands || ''} ${productData.price || ''}`,
              expiry_date: tostringdate || '',
              image_front_small_url: productData.image_front_small_url || ''
            };
      
            if (product_dict && Object.keys(product_dict).length > 0) {
              navigation.navigate('New Product', { product: product_dict });
            } else {
              navigation.navigate('New Product', { product: null });

            }
            } else {
              navigation.navigate('New Product', { product: null });
            }
            
                        
        } else {
          console.log(`Error ${response.status}: ${JSON.stringify(products)}`);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    

    const lineStyle = {
      backgroundColor: 'white',
      position: 'absolute'
  };
  
  const styles = StyleSheet.create({
      cornerTopLeft: {
          ...lineStyle,
          top: '25%',
          left: '25%',
          width: 40,
          height: 5,
          borderBottomWidth: 5,
          borderRightWidth: 5,
          borderRightColor: 'white',
          borderBottomColor: 'white'
      },
      cornerTopRight: {
          ...lineStyle,
          top: '25%',
          right: '25%',
          width: 40,
          height: 5,
          borderBottomWidth: 5,
          borderLeftWidth: 5,
          borderLeftColor: 'white',
          borderBottomColor: 'white'
      },
      cornerBottomLeft: {
          ...lineStyle,
          bottom: '25%',
          left: '25%',
          width: 40,
          height: 5,
          borderTopWidth: 5,
          borderRightWidth: 5,
          borderRightColor: 'white',
          borderTopColor: 'white'
      },
      cornerBottomRight: {
          ...lineStyle,
          bottom: '25%',
          right: '25%',
          width: 40,
          height: 5,
          borderTopWidth: 5,
          borderLeftWidth: 5,
          borderLeftColor: 'white',
          borderTopColor: 'white'
      }
  });


  return (

    <View style={{ flex: 1 }}>
  <RNCamera
          onBarCodeRead={isScanning ? handleBarCodeScanned : undefined}
          style={{ flex: 1 }}
          captureAudio={false}
      >
      {isLoading ? (
          <ActivityIndicator size="large" color="#FFFFFF" style={{ flex: 1, justifyContent: 'center' }} />
        ) : (
          <>
          <View style={[styles.cornerTopLeft, styles.corner]} />
          <View style={[styles.cornerTopRight, styles.corner]} />
          <View style={[styles.cornerBottomLeft, styles.corner]} />
          <View style={[styles.cornerBottomRight, styles.corner]} />
        </>
      )}
    </RNCamera>
        {barcodeData && <Text>Scanned: {barcodeData}</Text>}
    </View>
  );
}

export default BarcodeScanner;
