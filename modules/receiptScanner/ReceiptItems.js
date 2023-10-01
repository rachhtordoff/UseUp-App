import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';
import { colors, fonts } from '../../styles';

const styles = StyleSheet.create({
  titletext: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.gray
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
},
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 8,
    margin: 10,
  },
})

const ReceiptItems = ({ route }) => {
  const initialItems = route.params.items;
  const [items, setItems] = useState(initialItems);
  const [editingIndex, setEditingIndex] = useState(null); // index of the item being edited, null when no edit
  const [editedItem, setEditedItem] = useState(null); // current state of the item being edited
  const [show, setShow] = useState(false);

  const getDisplayDate = () => {
    if (!editedItem.expiry_date) {
      return "Select Date";
    }
    const date = new Date(editedItem.expiry_date);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  
  const getDateValue = () => {
    if (!editedItem.expiry_date) {
      return new Date();
    }
    return new Date(editedItem.expiry_date);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || editedItem.expiry_date;
    setShow(Platform.OS === 'ios');
    setEditedItem(prev => ({ ...prev, expiry_date: currentDate }));
  };

  const handleRemove = (indexToRemove) => {
    const newItems = items.filter((_, index) => index !== indexToRemove);
    setItems(newItems);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedItem({ ...items[index] });
  };

  const handleSave = () => {
    const updatedItems = [...items];
    updatedItems[editingIndex] = editedItem;
    setItems(updatedItems);
    setEditingIndex(null);
    setEditedItem(null);
  };

  const renderEditView = (item, index) => (
    <Card key={index}>
      <TextInput
        style={styles.input}
        value={editedItem.name}
        onChangeText={text => setEditedItem(prev => ({ ...prev, name: text }))}
        placeholder="Name"
      />
      <TextInput 
          value={String(editedItem.price)} 
          onChangeText={text => setEditedItem(prev => ({ ...prev, price: parseFloat(text) }))}
          keyboardType="decimal-pad"
          placeholder="Price"
          style={styles.input} 
      />
       <Picker
          selectedValue={editedItem.category}
          onValueChange={text => setEditedItem(prev => ({ ...prev, category: text }))}
          style={styles.input}
      >
          <Picker.Item label="Select a Category..." value="" />
          <Picker.Item label="Bakery" value="Bakery" />
          <Picker.Item label="Cupboard" value="Cupboard" />
          <Picker.Item label="Dairy & Eggs" value="Dairy & Eggs" />
          <Picker.Item label="Fish" value="Fish" />
          <Picker.Item label="Frozen" value="Frozen" />
          <Picker.Item label="Fruit & Veg" value="Fruit & Veg" />
          <Picker.Item label="Meat" value="Meat" />
          <Picker.Item label="Other" value="Other" />
      </Picker>

      <TouchableOpacity style={styles.Buttoncontainer} onPress={() => setShow(true)}>
        <Text style={styles.buttonText}>{getDisplayDate()}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={getDateValue()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
      {Platform.OS === 'ios' && <Button title="Done" onPress={() => setShow(false)} />}

      <Button title="Save" onPress={handleSave} />
    </Card>
  );

  const renderNormalView = (item, index) => (
    <Swipeable
      key={index}
      renderRightActions={() => (
        <TouchableOpacity onPress={() => handleRemove(index)}>
          <Text>Remove</Text>
        </TouchableOpacity>
      )}
    >
      <Card>
        <Text style={styles.titletext}>{item.name}</Text>
        <Text>Price: £{item.price}</Text>
        <Text>Category: </Text>
        <Text>Expires: </Text>
        <Button title="Edit" onPress={() => handleEdit(index)} />
      </Card>
    </Swipeable>
  );

  return (
    <ScrollView>
      {items.map((item, index) => (
        editingIndex === index ? renderEditView(item, index) : renderNormalView(item, index)
      ))}
    </ScrollView>
  );
}

export default ReceiptItems;
