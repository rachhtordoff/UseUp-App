import React from 'react';
import { View, Image } from 'react-native';
import { colors, fonts } from '../../styles';

function getCategoryImage(category) {
    switch (category) {
        case 'Bakery':
            return require('../../assets/images/icons/bakery.png');
        case 'Cupboard':
            return require('../../assets/images/icons/condiments.png');
        case 'Dairy & Eggs':
            return require('../../assets/images/icons/dairy-products.png');
        case 'Fish':
            return require('../../assets/images/icons/fish.png');
        case 'Frozen':
            return require('../../assets/images/icons/frozen-food.png');
        case 'Fruit & Veg':
            return require('../../assets/images/icons/fruitveg.png');
        case 'Meat':
            return require('../../assets/images/icons/meat.png');
        case 'Other':
            return require('../../assets/images/icons/other.png');
        default:
            return null;
    }
}

const CategoryImage = ({ category }) => {
    const imageSource = getCategoryImage(category);
    if (!imageSource) return null; // or some default image

    return <Image source={imageSource} style={{ width: 30, height: 30,tintColor: colors.lightGray }} />;
};

export default CategoryImage;
