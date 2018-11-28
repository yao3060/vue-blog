export default {
  state: {
    authenticated: false,
    name: null,
    email: null,
    description: null,
  },
  mutations: {
    setAuthUser (state, payload) {
      state.authenticated = true
      state.name = payload.user.user_display_name
      state.email = payload.user.user_email
    },

    setUserInfo( state, payload ){
      state.authenticated = true
      state.name = payload.user.name
      state.email = payload.user.email
      state.description = payload.user.description
    }
  },
  actions: {
    loginRequest({commit}, formData) {

      return axios.post('http://www.yaoin.net/wp-json/jwt-auth/v1/token', formData).then((response) => {
        localStorage.setItem('token', response.data.token);
        commit({
          type: 'setAuthUser',
          user: response.data
        })

      });
    },
    getUserInfo( {commit} ) {

      axios.post('http://www.yaoin.net/wp-json/wp/v2/users/me?context=edit').then((response) => {

        commit({
          type: 'setUserInfo',
          user: response.data
        })

      });

    }

  }
}
