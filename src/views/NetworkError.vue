<template>
  <div class="networkError">
    <h1>Uh-Oh!</h1>

    <h3>
      It looks like you're experiencing some network issues, please take a
      breath and <a href="#" @click="goToRoute">Click here</a> to try again.
    </h3>
  </div>
</template>

<script>
export default {
  name: "NetworkError",
  methods: {
    goToRoute() {
      this.$router.go(-1);
    },
  },
};
</script>
