<script>
import UserCard from '@/components/user-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'UserDetail',
  components: { UserCard },
  data() {
    return {
      user: null,
    }
  },
  async created() {
    // const userRequest = await axios.get('/api/users/${this.$route.params.id}')
    // this.user = userRequest.data
    this.user = await this.fetchUser(this.$route.params.id)
  },
  methods: {
    ...mapActions(['fetchUser']),
  },
}
</script>

<template lang="pug">
  .about
    h1 This is a user-detail
    UserCard(:user="user" v-if="user")
</template>
