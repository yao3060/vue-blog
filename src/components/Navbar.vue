<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
    <a class="navbar-brand" href="#">YYY</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link to="/" tag="li" class="nav-item active"><a class="nav-link">Home</a></router-link>
        <router-link :to="{name: 'blog'}" tag="li" class="nav-item"><a class="nav-link">Blog</a></router-link>
        <router-link to="/about" tag="li" class="nav-item"><a class="nav-link">About</a></router-link>
      </ul>
      <ul class="navbar-nav ml-auto">
        <router-link v-show="!user.authenticated" :to="{name:'login'}" tag="li" class="nav-item" >
          <a class="btn btn-outline-success">Login</a>
        </router-link>
        <router-link v-show="user.authenticated"  :to="{name:'profile'}" tag="li" class="nav-item">
          <a class="btn btn-outline-success">Profile</a>
        </router-link>
        <li  class="nav-item"> &nbsp; </li>
        <router-link v-show="!user.authenticated" :to="{name:'register'}"  tag="li" class="nav-item" >
          <a class="btn btn-outline-info">Register</a>
        </router-link>
        <li class="nav-item" v-show="user.authenticated">
          <a class="btn btn-outline-info"  @click.prevent="logout" href="#">Logout</a>
        </li>
      </ul>
    </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Navbar',
  computed: {
    ...mapState({
      user: state => state.AuthUser,
    }),
  },
  methods: {

    logout() {
      console.log('Logout now')

      this.$store.dispatch('userLogout').then((response) => {
        this.$router.push({ name: 'login' })
      } )
    }

  },
};
</script>

<style scoped>

</style>
