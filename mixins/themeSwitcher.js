export default {
	created() {
		this.initThemeSwitching()
	},
	methods: {
		initThemeSwitching() {
			var csInterface = new CSInterface();
			this.updateThemeWithAppSkinInfo(csInterface.hostEnvironment.appSkinInfo);
			csInterface.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, this.onAppThemeColorChanged);
		},

		toHex(color, delta) {
			function computeValue(value, delta) {
				var computedValue = !isNaN(delta) ? value + delta : value;
				if (computedValue < 0) {
					computedValue = 0;
				} else if (computedValue > 255) {
					computedValue = 255;
				}            
				computedValue = Math.floor(computedValue);
				computedValue = computedValue.toString(16);
				return computedValue.length === 1 ? "0" + computedValue : computedValue;
			} 
			var hex = "";
			if (color) {
				hex = computeValue(color.red, delta) + computeValue(color.green, delta) + computeValue(color.blue, delta);
			}
			return hex;
		},

		addRule(stylesheetId, selector, rule) {
			var stylesheet = document.getElementById(stylesheetId);   
			if (stylesheet) {
				stylesheet = stylesheet.sheet;
				if (stylesheet.addRule) {
					stylesheet.addRule(selector, rule);
				} else if (stylesheet.insertRule) {
					stylesheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.cssRules.length);
				}
			}
		},

		updateThemeWithAppSkinInfo(appSkinInfo) {

			let panelBgColor = appSkinInfo.panelBackgroundColor.color;
			let bgdColor = this.toHex(panelBgColor);
			let fontColor = "F0F0F0";
			if (panelBgColor.red > 122) {
				fontColor = "000000";
			}
 
			let styleId = "style";
			this.addRule(styleId, "body", "background-color:" + "#" + bgdColor);
			this.addRule(styleId, "body", "color:" + "#" + fontColor);

			if( appSkinInfo.panelBackgroundColor.color.red >= 127 ) {
				document.body.className = 'light'
			} else {
				document.body.className = 'dark'
			}
		},

		onAppThemeColorChanged(event) {
			var skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
			this.updateThemeWithAppSkinInfo(skinInfo);
		}
	}
}