<template>
  <div>
    <h1>{{artist.name}}</h1>
    <div class="container-fluid">
      <b-container>
        <b-row>
          <b-col class="albums" v-for="album in artistAlbums" :key="album.id">
            <b-img @click="openAlbum" :id="album.id" thumbnail fluid :src="album.albumArtURL" width="300" alt="Image 1"></b-img>
            <h5>{{album.title}}</h5>
          </b-col>
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
  computed: {
    artistAlbums: function () {
      return this.albums.filter(album => album.artist.id === this.artist.id);
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
div {
  padding: 10px 0;
}
h5 {
  padding-top: 10px;
}

.albums {
  cursor: pointer;
}

</style>