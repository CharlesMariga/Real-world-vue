import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import About from "@/views/AboutView.vue";
import EventLayout from "@/views/event/EventLayout.vue";
import EventDetails from "@/views/event/EventDetails.vue";
import EventRegister from "@/views/event/EventRegister.vue";
import EventEdit from "@/views/event/EventEdit.vue";
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";
import NProgress from "nprogress";
import EventService from "@/services/EventService.js";
import GStore from "@/store";

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
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((response) => {
          GStore.event = response.data;
        })
        .catch((error) => {
          if (error.response?.status == 404) {
            return {
              name: "404-resource",
              params: { resource: "event" },
            };
          } else {
            return { name: "network-error" };
          }
        });
    },
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
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: NotFound,
  },
  {
    path: "/404/:resource",
    name: "404-resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "network-error",
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
