<template>
  <div>
    <b-card no-body class="overflow-hidden mb-2 mx-auto" style="max-width: 20rem;">
      <b-card-img 
        v-on:click="openBoard"
        v-bind:src="'https://picsum.photos/600/300/?image=' + boardCard.imgNumber"
        class="open-btn-picture rounded-0"
      />
      <b-card-body>
        <b-card-title v-if="!editable" v-bind:title="boardCard.title"></b-card-title>
        <b-form-input class="mb-2 text-center" size="lg" v-if="editable" v-model="newTitle"></b-form-input>
        <b-button-group block v-if="!editable">
          <b-button variant="secondary" v-on:click="editBoard">Edit Title</b-button>
          <b-button variant="danger" v-on:click="deleteBoard">Delete Board</b-button>
        </b-button-group>
        <b-button-group block v-else>
          <b-button variant="primary" v-on:click="editBoard(true)">Save</b-button>
          <b-button variant="secondary" v-on:click="editBoard(false)">Cancel</b-button>
        </b-button-group>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "BoardCard",
  props: {
    boardCard: Object
  },
  data() {
    return {
      editable: false,
      newTitle: ""
    };
  },
  methods: {
    openBoard() {
      this.$router.push({
        path: `/board/${this.boardCard.board_id}`
      });
    },
    editBoard(save) {
      if (!this.editable) {
        this.newTitle = this.boardCard.title;
        this.editable = true;
      } else {
        if (save && this.newTitle.length > 0) {
          var config = {
            method: "get",
            baseURL: this.apiUrl,
            url: "/boards/rename",
            params: {
              board_id: this.boardCard.board_id,
              title: this.newTitle
            }
          };
          axios(config).then(() => {
            this.boardCard.title = this.newTitle;
            this.newTitle = "";
          });
        } else {
          this.newTitle = "";
        }
        this.editable = false;
      }
    },
    deleteBoard() {
      this.$emit("deleteBoardCard");
    }
  }
};
</script>

<style>
.open-btn-picture {
  cursor: pointer;
}

.open-btn-picture:hover {
  opacity: 0.5;
  filter: alpha(opacity=50);
}
</style>