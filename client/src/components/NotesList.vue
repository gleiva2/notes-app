<template>
  <v-card class="mx-auto" max-width="300">
    <v-list flat rounded>
      <v-subheader>Notes</v-subheader>
      <v-list-item-group color="teal">
        <v-list-item v-for="(note, i) in notes" :key="i" :to="note.id">
          <v-list-item-content>
            <v-list-item-title>{{ note.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-checkbox
              color="teal"
              v-model="selectedItems"
              :value="note.id"
              multiple
              @click.prevent
            ></v-checkbox>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-btn to="/add-note" small class="mx-2 mb-2" fab dark color="teal lighten-1">
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>

    <v-btn
      v-if="selectedItems != null && selectedItems != 0"
      color="error"
      @click="deleteMultipleNotes(selectedItems)"
    >
      Delete
    </v-btn>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "NotesList",

  data () {
    return {
      selectedItems: [],
      notes: null,
    };
  },

  methods: {
    async getNotes() {
      await axios
        .get("http://localhost:3000/notes")
        .then((response) => (this.notes = response.data));
    },
    async deleteNote(id) {
      await axios
        .delete(`http://localhost:3000/notes/${id}`)
        .then((response) => (this.message = response.data));
    },
    async deleteMultipleNotes(notesList) {
      for (let note of notesList) {
        await this.deleteNote(note);
      }

      this.selectedItems = []
      await this.getNotes();

      if (this.$router.history.current.name !== 'NoteAdd') this.$router.push({name: "NoteAdd"});
    },
  },

  async mounted() {
    await this.getNotes();

    this.$root.$on("updateNotesList", () => {
      this.getNotes();
    });
  },
};
</script>
