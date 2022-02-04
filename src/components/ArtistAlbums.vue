<template>
  <div class="container-fluid">
    <h1>{{artist.name}}</h1>
    <div class="container-fluid">
      <b-container>
        <b-row v-if="artist.albums.length > 0">
          <b-col class="albums" v-for="album in artist.albums" :key="album.id">
            <b-img class="shadow p-1 mb-4 bg-white rounded" @click="openAlbum" :id="album.id" thumbnail fluid :src="album.albumArtURL" width="300" alt="Image 1"></b-img>
            <h5>{{album.title}}</h5>
          </b-col>
        </b-row>
        <b-row v-else>
          <b-col><h5>No albums to show. 😢</h5></b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistAlbums",

  props: {
      artist: Object,
      albums: Array
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
  padding-top: 60px;
  justify-content: center;
  margin: auto;
}

.albums {
  cursor: pointer;
}

</style>