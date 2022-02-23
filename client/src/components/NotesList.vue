<template>
  <v-card class="mx-auto" max-width="300">
    <v-list flat rounded>
      <v-subheader>Notes</v-subheader>
      <v-list-item-group v-model="selectedItem" color="teal">
        <v-list-item v-for="(note, i) in notes" :key="i" :to="note.id" link>
          <v-list-item-content>
            <v-list-item-title v-text="note.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-btn to="/add-note" small class="mx-2" fab dark color="teal lighten-1">
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "NotesList",

  data: function () {
    return {
      selectedItem: 1,
      notes: null,
    };
  },

  methods: {
    getNotes: function () {
      axios
        .get("http://localhost:3000/notes")
        .then((response) => (this.notes = response.data));
    },
  },

  mounted: function () {
    this.getNotes();
  },
};
</script>