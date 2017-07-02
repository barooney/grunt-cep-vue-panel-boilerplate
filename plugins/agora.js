export default {
	install(Vue, options) {
		Vue.mixin({
			data() {
				return {
					agora: options.agora
				}
			}
		})
	}
}