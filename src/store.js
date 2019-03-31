import Vue from 'vue';
import Vuex from 'vuex';

import AuthUser from './store/modules/auth-user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AuthUser,
  },
  state: {
    comments: [],
  },
  mutations: {

    pushComments(state, payload) {
      state.comments.unshift(payload);
    },
    updateComments(state, payload) {
      if (state.comments.length < 1) {
        state.comments.push({ postId: payload.postId, comments: [payload] });
      } else {
        // let post = state.comments.find((post) => {
        //   return payload.post === post.postId;
        // });

        const post = state.comments.find(post => post.postId == payload.post);

        post.comments.unshift(payload);
      }
    },

  },
  actions: {

  },
});
