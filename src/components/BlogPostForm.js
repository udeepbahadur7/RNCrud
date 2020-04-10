import React, {useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import InputField from './InputField';
function BlogPostForm({onSubmit, initialValue}) {
  const [title, setTitle] = useState(initialValue.title);
  const [content, setContent] = useState(initialValue.content);
  const handleTitleChange = text => {
    setTitle(text);
  };
  const handleContentChange = text => {
    setContent(text);
  };
  return (
    <View>
      <InputField
        initialValue={title}
        label="Edit Title"
        onChangeText={handleTitleChange}
      />
      <InputField
        initialValue={content}
        label="Edit Content"
        onChangeText={handleContentChange}
      />
      <Button
        title="Save"
        onPress={() => {
          console.log('New Title', title);
          onSubmit({title, content});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
BlogPostForm.defaultProps = {
  initialValue: {
    title: '',
    content: '',
  },
};
export default BlogPostForm;
