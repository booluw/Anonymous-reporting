import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebaseinit.js'
// import moment from 'moment'

var db = firebase.firestore()
window.db = db

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
