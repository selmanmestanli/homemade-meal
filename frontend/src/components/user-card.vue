<script>
export default {
  name: 'UserCard',
  props: ['user'],
}
</script>

<template lang="pug">
.box
  h1 {{ user.name }}
  h3 {{ user.email }}
  h2 Photos ({{ user.photos.length }})

  .photo(v-for="photo in user.photos")
    h3 {{ photo.photoname }}
    p(v-if="!photo.likedBy.length")
      | no likes yet!
    p(v-else)
      | Liked by: {{ photo.likedBy.map(user => user.name).join(', ') }}
</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  background: #c55;
}
</style>
