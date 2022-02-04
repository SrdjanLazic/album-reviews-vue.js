<template>
  <div id="app">
    <Header subtitle="Create account"/>
    <div class="container-fluid">
      <div class="form">
        <b-form @submit="onSubmit">
          <b-form-group label="Email address:" label-for="email">
            <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
          </b-form-group>

          <b-form-group label="Password:" label-for="password">
            <b-form-input id="password" v-model="form.password" type="password" placeholder="Enter password" required></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </div>
    </div>

  </div>
</template>

<script>
  import Header from "@/components/Header";
  import {mapActions} from "vuex";

  export default {
    name: "Register",

    components: {Header},

    data() {
      return {
        form: {
          email: '',
          password: '',
          role: "user"
        }
      }
    },

    methods: {
      ...mapActions([
        'register'
      ]),

      onSubmit(e) {
        e.preventDefault();

        this.register(this.form);
        this.$router.push({ name: 'Home' });
      }
    }
}
</script>

<style scoped>

.container-fluid {
  max-width: 600px;
}

</style>