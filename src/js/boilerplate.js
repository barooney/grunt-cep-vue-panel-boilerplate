/**
 * Copyright 2017 Daniel Baron
 * All rights reserved.
 */

import Vue from 'vue/dist/vue.js'

import themeSwitcher from '../../mixins/themeSwitcher.js'
import flyoutMenu from '../../mixins/flyoutMenu.js'

import csInterface from '../../plugins/csInterface.js'
Vue.use(csInterface, { cs: new CSInterface })

// import vulcan from '../../plugins/vulcan.js'
// Vue.use(vulcan, { vulcan: new Vulcan })

// import agora from '../../plugins/agora.js'
// Vue.use(agora, { agora: new AgoraLib })

import App from '../../components/App.vue'

Vue.component('App', App)

new Vue({
	el: '#app',
	mixins: [themeSwitcher, flyoutMenu]
})