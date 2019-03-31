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

            <comment-from :post-id="post.id" :parent-id="commentParentId"></comment-from>

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
import Sidebar from '../components/Sidebar';
import CommentFrom from '../components/widgets/CommentFormWidget';
import CommentList from '../components/widgets/CommentListWidget';
import { getRndInteger } from '../includes/helpers'

export default {
  name: 'single-post',

  components: {
    Sidebar, CommentFrom, CommentList,
  },

  data() {
    return {
      post: [],
      newComment: '',
      commentParentId: 0,
      postId: 0,
      postTitle: '',
      postContent: '',
      categories: [],
      featured_image: [],
    };
  },
  title: 'My Blog',
  beforeMount() {
    this.postId = this.$route.params.id;
    this.getPost();
  },
  mounted() {
    this.getComments();
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    postTitle(newTitle, oldTitle) {
      if (newTitle !== oldTitle) {
        window.document.title = `My Blog | ${newTitle}`;
      }
    },
    comments(newVal, oldVal) {
      // this.comments = recursiveComments(0, newVal)
    },

  },
  computed: {
    comments() {
      const allComments = this.$store.state.comments;
      if (allComments.length > 0) {
        const post = allComments.find(post => post.postId === this.postId);
        return post.comments;
      }
      return [];
    },
  },

  methods: {

    getComments() {
      const params = {
        post: this.$route.params.id,
        per_page: 50,
      };
      axios.get(`${APIUrl}/wp/v2/comments`, { params }).then((response) => {
        const comments = recursiveComments(0, response.data);
        this.$store.commit('pushComments', { postId: this.postId, comments });
      });
    },

    postComment() {
      const formData = {
        post: this.post.id,
        parent: this.commentParentId,
        content: this.newComment,
        author_email: this.$store.state.AuthUser.email,
      };

      console.log(formData);
    },

    getPost() {
      axios.get(`${APIUrl}/wp/v2/posts/${this.$route.params.id}`)
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
        `${APIUrl}/wp/v2/categories/`,
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
        `${APIUrl}/wp/v2/media/${this.post.featured_media}`,
      ).then((response) => {
        this.featured_image = response.data;
      });
    },

  },
};



function recursiveComments(parent_id, comments) {
  const newComments = [];
  let newKey = 0;
  comments.forEach((comment, index) => {
    if (comment.parent == parent_id) {
      newComments[newKey] = comment;
      newComments[newKey].avatar = 'http://i.pravatar.cc/64?img=' + getRndInteger(1,70);

      const children = recursiveComments(comment.id, comments);
      if (children.length > 0) {
        newComments[newKey].avatar = 'http://i.pravatar.cc/64?img=' + getRndInteger(1,70);
        newComments[newKey].children = children;
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
