<template>
  <div class="events">
    <h1>Events for good</h1>

    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        v-if="page != 1"
        id="page-prev"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >&lt;&lt; Prev Page</router-link
      >

      <router-link
        v-if="hasNextPage"
        id="page-next"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >&gt;&gt; Next Page</router-link
      >
    </div>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";

export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
      totalEvents: 0,
    };
  },
  computed: {
    hasNextPage() {
      return this.page * 2 < this.totalEvents;
    },
  },
  beforeRouteEnter(routeTo, routerFrom, next) {
    EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.events = response.data;
          comp.totalEvents = response.headers["x-total-count"];
        });
      })
      .catch(() => {
        next({ name: "network-error" });
      });
  },
  beforeRouteUpdate(routeTo) {
    return EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        this.events = response.data;
        this.totalEvents = response.headers["x-total-count"];
      })
      .catch(() => {
        return { name: "network-error" };
      });
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
