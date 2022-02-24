<template>
  <v-container>
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
    <v-container fluid>
      <v-row>
        <v-col class="d-flex align-left">
          <v-btn
            v-on:click="
              updateNote($route.params.id);
              $root.$emit('event', note);
            "
            color="teal lighten-1"
            dark
          >
            Save
          </v-btn>
          <v-btn
            v-on:click="
              deleteNote($route.params.id);
              $root.$emit('event', note);
            "
            dark
            color="blue-grey"
            >Delete</v-btn
          >
        </v-col>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-col class="d-flex align right">
          <p class="d-flex" align-end>
            Created: {{ moment(note.createdAt).format("MM/DD/YYYY hh:mmA") }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          ><p>{{ status }}</p>
        </v-col>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-col class="d-flex align-right">
          <p>
            Updated: {{ moment(note.updatedAt).format("MM/DD/YYYY hh:mmA") }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "NotesList",

  data: function () {
    return {
      title: null,
      selectedItem: 1,
      note: null,
      message: null,
      status: "",
    };
  },

  methods: {
    getNote: function (id) {
      axios
        .get(`http://localhost:3000/notes/${id}`)
        .then((response) => (this.note = response.data));
    },

    deleteNote: function (id) {
      axios
        .delete(`http://localhost:3000/notes/${id}`)
        .then((response) => (this.message = response.data));
      this.$router.push("/");
    },

    updateNote: function (id) {
      axios
        .patch(`http://localhost:3000/notes/${id}`, {
          title: this.note.title,
          body: this.note.body,
        })
        .then((response) => (this.note = response.data))
        .catch((error) => {
          console.log(error);
          this.status = "Title cannot be empty!";
        });
    },

    // checkTitle: function () {
    //   if (this.note.title == null) {
    //     this.status = "Title cannot be empty!";
    //   } else {
    //     this.status = "Note saved!";
    //   }
    // },
  },

  mounted: function () {
    this.getNote(this.$route.params.id);
    // this.checkTitle();
  },

  watch: function () {
    // this.checkTitle();
  },
};
</script>