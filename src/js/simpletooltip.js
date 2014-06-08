(function($) {
	var $body = null,
		themes = {
			dark: {
				color: '#CCCCCC',
				background_color: '#222222',
				border_color: '#111111',
				border_width: 4
			},
			gray: {
				color: '#434343',
				background_color: '#DCDCDC',
				border_color: '#BABABA',
				border_width: 4
			},
			white: {
				color: '#6D7988',
				background_color: '#CCDEF2',
				border_color: '#FFFFFF',
				border_width: 4
			},
			blue: {
				color: '#FFFFFF',
				background_color: '#0088BE',
				border_color: '#00669C',
				border_width: 4
			}
		},
		defaults = {
			position: 'top',
			theme: 'dark',
			border_width: 2,
			arrow_width: 6,
			padding: {
				width: 8,
				height: 6
			},
			max_width: 200,
			fade: true,
		},
		settings,
		margins = {
			border: 6,
			top: 15,
			right: 15,
			bottom: 15,
			left: 15
		},
		titles = [],
		tooltip_template = '<div id="simple-tooltip-%index" class="simple-tooltip %position">%title</div>',
		arrow_template = '<span class="arrow">&nbsp;</span>';
	//
	//--------- --
	//
	function getAttribute ($element, attribute_name) {

		var attribute = 'simpletooltip-' + attribute_name.replace('_', '-'),
			theme;

		if ($element.data(attribute)) {
			return $element.data(attribute);
		}

		if (theme = $element.data('simpletooltip-theme')) {
			if (themes[theme] && themes[theme][attribute_name]) {
				return themes[theme][attribute_name];
			}
		}

		if (settings[attribute_name]) {
			return settings[attribute_name];
		}

		return false;
	}
	//--------- --
	//
	function getTemplate (event) {
		var title = titles[event.data.index], tag, $tag, $arrow;

		if (title.length) {
			tag = tooltip_template.replace('%index', event.data.index);
			tag = tag.replace('%title', title);
			tag = tag.replace('%position', getAttribute($(event.currentTarget), 'position'));

			$tag = $(tag);
			$arrow = $(arrow_template);

			$tag.append($arrow);

			$tag.$arrow = $arrow;

			return $tag;
		}
		return false;
	}
	//--------- --
	//
	function mouseOver (event) {

		var $element = $(this), $tooltip;

		if ( !($tooltip = $element.data('$simpletooltip')) ) {
			$tooltip = getTemplate(event);
			$element.data('$simpletooltip', $tooltip);
		}

		if (!$tooltip) {
			return event;
		}

		// change this for something like $body.has()
		if ($body.find('#' + $tooltip.attr('id')).length) {
			return event;
		}

		$body.append($tooltip);

		$tooltip.hide();
		styleTooltip($element);

		if (getAttribute($element, 'fade')) {
			$tooltip.delay(180).fadeIn(200);
		} else {
			$tooltip.show();
		}

		return event;
	}
	//--------- --
	//
	function mouseOut (event) {

		var $element = $(this), $tooltip;
		
		if ( !($tooltip = $element.data('$simpletooltip')) ) {
			return event;
		}

		if (!$body.find('#' + $tooltip.attr('id').length)) {
			return event;
		}

		if (!$tooltip.css('opacity')) {
			$tooltip.remove();
			return event;
		}
		if (getAttribute($element, 'fade')) {
			$tooltip.clearQueue().stop().fadeOut(100, function() {
				$tooltip.remove();
			});
		} else {
			$tooltip.remove();
		}

		return event;
	}
	//--------- --
	//
	function styleTooltip ($element) {

		if (!$element.data('$simpletooltip')) {
			return;
		}

		var $tooltip = $element.data('$simpletooltip'),
			pos = $element.offset(),
			$arrow = ($tooltip.$arrow) ? $tooltip.$arrow : $tooltip.find(' > .arrow'),
			background_color = getAttribute($element, 'background_color'),
			border_color = getAttribute($element, 'border_color');
		
		var border_width = getAttribute($element, 'border_width');
		border_width = (typeof(border_width) === 'boolean' || border_width === 'none') ? 0 : Number(border_width);
		
		var arrow_color = (!border_width) ? background_color : border_color;
		
		var arrow_side_width = Math.round((settings.arrow_width * 3) / 4),
			arrow_position = -parseInt( ((settings.arrow_width * 2) + border_width), 10 ),
			arrow_side_position = -parseInt( ((arrow_side_width * 2) + border_width), 10 );
		
		var tooltip_attributes = {
			maxWidth: getAttribute($element, 'max_width'),
			backgroundColor: background_color,
			color: getAttribute($element, 'color'),
			borderColor: border_color,
			borderWidth: border_width
		};
		
		switch (getAttribute($element, 'position')) {
			case 'top-right':
				pos.top -= parseInt( ($tooltip.outerHeight() + margins.bottom), 10 );
				pos.left += parseInt( ($element.outerWidth() - margins.right - margins.border), 10 );
				$arrow.css({
					left: settings.padding.width - border_width,
					borderWidth: arrow_side_width,
					bottom: arrow_side_position,
					borderTopColor: arrow_color,
					borderLeftColor: arrow_color
				});
				break;
			case 'right-top':
				pos.top -= parseInt( ($tooltip.outerHeight() - margins.bottom), 10 );
				pos.left += parseInt( ($element.outerWidth() + margins.right), 10 );
				$arrow.css({
					bottom: settings.padding.height - border_width,
					borderWidth: arrow_side_width,
					left: arrow_side_position,
					borderRightColor: arrow_color,
					borderBottomColor: arrow_color
				});
				break;
			case 'right':
				pos.top += parseInt( (($element.outerHeight() - $tooltip.outerHeight())/2), 10 );
				pos.left += parseInt( ($element.outerWidth() + margins.right), 10 );
				$arrow.css({
					left: arrow_position,
					borderRightColor: arrow_color,
					marginTop: - settings.arrow_width
				});
				break;
			case 'right-bottom':
				pos.top += parseInt( ($element.outerHeight() - margins.bottom), 10 );
				pos.left += parseInt( ($element.outerWidth() + margins.right), 10 );
				$arrow.css({
					top: settings.padding.height - border_width,
					borderWidth: arrow_side_width,
					left: arrow_side_position,
					borderRightColor: arrow_color,
					borderTopColor: arrow_color
				});
				break;
			case 'bottom-right':
				pos.top += parseInt( ($element.outerHeight() + margins.bottom), 10 );
				pos.left += parseInt( ($element.outerWidth() - margins.right - margins.border), 10 );
				$arrow.css({
					left: settings.padding.width - border_width,
					borderWidth: arrow_side_width,
					top: arrow_side_position,
					borderBottomColor: arrow_color,
					borderLeftColor: arrow_color
				});
				break;
			case 'bottom':
				pos.top += parseInt( ($element.outerHeight() + margins.bottom), 10 );
				pos.left += parseInt( (($element.outerWidth()-$tooltip.outerWidth())/2), 10 );
				$arrow.css({
					top: arrow_position,
					marginLeft: - settings.arrow_width,
					borderBottomColor: arrow_color
				});
				break;
			case 'bottom-left':
				pos.top += parseInt( ($element.outerHeight() + margins.bottom), 10 );
				pos.left -= parseInt( ($tooltip.outerWidth() - margins.left - margins.border), 10 );
				$arrow.css({
					right: settings.padding.width - border_width,
					borderWidth: arrow_side_width,
					top: arrow_side_position,
					borderBottomColor: arrow_color,
					borderRightColor: arrow_color
				});
				break;
			case 'left-bottom':
				pos.top += parseInt( ($element.outerHeight() - margins.bottom), 10 );
				pos.left -= parseInt( ($tooltip.outerWidth() + margins.left), 10 );
				$arrow.css({
					top: settings.padding.height - border_width,
					borderWidth: arrow_side_width,
					right: arrow_side_position,
					borderLeftColor: arrow_color,
					borderTopColor: arrow_color
				});
				break;
			case 'left':
				pos.top += parseInt(  (($element.outerHeight() - $tooltip.outerHeight())/2), 10 ) ;
				pos.left -= parseInt(  ($tooltip.outerWidth() + margins.left), 10 );
				$arrow.css({
					right: arrow_position,
					borderLeftColor: arrow_color,
					marginTop: -settings.arrow_width
				});
				break;
			case 'left-top':
				pos.top -= parseInt( ($tooltip.outerHeight() - margins.bottom), 10 );
				pos.left -= parseInt( ($tooltip.outerWidth() + margins.left), 10 );
				$arrow.css({
					bottom: settings.padding.height - border_width,
					borderWidth: arrow_side_width,
					right: arrow_side_position,
					borderLeftColor: arrow_color,
					borderBottomColor: arrow_color
				});
				break;
			case 'top-left':
				pos.top -= parseInt( ($tooltip.outerHeight() + margins.bottom), 10 );
				pos.left -= parseInt( ($tooltip.outerWidth() - margins.left), 10 );
				$arrow.css({
					right: settings.padding.width - border_width,
					borderWidth: arrow_side_width,
					bottom: arrow_side_position,
					borderTopColor: arrow_color,
					borderRightColor: arrow_color
				});
				break;
			// top case
			default:
				pos.top -= parseInt( ($tooltip.outerHeight() + margins.top), 10 );
				pos.left += parseInt( (($element.outerWidth()-$tooltip.outerWidth())/2), 10 );
				$arrow.css({
					bottom: arrow_position,
					borderTopColor: arrow_color,
					marginLeft: - settings.arrow_width
				});
		}
		
		tooltip_attributes = $.extend(tooltip_attributes, {
			top: pos.top,
			left: pos.left
		});

		$tooltip.css(tooltip_attributes);
	}
	//--------- --
	//
	function setSettings (_settings) {

		$body = $('body');

		settings = $.extend(defaults, _settings);

		var theme = themes[settings.theme];
		if (theme !== 'undefined') {
			settings = $.extend(settings, theme);
		}
	}
	//--------- --
	//
	function addActions () {
		$('.simpletooltip').each(function(index) {
			var $this = $(this);
			$this.css('cursor', 'pointer');

			titles[index] = $this.attr('title');
			$this.attr('title', '');

			$this.on('mouseenter', {index:index}, mouseOver);
			$this.on('mouseleave', {index:index}, mouseOut);
		});
	}
	//
	//--------- --
	//
	$.simpletooltip = function(_settings) {
		setSettings(_settings);
		addActions();
	};
})(jQuery);