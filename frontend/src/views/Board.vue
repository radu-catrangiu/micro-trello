<template>
  <div class="board">
    <b-container class="mx-auto">
      <div>
        <b-card
          overlay
          :img-src="`https://picsum.photos/900/170/?image=${board.imgNumber}&blur=3`"
          img-alt="Card Image"
          :title="board.title"
          title-tag="h1"
          text-variant="white-50"
        >
          <b-card-text>
            <!-- <h1 class="text-white bg-dark">{{board.title}}</h1> -->
          </b-card-text>
        </b-card>
      </div>
      <b-row class="my-3">
        <b-col cols="4">
          <b-button size="lg" block text="Go Back" variant="secondary" v-on:click="goBack">Go Back</b-button>
        </b-col>
        <b-col cols="8">
          <b-input-group class="mb-4" size="lg" prepend="Create new list">
            <b-form-input v-model="newListTitle" @keyup.enter="createList"></b-form-input>
            <b-input-group-append>
              <b-button size="lg" text="Create" variant="success" v-on:click="createList">Create</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row v-if="lists.length === 0">
        <b-col align-self="center">
          <h2 class="mt-5 text-muted">Create a list!</h2>
        </b-col>
      </b-row>
      <b-row
        class="row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 row-cols-xl-4"
      >
        <b-col v-for="(list, index) in lists" v-bind:key="list.id">
          <board-list
            v-bind:list="list"
            v-bind:board_id="id"
            @deleteList="deleteListHandler(list, index)"
            @openModal="cardModalHandler"
          />
        </b-col>
      </b-row>
    </b-container>

    <b-modal ref="card-modal" hide-footer>
      <div class="d-block text-center">
        <h3 v-if="modalType === 'add'">Add new card</h3>
        <h3 v-if="modalType === 'edit'">Edit card</h3>
      </div>
      <b-form-input v-model="cardTitle" placeholder="Title" class="mb-3"></b-form-input>
      <b-form-textarea
        id="textarea"
        v-model="cardDescription"
        placeholder="Description"
        rows="3"
        max-rows="6"
      ></b-form-textarea>

      <b-button class="mt-2" variant="primary" block @click="modalDone">done</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import BoardList from "@/components/List";
export default {
  components: {
    BoardList
  },
  props: ["id"],
  data: () => ({
    modalType: "",
    cardTitle: "",
    cardDescription: "",
    modalCallback: () => {},
    newListTitle: "",
    board: {
      imgNumber: 1,
      title: "empty board"
    },
    lists: []
  }),
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

    //eslint-disable-next-line
    console.log(this.id);
    var config = {
      method: "get",
      baseURL: this.apiUrl,
      url: "/board/" + this.id,
      headers: { login_token }
    };
    axios(config).then(result => {
      this.board = result.data;
      this.lists = this.board.lists;
    });
  },
  methods: {
    modalDone() {
      if (this.cardTitle.length > 0 && this.cardDescription.length > 0) {
        this.modalCallback(this.cardTitle, this.cardDescription);
        this.$refs["card-modal"].hide();
      }
    },
    cardModalHandler(modalType, callback, title, description) {
      this.modalType = modalType;
      this.cardTitle = title || "";
      this.cardDescription = description || "";
      this.modalCallback = callback;
      this.$refs["card-modal"].show();
    },
    createList() {
      var login_token = this.$cookies.get("login_token");
      if (!login_token) {
        return;
      }
      if (this.newListTitle.length < 1) {
        return;
      }
      var config = {
        method: "get",
        baseURL: this.apiUrl,
        url: "/lists/add",
        params: {
          title: this.newListTitle,
          board_id: this.id
        },
        headers: { login_token }
      };
      axios(config).then(result => {
        this.lists.push(result.data);
        this.newListTitle = "";
      });
    },
    deleteListHandler(list, index) {
      var login_token = this.$cookies.get("login_token");
      if (!login_token) {
        return;
      }
      var config = {
        method: "get",
        baseURL: this.apiUrl,
        url: "/lists/remove",
        params: {
          board_id: this.id,
          list_id: list.list_id
        },
        headers: { login_token }
      };
      axios(config).then(() => {
        this.lists.splice(index, 1);
      });
    },
    goBack() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>