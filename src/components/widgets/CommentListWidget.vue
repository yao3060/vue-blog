<template>
<div>
  <div v-for="comment in comments" :class="['media','level-' + level]" :level="level">
    <img class="mr-3" src="https://fakeimg.pl/64x64/?text=World&font=lobster" alt="Generic placeholder image">
    <div class="media-body">
      <h5 class="mt-0">{{ comment.author_name}} | {{ comment.date | moment('from', 'now')}}</h5>
      <span v-html="comment.content.rendered"></span>
      <comment-list :comments="comment.children" :level="level + 1" v-if="typeof comments != 'undefined'"></comment-list>
    </div>
  </div>
</div>
</template>

<script>

    export default {
      name: "comment-list",
      props: ['comments', 'level'],
      mounted() {

        this.comments.forEach(function (ele, index) {
          console.log(ele, index)
        });
      }
    }
</script>

<style scoped>

</style>
