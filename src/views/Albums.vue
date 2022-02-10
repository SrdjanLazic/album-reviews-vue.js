<template>
  <div class="container-fluid">
    <br>
    <b-input type="search" v-model="filter" placeholder="Filter albums.."></b-input>
    <hr/>
    <b-pagination
        pills size="md"
        v-model="currentPage"
        :total-rows="albums.length"
        :per-page="perPage"
        aria-controls="image-table"
    ></b-pagination>

    <b-table
        id="image-table"
        hover
        fixed
        :items="albums"
        :fields="fields"
        :filter="filter"
        small
        :per-page="perPage"
        :current-page="currentPage"
        @row-clicked="rowClicked"
        class="table"
    >
    </b-table>

    <b-pagination
        pills size="md"
        v-model="currentPage"
        :total-rows="albums.length"
        :per-page="perPage"
        aria-controls="image-table"
    ></b-pagination>

  </div>

</template>

<script>

  import { mapActions, mapState } from 'vuex';

  export default {
    name: "Albums",

    data(){
      return {
        fields: [{key: 'title', sortable: true}, {key: 'artist.name', label: 'Artist', sortable: true}, {key: 'genre', sortable: true}, {key: 'year', sortable:true}],
        currentPage: 1,
        perPage: 7,
        filter: ""
      }
    },


    mounted() {
      this.fetchAlbums();
    },

    computed: {
      ...mapState([
        'albums'
      ])
    },

    methods: {
      ...mapActions([
          'fetchAlbums'
      ]),

      rowClicked(record, index) {
        this.$router.push({ name: 'SingleAlbum', params: { id: record.id } });
      }
    }


  }
</script>


<style scoped>
  .pagination {
    margin: 25px 0 15px 0;
    justify-content: center;
  }

  .container-fluid {
    max-width: 50%;
    cursor: pointer;
  }

</style>