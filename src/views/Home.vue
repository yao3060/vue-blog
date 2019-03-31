<template>
  <div class="home container">
    <carousel></carousel>
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
// @ is an alias to /src
import Carousel from '../components/Carousel'
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';

export default {
  name: 'Home',
  components: {
    Sidebar, Posts, Carousel
  },
};
</script>
