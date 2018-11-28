<template>
    <div class="category container">
      <div class="row">
        <div class="col-sm-8">
          <posts :categoryid="categoryId"></posts>
        </div>
        <div class="col-sm-4">
          <sidebar></sidebar>
        </div>
      </div>
    </div>
</template>

<script>
  import Posts from  '../components/Posts'
  import Sidebar from '../components/Sidebar'
  export default {
    name: "Category",
    components:{
        Posts, Sidebar
    },
    data() {
      return {
        categoryId: ''
      }
    },
    mounted() {
      this.categoryId = this.$route.params.id
    },
    watch: {
      '$route.params.id': function (id) {
        this.categoryId = id
      }
    },
  }
</script>

<style scoped>

</style>
