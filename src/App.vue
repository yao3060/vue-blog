<template>
  <div id="app">
    <navbar></navbar>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>


<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  title: 'My Blog',
  created(){
    let token = localStorage.getItem('token')
    if (token){
      this.$store.dispatch('getUserInfo')
    }
  },
  components: {
    Navbar,
  },
  data() {
    return {
      activeIndex2: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">

  body {
    margin: 0;
    padding: 0;
  }


  #app {
    .navbar {
      margin-bottom: 20px;
    }

    .breadcrumb {
      background: none;
    }
  }

</style>
