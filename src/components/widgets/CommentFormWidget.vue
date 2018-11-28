<template>
  <div>
    <input type="text" v-model="content" class="form-control" v-on:keyup.enter="replyTo(comment)">
  </div>
</template>

<script>
    export default {
      name: "CommentFormWidget",
      props: ['comment'],
      data(){
        return{
          content: ''
        }
      },
      methods: {
        replyTo(comment) {

        }
      }
    }
</script>

<style scoped>

</style>
