import { CAMPSITES } from '../shared/campsites';

//combine reducers

export const Campsites = (state = CAMPSITES, action) => {
    switch (action.type) {
        default:
          return state;
      }
};

import { COMMENTS } from '../shared/comments';

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        default:
          return state;
      }
};

import { PARTNERS } from '../shared/partners';

export const Partners = (state = PARTNERS, action) => {
    switch (action.type) {
        default:
          return state;
      }
};
import { PROMOTIONS } from '../shared/promotions';

export const Promotions = (state = PROMOTIONS, action) => {
    switch (action.type) {
        default:
          return state;
      }
};

Combine the reducers
The Redux createStore() function requires that all your reducers be combined into one single root reducer to be used as an argument to createStore(). You will use the combineReducers() function for this. Open configureStore.js and update it as follows:
import {createStore, combineReducers} from 'redux';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
        })
    );

    return store;
}