<template>

  <div class="container-fluid">
    <b-pagination
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
        small
        :per-page="perPage"
        :current-page="currentPage"
        @row-clicked="rowClicked"
    >
    </b-table>

    <b-pagination
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
        fields: ['name'],
        currentPage: 1,
        perPage: 3
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
        this.$router.push({ name: 'Single', params: { id: record.objectID } });
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
  }
</style>