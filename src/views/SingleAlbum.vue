<template>
  <div>
    <SingleAlbumCard v-if="album" :album="album" />
  </div>
</template>

<script>
import SingleAlbumCard from "@/components/SingleAlbumCard";
import {mapActions, mapState} from "vuex";

export default {

  name: "Single",

  components: {
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