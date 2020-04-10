import React, {createContext, useState, useReducer} from 'react';
import jsonServer from '../api/jsonServer';
import createDataContext from './createDataContext';
const blogReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BLOGPOST':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case 'DELETE_BLOGPOST':
      return state.filter(blogPost => blogPost.id !== action.payload);
    case 'EDIT_BLOGPOST':
      console.log('action payload', action.payload);
      return state.map(blogPost =>
        blogPost.id === action.payload.id
          ? {
              ...blogPost,
              title: action.payload.title,
              content: action.payload.content,
            }
          : blogPost,
      );
    default:
      return state;
  }
};

const addBlogPost = dispatch => {
  return ({title, content}, callback) => {
    console.log('EVENT THIS------', title);
    dispatch({type: 'ADD_BLOGPOST', payload: {title, content}});
    callback();
  };
};
const editBlogPost = dispatch => {
  return ({id, title, content}, callback) => {
    dispatch({type: 'EDIT_BLOGPOST', payload: {id, title, content}});
    callback();
  };
};

const deleteBlogPost = dispatch => {
  return id => {
    dispatch({type: 'DELETE_BLOGPOST', payload: id});
  };
};

export const {Context, Provider} = createDataContext(
  blogReducer,
  {addBlogPost, deleteBlogPost, editBlogPost},
  [
    {
      id: 1000,
      title: 'Test POST',
      content: 'test Content',
    },
  ],
);
