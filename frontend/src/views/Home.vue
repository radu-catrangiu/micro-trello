<template>
  <div class="home">
    <b-container class="mx-auto">
      <b-row class="mt-3">
        <b-input-group class="mb-4" size="lg" prepend="Create new board">
          <b-form-input v-model="newBoard.title"></b-form-input>
          <b-input-group-append>
            <b-button size="sm" text="Create" variant="success" v-on:click="addBoardCard">Create</b-button>
          </b-input-group-append>
        </b-input-group>
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
  created() {
    var config = {
      method: "get",
      baseURL: this.apiUrl,
      url: "/boards/list"
    };
    axios(config).then((result) => {
      this.boards = result.data
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
      var config = {
        method: "get",
        baseURL: this.apiUrl,
        url: "/boards/remove",
        params: {
          board_id: board.board_id
        }
      };
      axios(config).then(() => {
        this.boards.splice(index, 1);
      });
    },
    addBoardCard() {
      if (this.newBoard.title.length < 1) {
        return;
      }
      var config = {
        method: "get",
        baseURL: this.apiUrl,
        url: "/boards/add",
        params: {
          title: this.newBoard.title
        }
      };
      axios(config).then((result) => {
        this.boards.push(result.data)
      });
    }
  }
};
</script>

<style>
</style>