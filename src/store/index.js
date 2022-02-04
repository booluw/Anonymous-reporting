import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase.js'
import moment from 'moment'

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
    signOut({ commit }) {
      return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(() => {
          resolve()
        }).catch((error) => {
          reject(error)
        });
      })
    },
    addReport({ commit }, payload) {
      return new Promise((resolve, reject) => {
        db.collection('reports').add({
          date: moment().format(),
          incident_date: payload.date,
          description: payload.description,
          status: 'pending',
          staff_name: '',
          student_name: payload.student.name
        }).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getReports({ commit }, payload) {
      let result = []
      return new Promise((resolve, reject) => {
        db.collection("reports").orderBy("date", "desc")
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                result.push(doc.data());
            });
            resolve(result)
        });
      })
    },
    markReport({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let ref = ''
        db.collection('reports').where('date', '==', payload.date).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              let dump = doc.data()
              console.log(dump)
              if (dump.student_name === payload.student_name && dump.incident_date === payload.incident_date) {
                ref = doc.id
                db.collection('reports').doc(ref).update({
                  status: 'success',
                  staff_name: firebase.auth().currentUser.email,
                }).then(() => {
                  resolve()
                }).catch(error => {
                  reject(error)
                })
              }
            }).catch(error => {
              reject(error)
            })
          })
      })
    }
  }
})
