<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{ name: 'event-details' }">Details</router-link>
      |
      <router-link :to="{ name: 'event-register' }">Register</router-link>
      |
      <router-link :to="{ name: 'event-edit' }">Edit</router-link>
    </nav>
    <router-view :event="event"></router-view>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  name: "EventDetails",
  props: ["id"],
  data() {
    return {
      event: null,
    };
  },
  created() {
    EventService.getEvent(this.id)
      .then((response) => {
        this.event = response.data;
      })
      .catch((error) => {
        if (error.response?.status == 404) {
          this.$router.push({
            name: "404-resource",
            params: { resource: "event" },
          });
        } else {
          this.$router.push({ name: "network-error" });
        }

        this.$router.push({
          name: "404-resource",
          params: { resource: "event" },
        });
      });
  },
};
</script>
