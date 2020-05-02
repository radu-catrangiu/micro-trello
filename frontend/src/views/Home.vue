<template>
  <div class="home">
    <b-container class="mx-auto">
      <b-row class="mt-3">
        <b-input-group class="mb-4" size="lg" prepend="Create new board">
          <b-form-input v-model="newBoard.title" @keyup.enter="addBoardCard"></b-form-input>
          <b-input-group-append>
            <b-button size="sm" text="Create" variant="success" v-on:click="addBoardCard">Create</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-row>
      <b-row v-if="boards.length === 0">
        <b-col align-self="center">
          <h2 class="mt-5 text-muted">Create a board!</h2>
        </b-col>
      </b-row>
      <b-row
        class="row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 row-cols-xl-4"
      >
        <b-col v-for="(board, index) in boards" v-bind:key="board.id">
          <board-card
            @deleteBoardCard="deleteBoardCardHandler(board, index)"
            v-bind:boardCard="board"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

import BoardCard from "@/components/BoardCard";
export default {
  name: "home",
  components: {
    BoardCard
  },
  beforeCreate() {
    var login_token = this.$cookies.get("login_token");

    if (!login_token) {
      this.$router.replace("/login");
    }
  },
  mounted() {
    var login_token = this.$cookies.get("login_token");
    if (!login_token) {
      return;
    }

    var config = {
      method: "get",
      baseURL: this.apiUrl,
      url: "/boards/list",
      headers: { login_token }
    };
    axios(config).then(result => {
      this.boards = result.data;
    });
  },
  data() {
    return {
      newBoard: {
        title: ""
      },
      boards: []
    };
  },
  methods: {
    deleteBoardCardHandler(board, index) {
      var login_token = this.$cookies.get("login_token");
      if (!login_token) {
        return;
      }

      var config = {
        method: "get",
        baseURL: this.apiUrl,
        url: "/boards/remove",
        params: {
          board_id: board.board_id
        },
        headers: { login_token }
      };
      axios(config).then(() => {
        this.boards.splice(index, 1);
      });
    },
    addBoardCard() {
      var login_token = this.$cookies.get("login_token");
      if (!login_token) {
        return;
      }

      if (this.newBoard.title.length < 1) {
        return;
      }
      var config = {
        method: "get",
        baseURL: this.apiUrl,
        url: "/boards/add",
        params: {
          title: this.newBoard.title
        },
        headers: { login_token }
      };
      axios(config).then(result => {
        this.boards.push(result.data);
        this.newBoard.title = "";
      });
    }
  }
};
</script>

<style>
</style>