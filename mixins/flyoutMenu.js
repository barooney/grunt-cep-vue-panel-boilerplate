import { EventBus } from '../components/EventBus'

export default {
	mounted() {
		this.setupFlyoutMenu()
	},
	methods: {
		setupFlyoutMenu() {
			this.cs.setPanelFlyoutMenu('<Menu>\
				<MenuItem Id="item1" Label="Item 1" Enabled="true" Checked="false"/>\
				<MenuItem Id="" Label="---" Enabled="false"/>\
				<MenuItem Id="item2" Label="Item 2" Enabled="true" Checked="false"/>\
				<MenuItem Id="item3" Label="Item 3" Enabled="true" Checked="false"/>\
			</Menu>');
			this.cs.addEventListener('com.adobe.csxs.events.flyoutMenuClicked', this.handleFlyoutMenu)
		},

		handleFlyoutMenu(e) {
			switch(e.data.menuId) {
				case 'item1':
					EventBus.$emit('flyoutMenuClicked', { item: 1, msg: 'item 1 in the flyout menu was clicked'})
					break;
				case 'item2':
					EventBus.$emit('flyoutMenuClicked', { item: 2, msg: 'item 2 in the flyout menu was clicked'})
					break
				case 'item3':
					EventBus.$emit('flyoutMenuClicked', { item: 3, msg: 'item 3 in the flyout menu was clicked'})
					break
			}
		},
	}
}