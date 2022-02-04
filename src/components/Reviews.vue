<template>

  <div class="container-fluid">
    <h4>Reviews</h4>

    <div v-if="token">
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
        <b-button variant="outline-dark" @click="saveReview">Post review</b-button>
      </div>

      <b-card-group deck v-for="review in album.reviews" :key="review.id">
        <b-card
            align="center"
            class="shadow-sm p-1 mb-1 bg-white rounded"
        >
          <b-card-title><b-icon-chat-quote-fill class="icon"></b-icon-chat-quote-fill></b-card-title>
          {{ review.body }}
          <br>
          <div class="footer">
            <b-icon-star-fill v-for="rating in review.rating"/>
            <span></span>
            {{review.createdAt | formatDate}}
          </div>
          <b-card-title>
              <b-icon-pencil-fill @click="editReview" class="edit" :id="review.id"></b-icon-pencil-fill>
          </b-card-title>
        </b-card>
      </b-card-group>
    </div>
    <p v-else>You must be signed in to leave a review.</p>
  </div>

</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Reviews",

  props: {
    album: Object
  },

  computed: {
    ...mapState([
      'token'
    ]),

    reviewState() {
      return this.review.length > 0
    },

  },

  data() {
    return {
      review: "",
      value: null,
    }
  },
  methods: {

    ...mapActions([
        'postReview'
      ]),

      saveReview(){
        if(this.review !== "" && this.value !== null)
          this.postReview({body: this.review, rating: this.value, albumId: this.album.id});
        else
          swal("Please fill in all the fields first.");
      },

      editReview(e){
        this.$router.push({ name: 'EditReview', params: { id: e.currentTarget.id } })
      }
    }
}

</script>

<style scoped>
.card {
  margin-top: 10px;
  text-align: left;
}

.card-title {
  margin-bottom: 0px;
}

.card-body {
  padding-bottom: 5px;
}

.card {
  background-color: #d5efe9;
}

.footer {
  padding-top: 50px;
  padding-left: 10px;
  padding-right: 10px;

}

.icon {
  margin: 15px 0;
}

.container-fluid {
  padding: 15px 25px;
  max-width: 600px;
  justify-content: center;
}

.button-div {
  padding-bottom: 55px;
}

span {
  padding-right: 50px;
}

.rating {
  padding-bottom: 25px;
}

.edit {
  margin-top: 30px;
  cursor: pointer;
}

h4 {
  padding-bottom: 10px;
}

</style>