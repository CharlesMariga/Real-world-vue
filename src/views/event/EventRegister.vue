<template>
  <p>Register for event here</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  name: "EventDetails",
  props: ["event"],
  inject: ["GStore"],
  data() {
    return {
      unsavedChanges: true,
    };
  },
  methods: {
    register() {
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
  beforeRouteLeave() {
    if (this.unsavedChanges) {
      const answer = window.confirm(
        "Do you really want to leave? You have unsaved changes!"
      );

      if (!answer) {
        return false;
      }
    }
  },
};
</script>
