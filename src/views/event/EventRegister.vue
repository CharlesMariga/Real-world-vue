<template>
  <p>Register for event here</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  name: "EventDetails",
  props: ["event"],
  inject: ["GStore"],
  methods: {
    register() {
      console.log(this.GStore);

      this.GStore.flashMessage =
        "You have registered for this " + this.event.title;

      setTimeout(() => {
        this.GStore.flashMessage = "";
      }, 3000);
      this.$router.push({
        name: "event-details",
      });
    },
  },
};
</script>
