import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    token: '',
    albums: [],
    artists: [],
    album: null,
    artist: null,
    reviews: []
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },

    addAlbums(state, albums) {
      state.albums = albums;
    },

    addArtists(state, artists) {
      state.artists = artists;
    },

    addReviews(state, reviews){
      state.reviews = reviews;
    },

    getAlbumByID(state, album){
      state.album = album;
    },

    getArtistByID(state, artist){
      state.artist = artist;
    },

    addReview(state, obj){

      const album = state.albums.filter(album => album.id === obj.albumId)[0];
      if(album){
        album.reviews.push(obj);
        state.album = album;
      }
    },

    updateReview(state, obj){

      const album = state.albums.filter(album => album.id === obj.albumId)[0];
      if(album){
        state.album = album;
        for (let rev of album.reviews) {
          if(rev.id === obj.id){
            rev.body = obj.body;
            rev.rating = obj.rating;
          }
        }
      }
    },


    deleteReview(state, obj){

      const album = state.albums.filter(album => album.id === obj.albumId)[0];
      if(album){
        state.album = album;
        album.reviews = album.reviews.filter(review => review.id !== obj.id);
      }
    }
  },

  actions: {
    fetchAlbums({ commit }) {
      fetch('http://localhost:8082/admin/albums',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
          .then( obj => obj.json() )
          .then( res => commit('addAlbums', res) );
    },

    fetchAlbumByID({ commit }, id) {
      fetch(`http://localhost:8082/admin/album/${id}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
          .then( obj => obj.json() )
          .then( res => commit('getAlbumByID', res) );
    },

    fetchArtistByID({ commit }, id) {
      fetch(`http://localhost:8082/admin/artist/${id}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
          .then( obj => obj.json() )
          .then( res => commit('getArtistByID', res) );
    },

    fetchArtists({ commit }) {
      fetch('http://localhost:8082/admin/artists',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
          .then( obj => obj.json() )
          .then( res => commit('addArtists', res) );
    },

    fetchReviews({ commit }) {
      fetch('http://localhost:8082/admin/reviews',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
          .then( obj => obj.json() )
          .then( res => commit('addReviews', res) );
    },

    postReview({ commit }, obj) {
      fetch('http://localhost:8082/admin/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(obj)
      })
          .then(res => res.json())
          .then(data => {
            if(data.msg){
              swal("Error!", data.msg, "error");
            }
      })
    },

    putReview({commit}, {obj, id}) {
      fetch(`http://localhost:8082/admin/review/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(obj)
      })
          .then(res => res.json())
          .then(data =>{
            if(data.msg){
              swal("Error!", data.msg, "error");
            }
      })
    },

    socket_review({commit}, msg){
      const review = JSON.parse(msg);
      commit('addReview', review)
    },

    socket_reviewUpdate({commit}, msg){
      const review = JSON.parse(msg);
      commit('updateReview', review)
    },

    socket_reviewDelete({commit}, msg){
      const review = JSON.parse(msg);
      commit('deleteReview', review)
    },

    socket_error(msg){
      swal(msg.error);
    },


    register({ commit }, obj) {
      fetch('http://127.0.0.1:8081/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( tkn => commit('setToken', tkn.token) );
    },

    login({ commit }, obj) {
      fetch('http://127.0.0.1:8081/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( tkn => {
            if (tkn.msg) {
              alert(tkn.msg);
            } else {
              commit('setToken', tkn.token)
            }
          });
    }
  },
  modules: {

  }
})
