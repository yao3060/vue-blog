<template>
<div>
  <form action="#" v-if="user.authenticated">

    <div class="form-group">
      <textarea class="form-control" v-model="content" rows="3"></textarea>
    </div>

    <div class="form-group text-right">
      <button type="submit" class="btn btn-primary" @click.prevent="replyTo">Submit</button>
      <input type="hidden" name="post_id" :value="postId">
      <input type="hidden" name="parent_id" :value="parentId">
    </div>

  </form>

  <div v-if="!user.authenticated" class="alert alert-danger" role="alert">
    You need <router-link :to="{name :'login'}">login</router-link> first.
  </div>
</div>
</template>

<script>

    import {mapState} from 'vuex'

    export default {
      name: "CommentFormWidget",
      props: ['post-id', 'parent-id'],
      data(){
        return{
          content: ''
        }
      },

      computed: mapState({
        // 箭头函数可使代码更简练
        user: state => state.AuthUser

      }),

      methods: {
        replyTo() {
          let formData = {
            post: this.postId,
            parent: this.parentId,
            content: this.content,
            author_email: this.$store.state.AuthUser.email,
            author_name: this.$store.state.AuthUser.name
          }

          axios.post(APIUrl + '/wp/v2/comments', formData).then( (response) => {

            this.$store.commit('updateComments', response.data);

            this.content = ''

          });


        }
      }
    }
</script>

<style scoped>

</style>
