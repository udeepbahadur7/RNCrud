import React, {useContext, useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {Context as BlogContext} from '../context/BlogContext';
function IndexScreen({navigation}) {
  const [input, setInput] = useState('');
  const {state: blogPosts, getBlogPosts, deleteBlogPost} = useContext(
    BlogContext,
  );
  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });
    return () => {
      listener.remove();
    };
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Create');
          }}>
          <Icon name="plus" size={22} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <>
      <Text>Index Screen</Text>
      {/* <TextInput
        onChangeText={text => setInput(text)}
        onEndEditing={() => addBlogPost(input)}
      /> */}

      <FlatList
        keyExtractor={blogPost => blogPost.id.toString()}
        data={blogPosts}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Show', {id: item.id})}>
            <View style={styles.rowStyle}>
              <Text style={styles.titleStyle}>
                {item.title} - {item.id}
              </Text>
              <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                <Icon style={styles.iconStyle} name="trash-2" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  titleStyle: {
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 24,
    color: 'red',
  },
});
export default IndexScreen;
