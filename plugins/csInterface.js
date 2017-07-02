export default {
	install(Vue, options) {
		Vue.mixin({
			data() {
				return {
					cs: options.cs
				}
			},
			
			methods: {
				evalScript(functionName, parameters, callback) {
					let params = null;
					if(typeof parameters === 'function' && callback === undefined) {
						callback = parameters
						params = []
					} else {
						params = JSON.parse(JSON.stringify(parameters))
					}

					if (typeof params !== 'object') {
						params = [ params ]
					}

					let call = functionName + '(' + params.map(item => {
						if(typeof item === 'string') {
							return '"' + item + '"'
						}
						if(typeof item === 'number' || typeof item === 'boolean') {
							return item
						}
						if(typeof item === 'object' || typeof item === 'array') {
							return JSON.stringify(item).replace(/\"/g, '\\"')
						}
					}).join(', ') + ')';
					
					this.cs.evalScript(call, returnValue => {
						if (typeof callback !== 'function') {
							return
						}

						const tryParseJson = (str) => {
							let response = null;
							try {
								response = JSON.parse(str)
							} catch (e) {
								return;
							}
							return response;
						}

						let json = tryParseJson(returnValue)
						if(json) {
							return callback(json)
						}

						let quotedJson = tryParseJson('"' + returnValue + '"')
						if (quotedJson) {
							return callback(quotedJson)
						}

						return callback(returnValue)

					});
				}
			}
		})
	}
}