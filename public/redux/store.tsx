// store.js
import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from 'react-redux'

const store = configureStore({
  reducer: {
    messages: messagesReducer,
  },
});

export default store;
