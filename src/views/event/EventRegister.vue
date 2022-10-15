<template>
  <p>Register for event here</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  name: "EventDetails",
  props: ["event"],
  methods: {
    register() {
      this.$router.push({
        name: "event-details",
      });
    },
  },
};
</script>
