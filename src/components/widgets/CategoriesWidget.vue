<template>
  <div class="card">
    <div class="card-header">Categories</div>
    <ul v-if="categories.length > 0" class="list-group list-group-flush">
      <router-link v-for="category in categories"
          :to="{name: 'category', params : {id: category.id}}" tag="li" class="list-group-item">
        <a>{{ category.name }}</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  data() {
    return {
      categories: [],
      parent: 0,
    };
  },
  mounted() {
    axios.get(`${APIUrl}/wp/v2/categories?parent=${this.parent}`).then((response) => {
      this.categories = response.data;
    });
  },
};
</script>

<style scoped>

</style>
