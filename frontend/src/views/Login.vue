<template>
  <b-container>
    <b-row class="m-5">
      <b-col>
        <h1 class="logo">μTrello</h1>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col>&nbsp;</b-col>
      <b-col align-self="center">
        <b-form>
          <b-form-group id="input-group-1" label="Username:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="username"
              type="text"
              required
              placeholder="Enter username"
              @keyup.enter="login"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="password"
              type="password"
              required
              placeholder="Enter password"
              @keyup.enter="login"
            ></b-form-input>
          </b-form-group>

          <b-button @click="login" variant="primary" class="m-2">Login</b-button>
          <b-button @click="register" variant="warning" class="m-2">Register</b-button>
        </b-form>
      </b-col>
      <b-col>&nbsp;</b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  beforeCreate() {
    var login_token = this.$cookies.get("login_token");

    if (login_token) {
      this.$router.push("/");
    }
  },
  methods: {
    login() {
      if (this.username.length < 3 || this.password.length < 3) {
        return;
      }

      var config = {
        method: "get",
        baseURL: this.authUrl,
        url: "/login",
        auth: {
          username: this.username,
          password: this.password
        }
      };

      axios(config).then(result => {
        //eslint-disable-next-line
        console.log(result.data);
        if (result.data.login_token) {
          this.$cookies.set("login_token", result.data.login_token);
          this.$router.push("/");
        }
      });
    },
    register() {
      if (this.username.length < 3 || this.password.length < 3) {
        return;
      }

      var config = {
        method: "post",
        baseURL: this.authUrl,
        url: "/register",
        auth: {
          username: this.username,
          password: this.password
        }
      };

      axios(config).then(result => {
        //eslint-disable-next-line
        console.log(result.data);
        if (result.data.login_token) {
          this.$cookies.set("login_token", result.data.login_token);
          this.$router.push("/");
        }
      });
    }
  }
};
</script>

<style>
.logo {
  font-size: 10vh;
  color: #cfcfcf;
  font-weight: bold;
}
</style>