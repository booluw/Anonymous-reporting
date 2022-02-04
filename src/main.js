import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import moment from 'moment'
import Chakra, { CThemeProvider } from '@chakra-ui/vue'


Vue.use(Chakra)
Vue.prototype.moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(CThemeProvider, [h(App)])
}).$mount('#app')
