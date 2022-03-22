import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import SecureLS from 'secure-ls'

var ls = new SecureLS({ isCompression: false })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      isAdmin: false,
      isOwner: false,
      public_id: ''
    },
    url: 'https://api-dev-at.herokuapp.com',
    // url: 'https://api-prod-at.herokuapp.com',
    // url: 'http://localhost:8000',
    token: '',
    loading: false
  },

  // below block of code is local storage based storage with secure true
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
    })
  ],

  getters: {
    auth(state) {
      return state.user
    },
    admin(state) {
      return state.isAdmin
    },
    url(state) {
      return state.url
    },
    token(state) {
      return state.token
    },
    public_id(state) {
      return state.user.public_id
    },
    is_owner(state) {
      return state.user.isOwner
    },
    loading(state) {
      return state.loading
    }
  },

  mutations: {
    troggle_on_auth: (state) => {
      state.user.loggedIn = true
    },
    troggle_off_auth: (state) => {
      state.user.loggedIn = false
    },
    troggle_on_admin: (state) => {
      state.user.isAdmin = true
    },
    troggle_on_owner: (state) => {
      state.user.isOwner = true
    },
    troggle_off_admin: (state) => {
      state.user.isAdmin = false
    },
    troggle_off_owner: (state) => {
      state.user.isOwner = false
    },
    set_token: (state, token) => {
      state.token = 'token ' + token
    },
    delete_token: (state) => {
      state.token = ''
    },
    set_public_id: (state, publicId) => {
      state.user.public_id = publicId
    },
    troggle_on_loading: (state) => {
      state.loading = true
    },
    troggle_off_loading: (state) => {
      state.loading = false
    }
  },

  actions: {
    troggle_on_auth: (context) => {
      setTimeout(function () { // reach out for data
        context.commit('troggle_on_auth')
      }, 0)
    },
    troggle_off_auth: (context) => {
      context.commit('troggle_off_auth')
    },
    troggle_on_admin: (context) => {
      setTimeout(function () { // reach out for data
        context.commit('troggle_on_admin')
      }, 0)
    },
    troggle_off_admin: (context) => {
      context.commit('troggle_off_admin')
    },
    set_token: (context, token) => {
      context.commit('set_token', token)
    },
    delete_token: (context) => {
      context.commit('delete_token')
    },
    set_public_id: (context, publicId) => {
      context.commit('set_public_id', publicId)
    },
    troggle_on_owner: (context) => {
      context.commit('troggle_on_owner')
    },
    troggle_off_owner: (context) => {
      context.commit('troggle_off_owner')
    },
    troggle_on_loading: (context) => {
      context.commit('troggle_on_loading')
    },
    troggle_off_loading: (context) => {
      context.commit('troggle_off_loading')
    }
  }
})
