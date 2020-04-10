import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';
import {TextInput} from 'react-native-gesture-handler';

function IndexScreen() {
  const [input, setInput] = useState('');
  const {state: blogPosts, addBlogPost} = useContext(BlogContext);
  return (
    <View>
      <Text>Index Screen</Text>
      {/* <TextInput
        onChangeText={text => setInput(text)}
        onEndEditing={() => addBlogPost(input)}
      /> */}
      <Button title="Add Blog Post" onPress={addBlogPost} />

      <FlatList
        keyExtractor={blogPost => blogPost.title}
        data={blogPosts}
        renderItem={({item}) => <Text>{item.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
export default IndexScreen;
