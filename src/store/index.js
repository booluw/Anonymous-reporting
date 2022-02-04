import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase.js'
// import moment from 'moment'

var db = firebase.firestore()
window.db = db

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    SAVE_USER_DATA (state, payload) {
      state.user = payload
    },
  },
  actions: {
    signIn({ commit }, payload) {
      return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then((userCredential) => {
            var user = userCredential.user;
            commit('SAVE_USER_DATA', user)
            resolve()
          })
          .catch((error) => {
            reject(error)
          });
      })
    },
  }
})
