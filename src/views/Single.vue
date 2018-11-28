<template>
  <div class="home container">
    <div class="row">
      <div class="col-sm-8">

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <router-link class="breadcrumb-item" :to="{ name: 'blog'}" tag="li"><a>Blog</a></router-link>
            <li class="breadcrumb-item active" aria-current="page">{{ postTitle }}</li>
          </ol>
        </nav>


        <div class="post-content bd-content">

          <img v-if="featured_image.length" class="card-img-top" alt="Card image cap" :src="featured_image.source_url">

          <header class="entry-header">
            <h1 class="entry-title">{{ postTitle }}</h1>
            <div class="entry-meta">
              <router-link v-for="category in categories"
                           :to="{ name: 'category', params: {id: category.id }}" class="cat-link">{{ category.name }}
              </router-link>

              <span class="posted-on">{{ post.date | moment("from", "now") }}</span>
            </div>
          </header>

          <hr>

          <div class="" v-html="postContent"></div>

        </div>

        <div id="comments" class="comments card">

          <div class="card-header">Comments</div>

          <div class="card-body">

            <form action="" @submit.prevent="postComment">

              <div class="form-group">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>

              <div class="form-group text-right">
                <button type="submit" class="btn btn-primary">Submit</button>
                <input type="hidden" name="post_id" :value="post.id">
                <input type="hidden" name="parent_id" value="0">
              </div>

            </form>

            <hr>
            <div class="comment-list" v-if="comments.length > 0">
              <comment-list :comments="comments" :level="0"></comment-list>
            </div>
          </div>
        </div>

      </div>
      <div class="col-sm-4">
        <sidebar></sidebar>
      </div>
    </div>

  </div>
</template>

<script>
  import Sidebar from '../components/Sidebar'
  import CommentList from '../components/widgets/CommentListWidget'

  export default {
    name: 'single-post',

    components: {
      Sidebar, CommentList
    },

    data() {
      return {
        post: [],
        comments: [],
        postTitle: '',
        postContent: '',
        categories: [],
        featured_image: [],
        imagePlaceholder: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16757ca5d1c%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16757ca5d1c%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.5546875%22%20y%3D%2236.5%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
      };
    },
    title: 'My Blog',
    beforeMount() {
      this.getPost()
    },
    mounted() {
      this.getComments()
    },
    watch: {
      // 如果 `question` 发生改变，这个函数就会运行
      postTitle: function (newTitle, oldTitle) {
        if (newTitle !== oldTitle) {
          window.document.title = 'My Blog | ' + newTitle
        }
      },
      comments: function(newVal, oldVal){
        //this.comments = recursiveComments(0, newVal)
      }

    },

    methods: {

      getComments() {
        let params = {
          post: this.$route.params.id,
          per_page: 50
        }
        axios.get(APIUrl + '/wp/v2/comments', {params}).then((response) => {

          this.comments =  recursiveComments(0, response.data )
        })

      },

      postComment() {


      },

      getPost() {
        axios.get(APIUrl + '/wp/v2/posts/' + this.$route.params.id)
          .then((response) => {
            this.post = response.data;

            this.postTitle = response.data.title.rendered;
            this.postContent = response.data.content.rendered;

            if (this.post.categories) {
              this.getCategories();
            }

            if (this.post.featured_media) {
              this.getFeaturedImage();
            }
          });
      },

      getCategories() {
        axios.get(
          'http://www.yaoin.net/wp-json/wp/v2/categories/',
          {
            params: {
              include: this.post.categories,
            },
          },
        ).then((response) => {
          this.categories = response.data;
        });
      },

      getFeaturedImage() {
        axios.get(
          `http://www.yaoin.net/wp-json/wp/v2/media/${this.post.featured_media}`,
        ).then((response) => {
          this.featured_image = response.data;
        });
      },

    },
  };

  function recursiveComments(parent_id, comments ) {
    let newComments = [];
    let newKey = 0;
    comments.forEach(function ( comment, index) {

      if (comment.parent == parent_id ) {

        newComments[newKey] = comment;

        let children = recursiveComments( comment.id, comments );
        if (children.length > 0){
          newComments[newKey]['children'] = children
        }

        newKey++;
      }

    });
    console.log(newComments);
    return newComments;
  }

</script>


<style lang="scss">

  .post-content {

    img {

      &.size-full.alignnone {
        display: block;
        max-width: 90%;
        margin: auto;
        height: auto;
        box-shadow: 0 1px 3px #ccc;
      }
    }

    .entry-meta {
      .cat-link, .posted-on {
        margin-right: 10px;
      }
    }

  }

  .media {

    border-bottom: 1px dashed #eee;
    margin-bottom: 10px;

    .avatar {
      border-radius: 50%;
    }
  }

</style>
