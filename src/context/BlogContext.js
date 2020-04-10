import React, {createContext, useState, useReducer} from 'react';
import jsonServer from '../api/jsonServer';
import createDataContext from './createDataContext';
const blogReducer = (state, action) => {
  switch (action.type) {
    case 'GET_BLOGPOSTS':
      return action.payload;
    // case 'ADD_BLOGPOST':
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random() * 9999),
    //       title: action.payload.title,
    //       content: action.payload.content,
    //     },
    //   ];
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

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get('/blogPosts');
    dispatch({type: 'GET_BLOGPOSTS', payload: response.data});
  };
};

const addBlogPost = dispatch => {
  return async ({title, content}, callback) => {
    await jsonServer.post('/blogPosts', {title, content});
    // dispatch({type: 'ADD_BLOGPOST', payload: {title, content}});

    if (callback) {
      callback();
    }
  };
};
const editBlogPost = dispatch => {
  return async ({id, title, content}, callback) => {
    await jsonServer.put(`/blogposts/${id}`, {title, content});
    dispatch({type: 'EDIT_BLOGPOST', payload: {id, title, content}});
    callback();
  };
};

const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({type: 'DELETE_BLOGPOST', payload: id});
  };
};

export const {Context, Provider} = createDataContext(
  blogReducer,
  {getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost},
  [
    {
      id: 1000,
      title: 'Test POST',
      content: 'test Content',
    },
  ],
);
