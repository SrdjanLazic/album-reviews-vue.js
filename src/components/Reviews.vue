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
      <h3 v-if="album.reviews.length === 0">No reviews to show.</h3>
      <b-card-group deck v-for="review in album.reviews" :key="review.id">
        <b-card
            align="center"
            class="shadow-sm p-1 mb-1 bg-white rounded card"
        >
          <b-card-title><b-icon-chat-quote-fill class="icon"></b-icon-chat-quote-fill></b-card-title>
          {{ review.body }}
          <br>
          <div class="footer">
            <b-form-rating id="rating-inline" readonly no-border inline :value="review.rating"></b-form-rating>
            <span></span>
            {{review.createdAt | formatDate}}
          </div>
          <br>
          <b-card-title>
              <b-icon-pencil-fill @click="editReview" class="buttons" :id="review.id"></b-icon-pencil-fill>
              <span></span>
              <b-icon-trash-fill class="buttons" :id="review.id" @click="deleteReview"></b-icon-trash-fill>
          </b-card-title>
        </b-card>
      </b-card-group>
    </div>
    <p v-else>You must be signed in to leave a review.</p>
  </div>

</template>

<script>
import {mapActions, mapState} from "vuex";
import albums from "@/views/Albums";

export default {
  name: "Reviews",

  props: {
    album: Object
  },

  computed: {
    ...mapState([
      'token',
      'reviews'
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
        'postReview',
        'fetchAlbums'
      ]),

      saveReview(){
        if(this.review !== "" && this.value !== null) {
          //this.postReview({body: this.review, rating: this.value, albumId: this.album.id});
          console.log(this.token);
          this.$socket.emit('review', {body: this.review, rating: this.value, albumId: this.album.id, token: this.token})
          this.review = "";
          this.value = null;
        }
        else
          swal("Please fill in all the fields first.");
      },

      editReview(e){
        this.$router.push({ name: 'EditReview', params: { id: e.currentTarget.id } })
      },

      deleteReview(e){
        this.$socket.emit('reviewDelete', {id:e.currentTarget.id, token: this.token})
      }
    },
  mounted() {
    this.fetchAlbums();
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

.buttons:hover{
  transform: scale(1.15);
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

.buttons {
  margin-top: 30px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

h4 {
  padding-bottom: 10px;
}

</style>