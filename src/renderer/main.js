import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import md5 from 'js-md5'

import '@/permission'  // 权限控制

import '@/icons'  // svg

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Highmaps from 'highcharts/modules/map';


HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);
Vue.use(ElementUI)
Vue.use(VueQuillEditor)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.axios = Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.$md5 = md5
Vue.prototype.$highcharts - Highcharts

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/icons/svg', true, /\.svg$/)
requireAll(req)  // 自动导入svg中的所有图片

require('es6-promise').polyfill()
require('es6-promise/auto')

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
