import React, {useContext, useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Context as BlogContext} from '../context/BlogContext';
import {TouchableOpacity} from 'react-native-gesture-handler';

function ShowScreen({route, navigation}) {
  const blogPostId = route.params.id;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Edit', {id: blogPostId})}>
          <Icon name="pencil" size={30} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, blogPostId]);
  const {state: blogPosts} = useContext(BlogContext);
  const blogPost = blogPosts.find(bp => bp.id === blogPostId);
  return (
    <View style={styles.blog}>
      <Text style={styles.titleStyle}>{blogPost.title}</Text>
      <Text style={styles.contentStyle}>{blogPost.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ShowScreen;
