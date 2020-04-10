import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import BlogPostForm from '../components/BlogPostForm';
import {Context} from '../context/BlogContext';

function EditScreen({route, navigation}) {
  const blogPostId = route.params.id;
  const {editBlogPost, state: blogPosts} = useContext(Context);
  const blogPost = blogPosts.find(bp => bp.id === blogPostId);
  return (
    <BlogPostForm
      initialValue={blogPost}
      onSubmit={({title, content}) => {
        console.log('Why is this not updating--------', title);
        editBlogPost({id: blogPostId, title, content}, () => {
          navigation.pop();
        });
      }}
    />
  );
}

const styles = StyleSheet.create({});
export default EditScreen;
