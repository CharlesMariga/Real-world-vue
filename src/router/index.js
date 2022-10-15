import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import About from "@/views/AboutView.vue";
import EventLayout from "@/views/event/EventLayout.vue";
import EventDetails from "@/views/event/EventDetails.vue";
import EventRegister from "@/views/event/EventRegister.vue";
import EventEdit from "@/views/event/EventEdit.vue";

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/events/:id",
    name: "event-layout",
    component: EventLayout,
    props: true,
    children: [
      {
        path: "",
        name: "event-details",
        component: EventDetails,
      },
      {
        path: "register",
        name: "event-register",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "event-edit",
        component: EventEdit,
      },
    ],
  },
  {
    path: "/event/:afterEvent(.*)",
    redirect: (to) => ({ path: "/events/" + to.params.afterEvent }),
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
