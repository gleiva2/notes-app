<template>
  <v-container v-if="!loading" fluid>
    <v-text-field
      v-model="note.title"
      label="Title"
      outlined
      filled
      clearable
      color="teal"
    ></v-text-field>
    <v-textarea
      v-model="note.body"
      filled
      clearable
      outlined
      auto-grow
      color="teal"
    ></v-textarea>
    <v-row>
      <v-col>
        <v-btn
          @click="updateNote($route.params.id)"
          color="teal lighten-1"
          dark
          class="mr-2"
        >
          Save
        </v-btn>
        <v-btn @click="deleteNote($route.params.id)" dark color="blue-grey"
          >Delete</v-btn
        >
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="text-right">
        <p>Created: {{ moment(note.createdAt).format("MM/DD/YYYY hh:mmA") }}</p>
        <p>Updated: {{ moment(note.updatedAt).format("MM/DD/YYYY hh:mmA") }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "NotesList",

  data() {
    return {
      selectedItem: 1,
      note: null,
      message: null,
      status: "",
      loading: true,
    };
  },

  methods: {
    async getNote(id) {
      await axios
        .get(`http://localhost:3000/notes/${id}`)
        .then((response) => (this.note = response.data));
    },

    async deleteNote(id) {
      await axios
        .delete(`http://localhost:3000/notes/${id}`)
        .then((response) => (this.message = response.data));

      this.$root.$emit("updateNotesList");
      if (this.$router.history.current.name !== "NoteAdd")
        this.$router.push({ name: "NoteAdd" });
    },

    async updateNote(id) {
      await axios
        .patch(`http://localhost:3000/notes/${id}`, {
          title: this.note.title,
          body: this.note.body,
        })
        .then((response) => (this.note = response.data))
        .catch((error) => {
          console.log(error);
          this.status = "Title cannot be empty!";
        });

      this.$root.$emit("updateNotesList");
    },
  },

  async mounted() {
    this.loading = true;
    await this.getNote(this.$route.params.id);
    this.loading = false;
  },
};
</script>
