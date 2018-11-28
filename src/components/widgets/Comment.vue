<template>
  <li class="list-group-item">
    {{ comment.author_name }} said {{ comment.content.rendered }}
    <a @click="replyToComment = comment">Reply</a>
    <comment-form v-if="replyToComment == comment" :comment="comment"></comment-form>
    <comment-list v-if="collection[comment.id]" v-bind:comments="collection[comment.id]" v-bind:collection="collection"></comment-list>
  </li>
</template>

<script>
  import CommentList from './CommentListWidget'
  import CommentForm from './CommentFormWidget'
    export default {
      name: "Comment",
      props: ['comment', 'collection'],
      data(){
        return {
          replyToComment: false
        }
      },
      components: {
        'comment-list': CommentList,
        'comment-form': CommentForm
      }
    }
</script>

<style scoped>

</style>
