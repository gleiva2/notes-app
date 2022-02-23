<template>
  <v-container>
    <v-text-field
      v-model="title"
      label="Title"
      outlined
      filled
      clearable
      color="teal"
    ></v-text-field>
    <v-textarea
      v-model="body"
      outlined
      filled
      auto-grow
      clearable
      color="teal"
    ></v-textarea>
    <v-btn
      v-on:click="
        postNote();
        $root.$emit('event', note);
      "
      color="teal lighten-1"
      dark
    >
      Save
    </v-btn>
    <p>{{ status }}</p>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "NoteAdd",

  data: function () {
    return {
      title: null,
      body: null,
      message: null,
      status: "",
    };
  },

  methods: {
    postNote: function () {
      axios
        .post("http://localhost:3000/notes", {
          title: this.title,
          body: this.body,
        })
        .then((response) => (this.message = response.data))
        .catch((error) => {
          console.log(error);
          this.status = "Title cannot be empty!";
        });
      this.checkTitle();
    },
    checkTitle: function () {
      if (this.title == null) {
        this.status = "Title cannot be empty!";
      } else {
        this.title = "";
        this.body = "";
        this.status = "Note saved!";
      }
    },
  },

  watch: function () {
    this.checkTitle();
  },
};
</script>