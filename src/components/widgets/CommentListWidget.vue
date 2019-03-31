<template>
<div>
  <div v-for="comment in comments" :class="['media','level-' + level]" :level="level">
    <img class="mr-3 comment-avatar" :src="comment.avatar" alt="Generic placeholder image">
    <div class="media-body">
      <div class="mt-0"><span class="author-name">{{ comment.author_name}}</span> <small class="date">{{ comment.date | moment('from', 'now')}}</small></div>
      <span class="comment-body" v-html="comment.content.rendered"></span>
      <comment-list :comments="comment.children" :level="level + 1" v-if="typeof comments != 'undefined'"></comment-list>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'comment-list',
  props: ['comments', 'level'],
  mounted() {
    // if (this.comments.length > 1) {
    //   this.comments.forEach(function (ele, index) {
    //     console.log(ele, index)
    //   });
    // }
  },
};
</script>

<style scoped lang="scss">
.comment-avatar {
  border-radius: 50%;
  margin-bottom: 10px;
  box-shadow: 0 1px 5px #666;

}
.media-body {

  .author-name {
    font-size: 100%;
  }
  .date {
    font-size: 50%;
    color: #ccc;
    margin-left: 10px;
  }

  .comment-body {
    color: #999;
  }

}
</style>
