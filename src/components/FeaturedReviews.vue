<template>
  <div class="container-fluid">
    <b-card class="card" v-for="review in randomReviews" :key="review.id">
      <b-card-title><b-icon-chat-quote-fill class="icon"></b-icon-chat-quote-fill></b-card-title>
      <b-card-header class="header" @click="openAlbum" :id="review.album.id">
        {{review.album.artist.name}}
        -
        {{review.album.title}}
      </b-card-header>
      <b-card-text>
        {{review.body}}
      </b-card-text>
      <b-card-footer>
        <b-form-rating id="rating-inline" readonly no-border inline :value="review.rating"></b-form-rating>
        <span></span>
        {{review.createdAt | formatDate}}
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "FeaturedReviews",

  props: {
    reviews: Array
  },

  computed: {
    randomReviews: function () {
      return this.reviews.sort(() => .5 - Math.random()).slice(0,3);
    }
  },

  methods: {
    openAlbum(e){
      this.$router.push({ name: 'SingleAlbum', params: { id: e.target.id } });
    }
  }

}
</script>

<style scoped>
.container-fluid {
  justify-content: center;
  max-width: 600px;
}

.card {
  padding: 5px;
  margin: 15px;
}

.header{
  cursor: pointer;
}

#rating-inline {
  background: none;
}
span {
  margin-left: 35px;
}

</style>