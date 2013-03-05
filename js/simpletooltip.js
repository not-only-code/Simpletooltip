/*!
 * SimpleTooltip: show a tooltip in diferents directions from reference
 * carlos.sanz@gmail.com
 * for more info about the plugin please visit: http://github.com/not-only-code/Simpletooltip
**/

(function($) {
	//---- Local debug
	function _debug (msg) {
		if (window.console) {
			console.debug(msg);
		}
	}
	//--------- --
	//
	var defaults = {
			direction: 'top',
			color: '#cccccc',
			background_color: '#222222',
			border_color: '#111111',
			border_width: 2,
			arrow_width: 6,
			padding: {
				width: 8,
				height: 6
			},
			max_width: 200,
			fade: true,
			position:{}
		},
		settings,
		margins = {
			border: 6,
			top: 15,
			right: 15,
			bottom: 15,
			left: 15
		},
		positions = ['top', 'top-right', 'right-top', 'right', 'right-bottom', 'bottom-right', 'bottom', 'bottom-left', 'left-bottom', 'left', 'left-top', 'top-left'],
		titles = [],
		tooltip_tag = '<div id="simple-tooltip-%index" class="simple-tooltip %position">%title<span class="arrow">&nbsp;</span></div>';
	//
	//--------- --
	//
	function get_tooltip_position (element) {
		for (var n=0; n < positions.length; n++) {
			if (element.hasClass(positions[n])) {
				return positions[n];
			}
		}
		return settings.direction;
	}
	//--------- --
	//
	function get_tooltip_tag (_event) {
		var title = titles[_event.data.index],
			tag;

		if (title.length) {

			tag = tooltip_tag.replace('%index', _event.data.index);
			tag = tag.replace('%position', get_tooltip_position($(_event.target)));
			tag = tag.replace('%title', title);

			return tag;
		}
		return false;
	}
	//--------- --
	//
	function mouse_over (_event) {

		var element = $(this),
			tooltip_id = '#simple-tooltip-' + _event.data.index,
			tag = get_tooltip_tag(_event),
			fade = parse_element_data(element, 'fade');

		if (tag) {

			var exist = $('body').find(tooltip_id);

			if (exist.length) {
				_event.preventDefault();
				return false;
			}

			$(tag).appendTo($('body'));
			var tooltip = $('body').find(tooltip_id);
			tooltip.hide();
			style_tooltip(tooltip, element);

			if (fade) {
				tooltip.delay(180).fadeIn(200);
			} else {
				tooltip.show();
			}
		}
		_event.preventDefault();
	}
	//--------- --
	//
	function mouse_out (_event) {
		_event.preventDefault();

		var tooltip = $('body').find('#simple-tooltip-'+_event.data.index),
			fade = parse_element_data($(this), 'fade');
		//
		if (tooltip.length === 0) {
			return false;
		}
		if (tooltip.css('opacity') === 0) {
			tooltip.remove();
			return false;
		}
		if (fade) {
			tooltip.clearQueue().stop().fadeOut(100, function(){
				tooltip.remove();
			});
		} else {
			tooltip.remove();
		}
	}
	//--------- --
	//
	function parse_element_data (element, data_name) {
		var attribute_var = 'simpletooltip-' + data_name.replace('_', '-');

		if (element.data(attribute_var)) {
			return element.data(attribute_var);
		}

		if (settings[data_name]) {
			return settings[data_name];
		}
		return false;
	}
	//--------- --
	//
	function style_tooltip (tooltip, element) {
		var pos = element.offset(),
			arrow = tooltip.find(' > .arrow'),
			background_color = parse_element_data(element, 'background_color'),
			border_color = parse_element_data(element, 'border_color');
		//
		var border_width = parse_element_data(element, 'border_width');
		border_width = (typeof(border_width) === 'boolean' || border_width === 'none') ? 0 : Number(border_width);
		//
		var arrow_color = (!border_width) ? background_color : border_color;
		//
		var arrow_side_width = Math.round((settings.arrow_width * 3) / 4),
			arrow_position = -parseInt( ((settings.arrow_width * 2) + border_width), 10 ),
			arrow_side_position = -parseInt( ((arrow_side_width * 2) + border_width), 10 );
		//
		tooltip.css({
			maxWidth: parse_element_data(element, 'max_width'),
			backgroundColor: background_color,
			color: parse_element_data(element, 'color'),
			borderColor: border_color,
			borderWidth: border_width
		});
		//
		switch (get_tooltip_position(element)) {
			case 'top-right':
				pos.top -= parseInt( (tooltip.outerHeight() + margins.bottom), 10 );
				pos.left += parseInt( (element.outerWidth() - margins.right - margins.border), 10 );
				arrow.css({
					left: settings.padding.width - border_width,
					borderWidth: arrow_side_width,
					bottom: arrow_side_position,
					borderTopColor: arrow_color,
					borderLeftColor: arrow_color
				});
			break;
			case 'right-top':
				pos.top -= parseInt( (tooltip.outerHeight() - margins.bottom), 10 );
				pos.left += parseInt( (element.outerWidth() + margins.right), 10 );
				arrow.css({
					bottom: settings.padding.height - border_width,
					borderWidth: arrow_side_width,
					left: arrow_side_position,
					borderRightColor: arrow_color,
					borderBottomColor: arrow_color
				});
			break;
			case 'right':
				pos.top += parseInt( ((element.outerHeight() - tooltip.outerHeight())/2), 10 );
				pos.left += parseInt( (element.outerWidth() + margins.right), 10 );
				arrow.css({
					left: arrow_position,
					borderRightColor: arrow_color,
					marginTop: - settings.arrow_width
				});
			break;
			case 'right-bottom':
				pos.top += parseInt( (element.outerHeight() - margins.bottom), 10 );
				pos.left += parseInt( (element.outerWidth() + margins.right), 10 );
				arrow.css({
					top: settings.padding.height - border_width,
					borderWidth: arrow_side_width,
					left: arrow_side_position,
					borderRightColor: arrow_color,
					borderTopColor: arrow_color
				});
			break;
			case 'bottom-right':
				pos.top += parseInt( (element.outerHeight() + margins.bottom), 10 );
				pos.left += parseInt( (element.outerWidth() - margins.right - margins.border), 10 );
				arrow.css({
					left: settings.padding.width - border_width,
					borderWidth: arrow_side_width,
					top: arrow_side_position,
					borderBottomColor: arrow_color,
					borderLeftColor: arrow_color
				});
			break;
			case 'bottom':
				pos.top += parseInt( (element.outerHeight() + margins.bottom), 10 );
				pos.left += parseInt( ((element.outerWidth()-tooltip.outerWidth())/2), 10 );
				arrow.css({
					top: arrow_position,
					marginLeft: - settings.arrow_width,
					borderBottomColor: arrow_color
				});

			break;
			case 'bottom-left':
				pos.top += parseInt( (element.outerHeight() + margins.bottom), 10 );
				pos.left -= parseInt( (tooltip.outerWidth() - margins.left - margins.border), 10 );
				arrow.css({
					right: settings.padding.width - border_width,
					borderWidth: arrow_side_width,
					top: arrow_side_position,
					borderBottomColor: arrow_color,
					borderRightColor: arrow_color
				});
			break;
			case 'left-bottom':
				pos.top += parseInt( (element.outerHeight() - margins.bottom), 10 );
				pos.left -= parseInt( (tooltip.outerWidth() + margins.left), 10 );
				arrow.css({
					top: settings.padding.height - border_width,
					borderWidth: arrow_side_width,
					right: arrow_side_position,
					borderLeftColor: arrow_color,
					borderTopColor: arrow_color
				});
			break;
			case 'left':
				pos.top += parseInt(  ((element.outerHeight() - tooltip.outerHeight())/2), 10 ) ;
				pos.left -= parseInt(  (tooltip.outerWidth() + margins.left), 10 );
				arrow.css({
					right: arrow_position,
					borderLeftColor: arrow_color,
					marginTop: -settings.arrow_width
				});
			break;
			case 'left-top':
				pos.top -= parseInt( (tooltip.outerHeight() - margins.bottom), 10 );
				pos.left -= parseInt( (tooltip.outerWidth() + margins.left), 10 );
				arrow.css({
					bottom: settings.padding.height - border_width,
					borderWidth: arrow_side_width,
					right: arrow_side_position,
					borderLeftColor: arrow_color,
					borderBottomColor: arrow_color
				});
			break;
			case 'top-left':
				pos.top -= parseInt( (tooltip.outerHeight() + margins.bottom), 10 );
				pos.left -= parseInt( (tooltip.outerWidth() - margins.left), 10 );
				arrow.css({
					right: settings.padding.width - border_width,
					borderWidth: arrow_side_width,
					bottom: arrow_side_position,
					borderTopColor: arrow_color,
					borderRightColor: arrow_color
				});
			break;
			// top case
			default:
				pos.top -= parseInt( (tooltip.outerHeight() + margins.top), 10 );
				pos.left += parseInt( ((element.outerWidth()-tooltip.outerWidth())/2), 10 );
				arrow.css({
					bottom: arrow_position,
					borderTopColor: arrow_color,
					marginLeft: - settings.arrow_width
				});
		}
		//
		tooltip.css({
			top: pos.top,
			left: pos.left
		});
	}
	//--------- --
	//
	function add_actions () {
		$('.simpletooltip').each(function(index) {
			$(this).css('cursor', 'pointer');

			titles[index] = $(this).attr('title');
			$(this).attr('title', '');

			$(this).on('mouseenter', {index:index}, mouse_over);
			$(this).on('mouseleave', {index:index}, mouse_out);
		});
	}
	//
	//--------- --
	//
	$.simpletooltip = function(_settings) {
		//---
		settings = $.extend(defaults, _settings);
		_debug(settings);
		//---
		add_actions();
	};
})(jQuery);