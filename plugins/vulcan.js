export default {
	install(Vue, options) {
		Vue.mixin({
			data() {
				return {
					vulcan: options.vulcan,
					targets: []
				}
			},

			created() {
				this.targets = this.getTargetSpecifiers()
			},

			methods: {
				getTargetSpecifiers() {
					return this.vulcan.getTargetSpecifiers()
				},

				launchApp(specifier, focus) {
					return this.vulcan.launchApp(specifier, focus)
				}
			}
		})
	}
}