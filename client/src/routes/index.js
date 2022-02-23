import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import NoteAdd from "../components/NoteAdd.vue";
import NoteView from "../components/NoteView.vue";

export default new Router({
  routes: [
    {
      path: "/add-note",
      alias: "/",
      name: "NoteAdd",
      component: NoteAdd,
    },
    {
      path: "/:id",
      name: "NoteView",
      component: NoteView,
    },
  ],
});
