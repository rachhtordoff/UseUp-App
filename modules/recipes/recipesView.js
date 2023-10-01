import 'react-native-url-polyfill/auto'; 
import React, { useState, useContext } from 'react';
import { View, Text,ScrollView, Button, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { colors,fonts } from '../../styles';
import { Configuration, OpenAIApi } from "openai";
import { ListItem, Avatar, Card, withTheme } from 'react-native-elements';
import AuthContext from '../Authentication/authContext';  // adjust the path
import { useFocusEffect } from '@react-navigation/native';

const RecipeFinder = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedNo, setSelectedNo] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // To determine if the spinner should be shown
  const [isButtonDisabled, setButtonDisabled] = useState(false);  // To determine if the button is disabled
  const [recipesContent, setRecipesContent] =  useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedCalorie, setSelectedCalorie] = useState('');
  const [selectedDietry, setSelectedDietry] = useState([]);
  const [ExpiringProducts, setExpiringProducts] = useState('');
  const [OtherProducts, setOtherProducts] = useState('');


  const { token, user_id, getrefreshToken} = useContext(AuthContext);

  const fetchProducts = async () => {
    // http://10.0.2.2:8010/ for ios
    // http://10.0.2.2:8010/ for android emulator
    // ip address aka http://10.0.2.2:8010/ for actual android app
      const response = await fetch(`http://192.168.1.143:8010/recipe-products/${user_id}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      if (response.status === 401) {
        access_token = await getrefreshToken();  // Refresh the token
  
        // Retry the fetch with the new token
        response = await fetch(`http://192.168.1.143:8010/recipe-products/${user_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });
      }


      const fetchedProducts = await response.json();
      if (fetchedProducts) {
        setExpiringProducts(fetchedProducts.expiring_products); // Update the products state with the fetched products
        setOtherProducts(fetchedProducts.other_products); // Update the products state with the fetched products

      } else {
        console.error("API did not return an array");
    }
  };

    useFocusEffect(
      React.useCallback(() => {
          fetchProducts();

          return () => {
              // You can perform cleanup tasks here if needed when the screen is unfocused.
              // This is equivalent to the componentWillUnmount lifecycle method.
          };
      }, [])
  );


  const handleOptionChangeDietry = (value) => {
    if (selectedDietry.includes(value)) {
      setSelectedDietry(prevState => prevState.filter(dietry => dietry !== value));
    } else {
      setSelectedDietry(prevState => [...prevState, value]);
    }
  };
  
  const handleOptionChangeCalories = (value) => {
    setSelectedCalorie(value);
  };
  const handleOptionChangeCuisine = (value) => {
    setSelectedCuisine(value);
  };
  const handleOptionChangeNo = (value) => {
    setSelectedNo(value);

  };
  const parseRecipes = (recipesContent) => {
    const recipeSplit = recipesContent.split(/\n\nRecipe /).filter(Boolean);

    return recipeSplit.map(recipe => {
        const lines = recipe.split("\n");
        let title = lines[0];  // This assumes that the first line after the split will always be the title.
        if (title.includes('Recipe Name: ')){
          title = title.replace('Recipe Name: ', "");
        }
        else if (title.includes('Recipe Name:')){
          title = title.replace('Recipe Name:', "");
        } 
        else if (title.includes('Recipe Name')){
          title = title.replace('Recipe Name', "");
        } 
        else if (title.includes('Recipe')){
          title = title.replace('Recipe', "");
        }
        // Finding the ingredients start and end to concatenate the lines in between.
        const ingredientsStart = lines.indexOf("Ingredients:") + 1;
        const ingredientsEnd = lines.indexOf("Instructions:") - 1;
        const ingredients = lines.slice(ingredientsStart, ingredientsEnd).join('\n');

        // Similarly for instructions
        const instructionsStart = lines.indexOf("Instructions:") + 1;
        const instructionsEnd = lines.includes("Calorie Breakdown:") 
            ? lines.indexOf("Calorie Breakdown:") - 1 
            : lines.length;
        const instructions = lines.slice(instructionsStart, instructionsEnd).join('\n');

        const calorie = lines.includes("Calorie Breakdown:") 
            ? lines.slice(lines.indexOf("Calorie Breakdown:")).join('\n') 
            : '';

        return { title, ingredients, instructions, calorie };
    });
};


  const resetSearch = () => {
    setSelectedCuisine('');
    setSelectedCalorie('');
    setSelectedDietry('');
    setRecipesContent('');
    setSelectedNo('');
    setIsLoading(false);
    setButtonDisabled(false);
    setShowResults(false); // Assuming you implemented the showResults state as previously mentioned
};

  const getRecipe  = async () => {
    setButtonDisabled(true);  // Disable the button
    setIsLoading(true);  // Show the spinner
    const configuration = new Configuration({
        apiKey: '',
    });

    const openai = new OpenAIApi(configuration);
    let message = ''
    if (selectedCuisine != 'Pot Luck'){
      message += `give me a recipe, including the cooking method for the items that I have for ${selectedNo}, they want a ${selectedCuisine} inspired meal, try focus on expiring soon items. I want the number of portions in the recipe to be stated in the recipe title. Then in the ingredients list: Specify which ingredients will expire soon. Specify which ingredients are in the pantry (other items) and Specify which ingredients are needed to be added to a shopping list.  please supply full cooking instructions. I want this in the following layout.. Recipe Name, Ingredients List, Instructions, Calorie breakdown.`
    }else{
      message += `give me a recipe, including the cooking method for the items that I have for ${selectedNo}, try focus on expiring soon items. I want the number of portions in the recipe to be stated in the recipe title.  Then in the ingredients list: Specify which ingredients will expire soon. Specify which ingredients are in the pantry (other items) and Specify which ingredients are needed to be added to a shopping list. please supply full cooking instructions. I want this in the following layout.. Recipe Name, Ingredients List, Instructions, Calorie breakdown.`
    }
      if (selectedCalorie == 'Yes') {
      message += ' please include a calorie and macro nutrient break down per portion'
    }
    if (selectedDietry) {
      const dietaryString = selectedDietry.join(', ');
      message += ` please make sure the recipe is ${dietaryString}`
    }
    try {
        const result = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
            {
                "role": "system",
                "content": message
            },
            {
                "role": "user",
                "content": `Expiring soon: ${ExpiringProducts}. Other Items: ${OtherProducts}`
            }
            ],
            temperature: 0.8,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const content = result?.data?.choices?.[0]?.message?.content;
        if (content) {
            setRecipesContent(content);
            setShowResults(true);
        }else{
            console.error("Error:", error)
        }
    }
    catch (error) {
        console.error("Error:", error);
    } finally {
        setButtonDisabled(false);  // Enable the button
        setIsLoading(false);  // Hide the spinner
    }
    };

    const parsedRecipes = parseRecipes(recipesContent);

  return (
    <View style={styles.container}>

    {showResults ? (
         <>
        <ScrollView >
        {parsedRecipes.map((recipe, index) => (
            <Card key={index} style={styles.recipecard}>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{recipe.title}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>

                <ListItem.Content style={styles.listrecipesection}>
                    <ListItem.Subtitle>{recipe.ingredients}</ListItem.Subtitle>
                </ListItem.Content>

                <ListItem.Content style={styles.listrecipesection}>
                    <ListItem.Subtitle>{recipe.instructions}</ListItem.Subtitle>
                </ListItem.Content>


                <ListItem.Content style={styles.listrecipesection}>
                    <ListItem.Subtitle>{recipe.calorie}</ListItem.Subtitle>
                </ListItem.Content>
                
            </Card>
        ))}

         </ScrollView>
         <TouchableOpacity style={styles.Buttoncontainer2} onPress={resetSearch}>
                <Text style={styles.buttonText}>New Search</Text>
            </TouchableOpacity>
        </>
         
        ) : (
            <>
    <ScrollView contentContainerStyle={styles.containerrecipe}>

      <Text style={styles.title}>Select a Cuisine:</Text>
      <View style={styles.optionContainer}>

          {['Italian', 'Mexican', 'Chinese', 'Indian', 'Greek', 'Pot Luck'].map(cuisine => (
            <TouchableOpacity
              key={cuisine}
              style={{...styles.radioOption,
                      borderColor: selectedCuisine === cuisine ? colors.primaryDark : colors.grey,
                      borderWidth: selectedCuisine.includes(cuisine) ? 2 : 1}}
              onPress={() => handleOptionChangeCuisine(cuisine)}>
              <Text style={{...styles.radioText,
                    fontWeight: selectedCuisine === cuisine ? '900' : 'normal'}}>
                {cuisine}
              </Text>
            </TouchableOpacity>
          
          ))}
      </View>

    <Text style={styles.title}>For how many people?</Text>
      <View style={styles.optionContainer}>

        {['1 person', '2 people', '3 people', '4 people'].map(people => (
          <TouchableOpacity
            key={people}
            style={{...styles.radioOption,
              borderColor: selectedNo === people ? colors.primaryDark : colors.grey,
              borderWidth: selectedNo.includes(people) ? 2 : 1}}
            onPress={() => handleOptionChangeNo(people)}>
            <Text style={{...styles.radioText,
                      fontWeight: selectedNo === people ? '900' : 'normal'}}>
              {people}
            </Text>
          </TouchableOpacity>
        ))}
        </View>

        <Text style={styles.title}>Dietary Requirements</Text>
<View style={styles.optionContainer}>
  {['Gluten free', 'Dairy free', 'Vegetarian', 'Vegan', 'Paleo', 'FODMAP', 'Nut Free', 'Fish Free', 'Ketogenic'].map(dietry => (
    <TouchableOpacity
      key={dietry}
      style={{...styles.radioOption,
        borderColor: selectedDietry.includes(dietry) ? colors.primaryDark : colors.grey,
        borderWidth: selectedDietry.includes(dietry) ? 2 : 1}}
      onPress={() => handleOptionChangeDietry(dietry)}>
      <Text style={{...styles.radioText,
            fontWeight: selectedDietry.includes(dietry) ? '900' : 'normal'}}>
        {dietry}
      </Text>
    </TouchableOpacity>
  ))}
</View>


      <Text style={styles.title}>Calorie/Macro breakdown?</Text>
      <View style={styles.optionContainer}>

          {['Yes', 'No'].map(calories => (
            <TouchableOpacity
              key={calories}
              style={{...styles.radioOption,
                borderColor: selectedCalorie === calories ? colors.primaryDark : colors.grey,
                borderWidth: selectedCalorie.includes(calories) ? 2 : 1,
                width: '48%',}}
              onPress={() => handleOptionChangeCalories(calories)}>
              <Text style={{...styles.radioText,
                    fontWeight: selectedCalorie === calories ? '900' : 'normal'}}>
                {calories}
              </Text>
            </TouchableOpacity>
          
          ))}
      </View>


        {isLoading ? (
        <ActivityIndicator size="small" color={colors.primaryDark} />
        ) : (
            <TouchableOpacity style={styles.Buttoncontainer} onPress={getRecipe} disabled={isButtonDisabled}>
                <Text style={styles.buttonText}>Get Recipe</Text>
            </TouchableOpacity>
        )}

</ScrollView>
         </>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  recipecard:{
    backgroundColor: colors.white
  },
  listrecipesection:{
    marginTop:20
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
},
  Buttoncontainer: {
    marginLeft: '38%',
    fontFamily: fonts.primaryRegular,
    marginRight: 50,
    width: '80%',
    color: '#ffffff',
    backgroundColor: colors.blue,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, // To give some space around the text, adjust as needed
},
Buttoncontainer2: {
  marginLeft: '18%',
  fontFamily: fonts.primaryRegular,
  marginRight: 50,
  width: '80%',
  color: '#ffffff',
  backgroundColor: colors.blue,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10, // To give some space around the text, adjust as needed
},
  containerrecipe: {
        width:'100%'
    },
  buttonrecipe: {
    maringTop:40,
    borderRadius:30,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
    marginTop:10
  },
  optionContainer: {
    flexWrap: 'wrap', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  radioOption: {
    marginTop: 10,           
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    width: '30%',
    alignItems: 'center',
  },
  radioText: {
    fontSize: 12,
  },
  recipeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default RecipeFinder;
