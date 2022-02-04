<template>
  <div>
    <SingleAlbumCard v-if="album" :album="album" />
    <Reviews v-if="album" :album="album"/>
  </div>
</template>

<script>
import SingleAlbumCard from "@/components/SingleAlbumCard";
import {mapActions, mapState} from "vuex";
import Reviews from "@/components/Reviews";

export default {

  name: "Single",

  components: {
    Reviews,
    SingleAlbumCard
  },

  computed: {
    ...mapState([
      'album'
    ])
  },

  methods: {
    ...mapActions([
      'fetchAlbumByID'
    ])
  },

  mounted() {
    this.fetchAlbumByID(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>