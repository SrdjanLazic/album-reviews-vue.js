<template>
  <div>
<!--    <SingleAlbumCard v-if="album" :album="album" />-->
    <p>{{album}}</p>
  </div>
</template>

<script>
import SingleAlbum from "@/components/SingleAlbumCard";
import {mapActions, mapState} from "vuex";

export default {
  name: "Single",
  components: {
    SingleAlbum
  },

  data(){
    return {

    }
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
    this.fetchAlbumByID(this.$route.params.id).then( res => {
      this.album = res;
    });
  }
}
</script>

<style scoped>

</style>