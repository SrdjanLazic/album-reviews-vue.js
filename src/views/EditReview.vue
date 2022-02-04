<template>
  <div class="container-fluid">
    <b-form-textarea
        required
        v-model="review"
        :state = "reviewState"
        placeholder="Say something..."
    ></b-form-textarea>
    <b-form-invalid-feedback id="input-live-feedback">
      This field can't be empty.
    </b-form-invalid-feedback>
    <div class="rating">
      <b-form-rating no-border show-clear v-model="value"></b-form-rating>
    </div>
    <div class="button-div">
      <b-button @click="saveReview">Save review</b-button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "EditAlbum",

  data() {
    return {
      review: "",
      value: null,
    }
  },

  computed: {
    reviewState() {
      return this.review.length > 0
    },
  },

  methods: {

    ...mapActions([
        'putReview'
    ]),

    saveReview() {
      if (this.review !== "" && this.value !== null){
        this.putReview({obj: {body: this.review, rating: this.value}, id: this.$route.params.id} );
        this.$router.back();
      }
      else
        swal("Please fill in all the fields first.");
    },

  }
}
</script>

<style scoped>
.container-fluid{
  justify-content: center;
  max-width: 600px;
  margin-top: 55px;
}
</style>