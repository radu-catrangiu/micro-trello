<template>
  <b-list-group class="mb-4">
    <b-list-group-item active class="flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h3 v-if="!editable" class="mb-1">{{list.title}}</h3>
        <b-form-input class="mb-2 text-center" size="lg" v-if="editable" v-model="newTitle"></b-form-input>
      </div>
    </b-list-group-item>

    <b-list-group-item style="cursor: default;" v-for="(card, index) in list.cards" v-bind:key="card.card_id" href="#" class="flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{card.title}}</h5>
      </div>

      <p class="mb-1"> {{card.description}} </p>
      <b-button-group block>
        <b-button variant="secondary" v-on:click="editCard(card, index)">Edit Card</b-button>
        <b-button variant="danger" v-on:click="deleteCard(card, index)">Delete Card</b-button>
      </b-button-group>

    </b-list-group-item>

    <b-list-group-item class="flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <b-button block variant="secondary" class="mb-1" v-on:click="addCard">Add card</b-button>
      </div>
      <b-button-group block v-if="!editable">
        <b-button variant="secondary" v-on:click="editList">Edit Title</b-button>
        <b-button variant="danger" v-on:click="deleteList">Delete List</b-button>
      </b-button-group>
      <b-button-group block v-else>
        <b-button variant="primary" v-on:click="editList(true)">Save</b-button>
        <b-button variant="secondary" v-on:click="editList(false)">Cancel</b-button>
      </b-button-group>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    list: Object,
    board_id: String
  },
  data() {
    return {
      newTitle: "",
      editable: false
    }
  },
  methods: {
    addCard() {
      var callback = (title, description) => {
        var config = {
          method: "get",
          baseURL: this.apiUrl,
          url: "/cards/add",
          params: {
            board_id: this.board_id,
            list_id: this.list.list_id,
            title,
            description
          }
        };
        axios(config).then((result) => {
          this.list.cards.push(result.data);
        });
      }
      this.$emit("openModal", "add", callback);
    },
    editCard(card) {
      var callback = (title, description) => {
        var config = {
          method: "get",
          baseURL: this.apiUrl,
          url: "/cards/update",
          params: {
            board_id: this.board_id,
            list_id: this.list.list_id,
            card_id: card.card_id,
            title,
            description
          }
        };
        axios(config).then(() => {
          card.title = title;
          card.description = description;
        });
      }
      this.$emit("openModal", "edit", callback, card.title, card.description);
    },
    deleteCard(card, index) {
      var config = {
        method: "get",
        baseURL: this.apiUrl,
        url: "/cards/remove",
        params: {
          board_id: this.board_id,
          list_id: this.list.list_id,
          card_id: card.card_id
        }
      };
      axios(config).then(() => {
        this.list.cards.splice(index, 1);
      });
    },
    deleteList() {
      this.$emit("deleteList");
    },
    editList(save) {
      if (!this.editable) {
        this.newTitle = this.list.title;
        this.editable = true;
      } else {
        if (save && this.newTitle.length > 0) {
          var config = {
            method: "get",
            baseURL: this.apiUrl,
            url: "/lists/rename",
            params: {
              board_id: this.board_id,
              list_id: this.list.list_id,
              title: this.newTitle
            }
          };
          axios(config).then(() => {
            this.list.title = this.newTitle;
            this.newTitle = "";
          });
        } else {
          this.newTitle = "";
        }
        this.editable = false;
      }
    }
  }
};
</script>

<style>
</style>