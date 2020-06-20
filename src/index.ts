import { VueConstructor } from 'vue'
import vidle from './components/vidle'

const Vidle = {
  install(Vue: VueConstructor) {
    Vue.component('v-idle', vidle)
  },
}

export default Vidle
