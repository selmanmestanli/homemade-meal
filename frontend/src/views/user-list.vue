<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserList',
  data() {
    return {
      users: [],
    }
  },
  async created() {
    // const usersRequest = await axios.get('/api/users')
    this.users = await this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers']),
  },
}
</script>

<template lang="pug">
  .home
    h1 Homemade-Meal
    h2 Users
    div(v-for="user in users")
      router-link(:to="`/users/${user._id}`") {{ user.name }}
</template>
