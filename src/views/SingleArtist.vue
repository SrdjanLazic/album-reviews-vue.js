<template>
  <ArtistAlbums v-if="artist" :artist="artist" :albums="albums"/>
</template>

<script>
import ArtistAlbums from "@/components/ArtistAlbums";
import {mapActions, mapState} from "vuex";

export default {

  name: "SingleArtist",

  components: {
    ArtistAlbums
  },

  computed: {
    ...mapState([
        'artist',
        'albums'
    ])
  },

  methods: {
    ...mapActions([
        'fetchArtistByID',
        'fetchAlbums'
    ])
  },

  mounted() {
    this.fetchArtistByID(this.$route.params.id);
    this.fetchAlbums();
  }
}
</script>

<style scoped>

</style>