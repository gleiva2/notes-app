<template>
  <v-container>
    <v-form v-model="valid">
      <v-text-field
        v-model="title"
        label="Title"
        outlined
        filled
        clearable
        color="teal"
        :rules="[required]"
      ></v-text-field>
      <v-textarea
        v-model="body"
        outlined
        filled
        auto-grow
        clearable
        color="teal"
      ></v-textarea>
    </v-form>

    <v-btn @click="postNote()" color="teal lighten-1" dark>
      Save
    </v-btn>
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
      valid: true,
      required: (v) => !!v || "Please enter a title.",
    };
  },

  methods: {
    postNote: function () {
      axios
        .post("http://localhost:3000/notes", {
          title: this.title,
          body: this.body,
        })
        .then((response) => {
          this.message = response.data
          this.$root.$emit('updateNotesList')
          this.$router.push({name: "NoteView", params: {id: response.data.id}});
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
