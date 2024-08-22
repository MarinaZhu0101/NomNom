// FloatingSearchBar.jsx
import React from 'react';
import { View, TextInput, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image } from 'react-native';

export default function FloatingSearchBar({ query, setQuery, onSearch, onClear, onPress }) {
// return (
// <View style={styles.searchBarContainer}>
// <TextInput
// style={styles.searchInput}
// placeholder="Search"
// value={query}
// onChangeText={text => setQuery(text)}
// />
// <Button title="Search" onPress={onSearch} />
// </View>
// );


const handleTextChange = (text) => {
setQuery(text);
if (text === '') {
onClear(); // Call onClear when text is cleared
}
};

const handleDismissKeyboard = () => {
Keyboard.dismiss(); // Dismiss keyboard and lose focus
onSearch();
};

const handleReset = () => {
setQuery('');
handleDismissKeyboard();
};

return (
// <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
<View style={styles.searchContainer}>
<TextInput
onSubmitEditing={handleDismissKeyboard}
autoCapitalize="none"
autoCorrect={false}
clearButtonMode="always"
value={query}
// onChangeText={queryText => setQuery(queryText)}
onChangeText={handleTextChange}
onEndEditing={queryText => setQuery(queryText)}
placeholder="Search"
style={styles.searchInput}
// onFocus={handleFocus}
// onBlur={handleBlur}
/>
{/* <Button title="🔍" onPress={onSearch} /> */}
{/* <TouchableOpacity style={styles.button} onPress={handleReset}>
<Image
style={{height: 20, width: 20, marginRight: 5}}
resizeMode="contain"
source={require('../assets/reset-02.png')}
// style={styles.image}
/>
</TouchableOpacity> */}
</View>

// </TouchableWithoutFeedback>
);
}

const styles = StyleSheet.create({
searchBarContainer: {
position: 'absolute',
bottom: 0,
left: 0,
right: 0,
backgroundColor: '#fff',
flexDirection: 'row',
alignItems: 'center',
paddingHorizontal: 10,
paddingVertical: 5,
borderTopWidth: 1,
borderTopColor: '#ccc',
},
searchInput: {
flex: 1,
marginRight: 10,
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 20,
paddingHorizontal: 10,
paddingVertical: 5,
backgroundColor: '#fff',
height: '100%'
},
// searchContainer: {
// flex: 1,
// position: 'absolute',
// flexDirection: 'row',
// alignItems: 'center',
// backgroundColor: '#fff',
// padding: 10,
// marginVertical: 10,
// borderRadius: 20,
// marginBottom: 0
// }
searchContainer: {
left: 5, 
right: 5, 
flexDirection: 'row',
alignItems: 'center',
padding: 8,
marginTop:5,
zIndex: 1000, // Ensure it appears on top of other content
// paddingLeft: 10,
// paddingRight: 10
}
});