<template>
  <div class="home">
    <Header subtitle="Featured reviews"/>
    <FeaturedReviews v-if="reviews" :reviews="reviews"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue"
import FeaturedReviews from "@/components/FeaturedReviews";
import {mapActions, mapState} from "vuex";

export default {
  name: 'Home',
  components: {
    FeaturedReviews,
    Header
  },

  computed: {
    ...mapState([
      'reviews'
    ])
  },

  methods: {
    ...mapActions([
      'fetchReviews',
      'fetchAlbums'
    ]),
  },

  mounted(){
      this.fetchReviews();
      this.fetchAlbums();
  }
}
</script>
