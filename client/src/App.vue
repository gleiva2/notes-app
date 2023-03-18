<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="blue-grey">
      <NotesList />
    </v-navigation-drawer>

    <v-app-bar app color="blue-grey" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>MEVN Notes App</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script>
import NotesList from "./components/NotesList.vue";

export default {
  name: "App",
  components: {
    NotesList,
  },
  data: () => ({
    drawer: null,
  }),
};
</script>