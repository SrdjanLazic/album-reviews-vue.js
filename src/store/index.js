import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    token: '',
    albums: [],
    artists: [],
    album: null,
    artist: null
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

    getAlbumByID(state, album){
      state.album = album;
    },

    getArtistByID(state, artist){
      state.artist = artist;
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
