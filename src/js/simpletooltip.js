/**
 * Simpletooltip is a JQuery plugin, thought to insert short tooltips to any element of your website more easily
 * v1.3.0
 *
 * 2014 Carlos Sanz Garcia
 * Distributed under GPL-3.0 license
 *
 * http://not-only-code.github.com/Simpletooltip
 */

(function($) {
	"use strict";

	var Simpletooltip,
		$body = null,
		themes = {
			dark: {
				color: '#CCCCCC',
				background_color: '#222222',
				border_color: '#111111',
				border_width: 4,
			},
			gray: {
				color: '#434343',
				background_color: '#DCDCDC',
				border_color: '#BABABA',
				border_width: 4,
			},
			white: {
				color: '#6D7988',
				background_color: '#CCDEF2',
				border_color: '#FFFFFF',
				border_width: 4,
			},
			blue: {
				color: '#FFFFFF',
				background_color: '#0088BE',
				border_color: '#00669C',
				border_width: 4,
			}
		},
		defaults = {
			position: 'top',
			color: '#DDDDDD',
			background_color: '#222222',
			border_width: 0,
			arrow_width: 6,
			padding: {
				width: 8,
				height: 6
			},
			max_width: 200,
			fade: true
		},
		settings;

	Simpletooltip = function ($el) {

		this.$el = $el || null;
		this.$tooltip = null;
		this.$arrow = null;
		this.margins = {
			border: 6,
			top: 15,
			right: 15,
			bottom: 15,
			left: 15
		};
		this.templates = {
			tooltip: '<div class="simple-tooltip"></div>',
			arrow: '<span class="arrow">&nbsp;</span>'
		};

		if (!this.isJqueryObject(this.$el)) {
			return;
		}

		this.title = this.$el.attr('title');
		if (this.title === undefined || !this.title.length) {
			return;
		}
		this.$el.attr('title', '');

		this.setTooltip();
		this.initialize();

		return this;
	};

	Simpletooltip.prototype.isJqueryObject = function (what) {
		return ( what !== null && what !== undefined && typeof(what) === 'object' && what.jquery !== undefined ) ? true : false;
	};

	Simpletooltip.prototype.setTooltip = function () {

		if (this.isJqueryObject(this.$tooltip) && this.isJqueryObject(this.$arrow)) {
			return;
		}

		this.$tooltip = $(this.templates.tooltip);
		//this.$tooltip.attr('id', 'simple-tooltip-' + Math.random(1000000, 1));
		this.$tooltip.html(this.title);
		this.$tooltip.addClass(this.getAttribute('position'));
		this.$arrow = $(this.templates.arrow);
		this.$tooltip.append(this.$arrow);

		return this.$tooltip;
	};

	Simpletooltip.prototype.getAttribute = function (attribute_name) {

		var attribute = 'simpletooltip-' + attribute_name.replace('_', '-'),
			theme;

		if (this.$el.data(attribute) !== undefined) {
			return this.$el.data(attribute);
		}

		if ( (theme = this.$el.data('simpletooltip-theme')) !== undefined ) {
			if (themes[theme] !== undefined && themes[theme][attribute_name] !== undefined) {
				return themes[theme][attribute_name];
			}
		}

		if (settings[attribute_name] !== undefined) {
			return settings[attribute_name];
		}

		return false;
	};

	Simpletooltip.prototype.initialize = function() {

		this.$el.on('mouseenter', {that: this}, this.mouseOver);
		this.$el.on('mouseleave', {that: this}, this.mouseOut);

		this.$el.attr('title', '');
	};

	Simpletooltip.prototype.mouseOver = function (event) {

		var that = event.data.that; // DIRTY

		if (that.$tooltip.parent().length) {
			return event;
		}

		$body.append(that.$tooltip);

		that.$tooltip.hide();

		that.styleTooltip();

		if (that.getAttribute('fade')) {
			that.$tooltip.delay(180).fadeIn(200);
		} else {
			that.$tooltip.show();
		}

		return event;
	};

	Simpletooltip.prototype.mouseOut = function (event) {

		var that = event.data.that; // DIRTY

		if (!that.$tooltip.parent().length) {
			return event;
		}

		// TEAK THIS
		if (!that.$tooltip.css('opacity')) {
			that.$tooltip.remove();
			return event;
		}

		if (that.getAttribute('fade')) {
			that.$tooltip.clearQueue().stop().fadeOut(100, function() {
				that.$tooltip.remove();
			});
		} else {
			that.$tooltip.remove();
		}

		return event;
	};

	Simpletooltip.prototype.styleTooltip = function () {

		if (!this.isJqueryObject(this.$el) || !this.isJqueryObject(this.$tooltip) ) {
			return;
		}

		var pos = this.$el.offset(),
			background_color = this.getAttribute('background_color'),
			border_color = this.getAttribute('border_color');

		if (!this.isJqueryObject(this.$arrow)) {
			this.$arrow = this.$tooltip.find(' > .arrow');
		}
		
		var border_width = this.getAttribute('border_width');

		border_width = (!border_color || typeof(border_width) === 'boolean' || border_width === 'none') ? 0 : Number(border_width);
		
		var arrow_color = (!border_width || !border_color) ? background_color : border_color;
		
		var arrow_side_width = Math.round((settings.arrow_width * 3) / 4),
			arrow_position = -parseInt( ((settings.arrow_width * 2) + border_width), 10 ),
			arrow_side_position = -parseInt( ((arrow_side_width * 2) + border_width), 10 );
		
		var tooltip_attributes = {
			maxWidth: this.getAttribute('max_width'),
			backgroundColor: background_color,
			color: this.getAttribute('color'),
			borderColor: border_color,
			borderWidth: border_width
		};
		
		switch (this.getAttribute('position')) {
			case 'top-right':
				pos.top -= parseInt( (this.$tooltip.outerHeight() + this.margins.bottom), 10 );
				pos.left += parseInt( (this.$el.outerWidth() - this.margins.right - this.margins.border), 10 );
				this.$arrow.css({
					left: settings.padding.width - border_width,
					borderWidth: arrow_side_width,
					bottom: arrow_side_position,
					borderTopColor: arrow_color,
					borderLeftColor: arrow_color
				});
				break;
			case 'right-top':
				pos.top -= parseInt( (this.$tooltip.outerHeight() - this.margins.bottom), 10 );
				pos.left += parseInt( (this.$el.outerWidth() + this.margins.right), 10 );
				this.$arrow.css({
					bottom: settings.padding.height - border_width,
					borderWidth: arrow_side_width,
					left: arrow_side_position,
					borderRightColor: arrow_color,
					borderBottomColor: arrow_color
				});
				break;
			case 'right':
				pos.top += parseInt( ((this.$el.outerHeight() - this.$tooltip.outerHeight())/2), 10 );
				pos.left += parseInt( (this.$el.outerWidth() + this.margins.right), 10 );
				this.$arrow.css({
					left: arrow_position,
					borderRightColor: arrow_color,
					marginTop: - settings.arrow_width
				});
				break;
			case 'right-bottom':
				pos.top += parseInt( (this.$el.outerHeight() - this.margins.bottom), 10 );
				pos.left += parseInt( (this.$el.outerWidth() + this.margins.right), 10 );
				this.$arrow.css({
					top: settings.padding.height - border_width,
					borderWidth: arrow_side_width,
					left: arrow_side_position,
					borderRightColor: arrow_color,
					borderTopColor: arrow_color
				});
				break;
			case 'bottom-right':
				pos.top += parseInt( (this.$el.outerHeight() + this.margins.bottom), 10 );
				pos.left += parseInt( (this.$el.outerWidth() - this.margins.right - this.margins.border), 10 );
				this.$arrow.css({
					left: settings.padding.width - border_width,
					borderWidth: arrow_side_width,
					top: arrow_side_position,
					borderBottomColor: arrow_color,
					borderLeftColor: arrow_color
				});
				break;
			case 'bottom':
				pos.top += parseInt( (this.$el.outerHeight() + this.margins.bottom), 10 );
				pos.left += parseInt( ((this.$el.outerWidth()-this.$tooltip.outerWidth())/2), 10 );
				this.$arrow.css({
					top: arrow_position,
					marginLeft: - settings.arrow_width,
					borderBottomColor: arrow_color
				});
				break;
			case 'bottom-left':
				pos.top += parseInt( (this.$el.outerHeight() + this.margins.bottom), 10 );
				pos.left -= parseInt( (this.$tooltip.outerWidth() - this.margins.left - this.margins.border), 10 );
				this.$arrow.css({
					right: settings.padding.width - border_width,
					borderWidth: arrow_side_width,
					top: arrow_side_position,
					borderBottomColor: arrow_color,
					borderRightColor: arrow_color
				});
				break;
			case 'left-bottom':
				pos.top += parseInt( (this.$el.outerHeight() - this.margins.bottom), 10 );
				pos.left -= parseInt( (this.$tooltip.outerWidth() + this.margins.left), 10 );
				this.$arrow.css({
					top: settings.padding.height - border_width,
					borderWidth: arrow_side_width,
					right: arrow_side_position,
					borderLeftColor: arrow_color,
					borderTopColor: arrow_color
				});
				break;
			case 'left':
				pos.top += parseInt(  ((this.$el.outerHeight() - this.$tooltip.outerHeight())/2), 10 ) ;
				pos.left -= parseInt(  (this.$tooltip.outerWidth() + this.margins.left), 10 );
				this.$arrow.css({
					right: arrow_position,
					borderLeftColor: arrow_color,
					marginTop: -settings.arrow_width
				});
				break;
			case 'left-top':
				pos.top -= parseInt( (this.$tooltip.outerHeight() - this.margins.bottom), 10 );
				pos.left -= parseInt( (this.$tooltip.outerWidth() + this.margins.left), 10 );
				this.$arrow.css({
					bottom: settings.padding.height - border_width,
					borderWidth: arrow_side_width,
					right: arrow_side_position,
					borderLeftColor: arrow_color,
					borderBottomColor: arrow_color
				});
				break;
			case 'top-left':
				pos.top -= parseInt( (this.$tooltip.outerHeight() + this.margins.bottom), 10 );
				pos.left -= parseInt( (this.$tooltip.outerWidth() - this.margins.left), 10 );
				this.$arrow.css({
					right: settings.padding.width - border_width,
					borderWidth: arrow_side_width,
					bottom: arrow_side_position,
					borderTopColor: arrow_color,
					borderRightColor: arrow_color
				});
				break;
			// top case
			default:
				pos.top -= parseInt( (this.$tooltip.outerHeight() + this.margins.top), 10 );
				pos.left += parseInt( ((this.$el.outerWidth()-this.$tooltip.outerWidth())/2), 10 );
				this.$arrow.css({
					bottom: arrow_position,
					borderTopColor: arrow_color,
					marginLeft: - settings.arrow_width
				});
		}

		this.$tooltip.css($.extend(tooltip_attributes, {
			top: pos.top,
			left: pos.left
		}));
	};
	//
	//--------- --
	//
	function setSettings (_settings) {

		$body = $('body');

		if (_settings === undefined || typeof(_settings) !== 'object') {
			return;
		}

		settings = $.extend(defaults, _settings);

		if ( settings['themes'] !== undefined  && typeof(settings.themes) === 'object') {
			themes = $.extend(themes, settings.themes);
			delete(settings.themes);
		}

		if (themes[settings.theme] !== undefined) {
			settings = $.extend(settings, themes[settings.theme]);
		}
	}
	//
	//--------- --
	//
	$.simpletooltip = function (_settings) {
		setSettings(_settings);
		$('.simpletooltip').each(function() {
			new Simpletooltip($(this));
			return this;
		});
	};
	//
	$.fn.simpletooltip = function (_settings) {
		setSettings(_settings);
		new Simpletooltip($(this));

		return this;
	};

})(jQuery);