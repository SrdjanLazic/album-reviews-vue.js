<template>

  <div class="container-fluid">
    <br>
    <b-input type="search" v-model="filter" placeholder="Filter artists.."></b-input>
    <hr/>
    <b-pagination
        pills size="md"
        v-model="currentPage"
        :total-rows="artists.length"
        :per-page="perPage"
        aria-controls="image-table"
    ></b-pagination>

    <b-table
        id="image-table"
        hover
        fixed
        :items="artists"
        :fields="fields"
        :filter="filter"
        small
        :per-page="perPage"
        :current-page="currentPage"
        @row-clicked="rowClicked"
    >
    </b-table>

    <b-pagination
        pills size="md"
        v-model="currentPage"
        :total-rows="artists.length"
        :per-page="perPage"
        aria-controls="image-table"
    ></b-pagination>

  </div>

</template>

<script>

  import { mapActions, mapState } from 'vuex';

  export default {
    name: "Artists",

    data(){
      return {
        fields: [{key: 'name', sortable: true}],
        currentPage: 1,
        perPage: 5,
        filter: ""
      }
    },


    mounted() {
      this.fetchArtists();
    },

    computed: {
      ...mapState([
        'artists'
      ])
    },

    methods: {
      ...mapActions([
          'fetchArtists'
      ]),

      rowClicked(record, index) {
        this.$router.push({ name: 'SingleArtist', params: { id: record.id } });
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
    max-width: 30%;
    cursor: pointer;
  }

</style>