<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <nav>
      <router-link :to="{ name: 'event-details' }">Details</router-link>
      |
      <router-link :to="{ name: 'event-register' }">Register</router-link>
      |
      <router-link :to="{ name: 'event-edit' }">Edit</router-link>
    </nav>
    <router-view :event="GStore.event"></router-view>
  </div>
</template>

<script>
export default {
  name: "EventDetails",
  inject: ["GStore"],
};
</script>
