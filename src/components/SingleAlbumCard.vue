<template>
  <div class="d-flex justify-content-center">
    <div class="row text-center">
      <b-card
          :title="album.title"
          :img-src= "album.albumArtURL"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2 shadow p-3 mb-5 bg-white rounded card"
      >
        <h4><strong  class="artistName" @click="openArtist" :id="album.artist.id">{{album.artist.name}}</strong></h4>
        <b-card-text>
          <p id="year">Year: {{album.year}}</p>
          <p>Genre: {{album.genre}}</p>
          <br>
          <p>Rating:</p>
          <b-form-rating :value="averageRating()" class="rating" show-value precision="2" readonly></b-form-rating>
        </b-card-text>
      </b-card>
    </div>
  </div>

</template>

<script>

import albums from "@/views/Albums";

export default {
  name: "SingleAlbum",

  props: {
    album: Object
  },

  methods: {
    openArtist(e){
      this.$router.push({ name: 'SingleArtist', params: { id: e.target.id } });
    },

    averageRating(){
      let sum = 0;

      for (let review of this.album.reviews) {
        sum += review.rating;
      }
      return ((sum / this.album.reviews.length).toFixed(2));
    }

  },

}
</script>

<style scoped>
  img {
    max-width: 600px;
    max-height: 600px;

  }

  .d-flex {
    margin-bottom: 25px;
    padding: 25px;
    /*filter: drop-shadow(0 3px 0.25rem #828282);*/
  }

  #year {
    padding-top: 35px;
  }

  .artistName {
    cursor: pointer;
  }

  .card:hover {
    transform: scale(1.03);
  }

  .card{
    transition: transform 0.2s ease;
  }

</style>