<template>
  <div id="app">
    <Header subtitle="Log In"/>

    <div class="form">
      <b-form @submit="onSubmit">
        <b-form-group label="Email" label-for="email">
          <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter your email" required></b-form-input>
        </b-form-group>

        <b-form-group label="Password:" label-for="password">
          <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Header";
  import {mapActions} from "vuex";

  export default {
    name: "Login",

    components: {Header},

    data() {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },

    methods: {
      ...mapActions([
        'login'
      ]),

      onSubmit(e) {
        e.preventDefault();

        console.log(this.form);
        this.login(this.form);
        this.$router.push({name: 'Home'});
      }
    }
}
</script>

<style scoped>

</style>