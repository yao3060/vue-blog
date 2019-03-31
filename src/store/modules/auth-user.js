import moment from 'moment'
export default {
  state: {
    authenticated: false,
    name: null,
    email: null,
    description: null,
  },
  mutations: {
    setAuthUser(state, payload) {
      state.authenticated = true;
      state.name = payload.user.user_display_name;
      state.email = payload.user.user_email;
    },

    unsetAuthUser(state) {
      state.authenticated = false
      state.name = null
      state.email = null
      state.description = null
    },

    setUserInfo(state, payload) {
      state.authenticated = true;
      state.name = payload.user.name;
      state.email = payload.user.email;
      state.description = payload.user.description;
    },
  },
  actions: {
    loginRequest({ commit }, formData) {
      return axios.post( APIUrl + '/jwt-auth/v1/token', formData).then((response) => {

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpireTime', moment().add(30, 'days').format('x') );

        commit({
          type: 'setAuthUser',
          user: response.data,
        });
      });
    },
    getUserInfo({ commit }) {
      axios.post( APIUrl + '/wp/v2/users/me?context=edit').then((response) => {
        commit({
          type: 'setUserInfo',
          user: response.data,
        });
      });
    },
    userLogout({commit}) {

      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpireTime')
      commit({
        type: 'unsetAuthUser'
      })

      return true;

    },

    userLogoutTest() {
      return true;
    }
  },
};
