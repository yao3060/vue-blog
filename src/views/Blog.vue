<template>
  <div class="home container">
    <div class="row">
      <div class="col-sm-8">
        <posts></posts>
      </div>
      <div class="col-sm-4">
        <sidebar></sidebar>
      </div>
    </div>

  </div>
</template>

<script>

import Posts from '../components/Posts.vue';
import Sidebar from '../components/Sidebar'

export default {
  name: 'Blog',
  title: 'My Blog | Blog',
  components: {
    Posts,Sidebar
  },
};
</script>

<style scoped>

  .media {
    margin-bottom: 20px;
  }

</style>
