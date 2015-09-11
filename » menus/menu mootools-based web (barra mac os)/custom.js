		/////////////////////////////////////////////////////////
		//
		// FISHEYE MENU CLASS
		//
		var fish = new Class({
			minZoom : 54,
			maxZoom : 128,
			zoomQty : 5,
			testVar : 'hi',
			initialize: function(handle) {
				this.handle = $(handle);
				this.items = this.handle.getElements('img');
				this.handle.setStyle('margin-left', '-' + (this.handle.offsetWidth/2) + 'px');
				this.effects = [] //meh
				this.items.each(function(el) {
					el.addEvent('mouseover', function() { this.magnify(el); }.bind(this));
					el.addEvent('mouseout', function() { this.shrink(el); }.bind(this));
					this.effects[el.src] = $(el.parentNode).effects({wait: false, duration: 300});
				}, this);
			},
			magnify: function(el) {
				this.effects[el.src].custom({
					'height': this.maxZoom + 'px',
					'width': this.maxZoom + 'px',
					'margin-top': '-' + (this.maxZoom - el.getStyle('height').toInt()) + 'px',
				})
			},
			shrink: function(el) {
				this.effects[el.src].custom({
					'height': this.minZoom + 'px',
					'width': this.minZoom + 'px',
					'margin-top': '0px',
				})
			}
		});
			Window.onDomReady(function(){
				var fisheye = new fish($('dock'));
			});