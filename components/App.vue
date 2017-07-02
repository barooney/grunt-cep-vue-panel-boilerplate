<template>
	<div>
		<h1>{{ msg }}</h1>
		<input type="text" class="topcoat-text-input" v-model="msg">
		<p>Latest events:</p>
		<ul>
			<li v-for="e in reversedEvents">{{ e }}</li>
		</ul>
		<p>activeDocument: <span :style="{color: activeDocument ? 'green' : 'red'}">{{ activeDocument }}</span></p>
		<p>currentlySaved: <span :style="{color: currentlySaved ? 'green' : 'red'}">{{ currentlySaved }}</span></p>
	</div>
</template>

<script>
	import Vue from 'vue/dist/vue.js'
	import { EventBus } from './EventBus'
	export default {
		data() {
			return {
				msg: 'Hello World!',
				events: [],
				activeDocument: false,
				currentlySaved: false,
			}
		},

		computed: {
			reversedEvents() {
				let evs = Vue.util.extend([], this.events)
				return evs.reverse().slice(0, 5)
			}
		},

		mounted() {
			this.loadJSONExtension()
			this.addCSListeners()
			this.addPanelListeners()
		},

		destroyed() {
			this.removeCSListeners()
			this.removePanelListeners()
		},

		methods: {
			loadJSONExtension() {
				let extension = this.cs.getSystemPath(SystemPath.EXTENSION) + '/extendscript/json2.js'
				this.evalScript('Boilerplate.loadScript', extension)
			},

			addCSListeners() {
				this.cs.addEventListener('applicationActivate', this.onApplicationActivate)
				this.cs.addEventListener('documentAfterActivate', this.onDocumentAfterActivate)
				this.cs.addEventListener('documentAfterDeactivate', this.onDocumentAfterDeactivate)
				this.cs.addEventListener('documentAfterSave', this.onDocumentAfterSave)
			},

			removeCSListeners() {
				this.cs.removeEventListener('applicationActivate', this.onApplicationActivate)
				this.cs.removeEventListener('documentAfterActivate', this.onDocumentAfterActivate)
				this.cs.removeEventListener('documentAfterDeactivate', this.onDocumentAfterDeactivate)
				this.cs.removeEventListener('documentAfterSave', this.onDocumentAfterSave)
			},

			addPanelListeners() {
				EventBus.$on('flyoutMenuClicked', this.onFlyoutMenuClicked)
			},

			removePanelListeners() {
				EventBus.$off('flyoutMenuClicked', this.onFlyoutMenuClicked)
			},

			onApplicationActivate(e) {
				// console.log(e)
			},

			onDocumentAfterActivate(e) {
				this.activeDocument = true	
			},

			onDocumentAfterDeactivate(e) {
				this.activeDocument = false	
			},

			onDocumentAfterSave(e) {
				this.currentlySaved = true
				setTimeout(() => this.currentlySaved = false, 60000)
			},

			onFlyoutMenuClicked(e) {
				this.events.push(e.msg)
			}
		}
	}
</script>