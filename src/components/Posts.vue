<template>
  <div class="card">
    <div class="card-header">
      {{ this.$route.name }}
    </div>

    <div class="card-body">
      <div>
        <div v-for="post in posts" class="media">

          <img v-if="featured_images[post.id]" class="mr-3"
               :src="featured_images[post.id].source_url"
               :alt="featured_images[post.id].alt" width="200">

          <div class="media-body">
            <h5 class="media-title">
              <router-link :to="{ name: 'single', params: { id: post.id}}">{{ post.title.rendered }}</router-link>
            </h5>
            <div class="text-secondary text-sm-left">
              <span class="posted-on">{{ post.date | moment("from", "now") }}</span>
            </div>
            <div class="excerpt" v-html="post.excerpt.rendered"></div>
          </div>

        </div>
      </div>
      <a href="#" v-if="!noMorePosts" @click.prevent="loadMore" class="btn btn-block">Load More</a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Posts',
  props: [
    'categoryid',
  ],
  mounted() {
    this.getPosts();
  },
  data() {
    return {
      page: 1,
      posts: [],
      featured_images: {},
      categories: typeof this.categoryid === 'undefined' ? null : this.categoryid,
      noMorePosts: false,
    };
  },
  watch: {
    categoryid(newVal, oldVal) {
      // console.log( newVal, oldVal, this.categories)
      if (newVal !== oldVal) {
        this.page = 1;
        this.posts = [];
        this.categories = this.categoryid;
        this.getPosts();
      }
    },
  },

  updated() {
    if (this.page > 1) {
      window.scrollTo({
        top: document.querySelector('#app').scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  },

  methods: {

    getPosts() {
      const params = { page: this.page };

      if (this.categories) {
        params.categories = this.categories;
      }

      axios.get(`${APIUrl}/wp/v2/posts`, { params })
        .then((response) => {
          this.posts = response.data;
          this.setFeaturedImages();
        });
    },

    setFeaturedImages() {
      const _self = this;

      _self.posts.forEach((post) => {
        if (post.better_featured_image != null) {
          const source_url = '';
          const imageSizes = post.better_featured_image.media_details.sizes;

          if (typeof imageSizes.medium !== 'undefined') {
            _self.featured_images[post.id] = {
              source_url: imageSizes.medium.source_url,
            };
          } else {
            _self.featured_images[post.id] = {
              source_url: post.better_featured_image.source_url,
            };
          }

          _self.featured_images[post.id].alt = post.better_featured_image.alt_text;
        }
      });
    },

    loadMore() {
      const _self = this;
      this.page++;

      const params = { page: this.page };
      if (this.categories) {
        params.categories = [this.categories];
      }

      axios.get(`${APIUrl}/wp/v2/posts`, { params }).then((response) => {
        // this.posts = response.data;

        response.data.forEach((post) => {
          _self.posts.push(post);

          if (post.better_featured_image != null) {
            const source_url = '';
            const imageSizes = post.better_featured_image.media_details.sizes;

            if (typeof imageSizes.medium !== 'undefined') {
              _self.featured_images[post.id] = {
                source_url: imageSizes.medium.source_url,
              };
            } else {
              _self.featured_images[post.id] = {
                source_url: post.better_featured_image.source_url,
              };
            }

            _self.featured_images[post.id].alt = post.better_featured_image.alt_text;
          }
        });
      }).catch((error) => {
        _self.noMorePosts = true;
      });
    },
  },

};
</script>

<style scoped lang="scss">

  .media {

    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px dashed #eee;

    img {
      border: 1px solid #eee;
      padding: 4px;
      transition: all 0.25s ease-in-out;
    }

    &:hover {
      img {
        border-color: #ccc;
      }
    }

    .media-title {
      font-size: 1.125em;

      a {
        color: #666;
      }
    }

    .posted-on {
      font-size: 0.85em;
      color: #ccc;
    }
    .excerpt {
      font-size: 1em;
      color: #ccc;
    }
  }

</style>
