<template>
  <v-card class="mx-auto" max-width="300">
    <v-list flat rounded>
      <v-subheader>Notes</v-subheader>
      <v-list-item-group color="teal">
        <v-list-item v-for="(note, i) in notes" :key="i" :to="note.id">
          <v-list-item-content>
            <v-list-item-title v-text="note.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-checkbox
              color="teal"
              v-model="selectedItems"
              :value="note.id"
              multiple
            ></v-checkbox>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-btn to="/add-note" small class="mx-2" fab dark color="teal lighten-1">
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>

    <v-btn
      v-if="selectedItems != null && selectedItems != 0"
      color="error"
      v-on:click="
        deleteMultipleNotes(selectedItems);
        $root.$emit('event', note);
      "
    >
      Delete
    </v-btn>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "NotesList",

  data: function () {
    return {
      selectedItems: null,
      notes: null,
    };
  },

  methods: {
    getNotes: function () {
      axios
        .get("http://localhost:3000/notes")
        .then((response) => (this.notes = response.data));
    },
    deleteNote: function (id) {
      axios
        .delete(`http://localhost:3000/notes/${id}`)
        .then((response) => (this.message = response.data));
      this.$router.push("/");
    },
    deleteMultipleNotes: function (notesList) {
      notesList.forEach((noteId) => {
        this.deleteNote(noteId);
      });
    },
  },

  mounted: function () {
    this.getNotes();
  },
};
</script>