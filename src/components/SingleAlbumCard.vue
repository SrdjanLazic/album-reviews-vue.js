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
          class="mb-2"
      >
        <h4><strong>{{album.artist.name}}</strong></h4>
        <b-card-text>
          <p id="year">Year: {{album.year}}</p>
          <p>Genre: {{album.genre}}</p>
        </b-card-text>
      </b-card>
    </div>
  </div>

</template>

<script>

export default {
  name: "SingleAlbum",

  props: {
    album: Object
  }

}
</script>

<style scoped>
  img {
    max-width: 600px;
    max-height: 600px;
  }

  .d-flex {
    margin: 25px 0;
  }

  #year {
    padding-top: 35px;
  }

</style>