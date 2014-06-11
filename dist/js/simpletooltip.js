/**
 * Simpletooltip is a JQuery plugin, thought to insert short tooltips to any element of your website more easily
 * v1.3.0
 *
 * 2014 Carlos Sanz Garcia
 * Distributed under GPL-3.0 license
 *
 * http://not-only-code.github.com/Simpletooltip
 */

(function(a) {
    "use strict";
    var b, c = null;
    b = function(a) {
        if (a === undefined || typeof a !== "object") {
            return;
        }
        this.$el = a.$el || null;
        this.$tooltip = null;
        this.$arrow = null;
        this.margins = {
            border: 6,
            top: 15,
            right: 15,
            bottom: 15,
            left: 15
        };
        this.settings = {};
        this.themes = {};
        if (!this.isJqueryObject(this.$el) || this.$el.data().hasOwnProperty("simpletooltipInstanced")) {
            return;
        }
        this.title = this.$el.attr("title");
        if (this.title === undefined || !this.title.length) {
            return;
        }
        this.$el.attr("title", "");
        this.setOptions(a.settings);
        this.setTooltip();
        this.initialize();
        this.$el.data("simpletooltip-instanced", "1");
        return this;
    };
    b.defaults = {
        position: "top",
        color: "#DDDDDD",
        background_color: "#222222",
        border_width: 0,
        arrow_width: 6,
        padding: {
            width: 8,
            height: 6
        },
        max_width: 200,
        fade: true
    };
    b.themes = {
        dark: {
            color: "#CCCCCC",
            background_color: "#222222",
            border_color: "#111111",
            border_width: 4
        },
        gray: {
            color: "#434343",
            background_color: "#DCDCDC",
            border_color: "#BABABA",
            border_width: 4
        },
        white: {
            color: "#6D7988",
            background_color: "#CCDEF2",
            border_color: "#FFFFFF",
            border_width: 4
        },
        blue: {
            color: "#FFFFFF",
            background_color: "#0088BE",
            border_color: "#00669C",
            border_width: 4
        }
    };
    b.templates = {
        tooltip: '<div class="simple-tooltip"></div>',
        arrow: '<span class="arrow">&nbsp;</span>'
    };
    b.prototype.isJqueryObject = function(a) {
        return a !== null && a !== undefined && typeof a === "object" && a.jquery !== undefined;
    };
    b.prototype.setTooltip = function() {
        if (this.isJqueryObject(this.$tooltip) && this.isJqueryObject(this.$arrow)) {
            return;
        }
        this.$tooltip = a(b.templates.tooltip);
        this.$tooltip.html(this.title);
        this.$tooltip.addClass(this.getAttribute("position"));
        this.$arrow = a(b.templates.arrow);
        this.$tooltip.append(this.$arrow);
        return this.$tooltip;
    };
    b.prototype.setOptions = function(c) {
        if (c === undefined || typeof c !== "object") {
            return;
        }
        this.settings = a.extend(b.defaults, c);
        if (this.settings["themes"] !== undefined && typeof this.settings.themes === "object") {
            this.themes = a.extend(b.themes, this.settings.themes);
            delete this.settings.themes;
        }
        if (this.themes[this.settings.theme] !== undefined) {
            this.settings = a.extend(this.settings, this.themes[this.settings.theme]);
        }
    };
    b.prototype.initialize = function() {
        this.$el.on("mouseenter", {
            that: this
        }, this.mouseOver);
        this.$el.on("mouseleave", {
            that: this
        }, this.mouseOut);
        this.$el.attr("title", "");
    };
    b.prototype.getAttribute = function(a) {
        var b = "simpletooltip-" + a.replace("_", "-"), c;
        if (this.$el.data(b) !== undefined) {
            return this.$el.data(b);
        }
        if ((c = this.$el.data("simpletooltip-theme")) !== undefined) {
            if (this.themes[c] !== undefined && this.themes[c][a] !== undefined) {
                return this.themes[c][a];
            }
        }
        if (this.settings[a] !== undefined) {
            return this.settings[a];
        }
        return false;
    };
    b.prototype.mouseOver = function(a) {
        var b = a.data.that;
        if (b.$tooltip.parent().length) {
            return a;
        }
        c.append(b.$tooltip);
        b.$tooltip.hide();
        b.styleTooltip();
        if (b.getAttribute("fade")) {
            b.$tooltip.delay(180).fadeIn(200);
        } else {
            b.$tooltip.show();
        }
        return a;
    };
    b.prototype.mouseOut = function(a) {
        var b = a.data.that;
        if (!b.$tooltip.parent().length) {
            return a;
        }
        if (!b.$tooltip.css("opacity")) {
            b.$tooltip.remove();
            return a;
        }
        if (b.getAttribute("fade")) {
            b.$tooltip.clearQueue().stop().fadeOut(100, function() {
                b.$tooltip.remove();
            });
        } else {
            b.$tooltip.remove();
        }
        return a;
    };
    b.prototype.styleTooltip = function() {
        if (!this.isJqueryObject(this.$el) || !this.isJqueryObject(this.$tooltip)) {
            return;
        }
        var b = this.$el.offset(), c = this.getAttribute("background_color"), d = this.getAttribute("border_color");
        if (!this.isJqueryObject(this.$arrow)) {
            this.$arrow = this.$tooltip.find(" > .arrow");
        }
        var e = this.getAttribute("border_width");
        e = !d || typeof e === "boolean" || e === "none" ? 0 : Number(e);
        var f = !e || !d ? c : d;
        var g = Math.round(this.settings.arrow_width * 3 / 4), h = -parseInt(this.settings.arrow_width * 2 + e, 10), i = -parseInt(g * 2 + e, 10);
        var j = {
            maxWidth: this.getAttribute("max_width"),
            backgroundColor: c,
            color: this.getAttribute("color"),
            borderColor: d,
            borderWidth: e
        };
        switch (this.getAttribute("position")) {
          case "top-right":
            b.top -= parseInt(this.$tooltip.outerHeight() + this.margins.bottom, 10);
            b.left += parseInt(this.$el.outerWidth() - this.margins.right - this.margins.border, 10);
            this.$arrow.css({
                left: this.settings.padding.width - e,
                borderWidth: g,
                bottom: i,
                borderTopColor: f,
                borderLeftColor: f
            });
            break;

          case "right-top":
            b.top -= parseInt(this.$tooltip.outerHeight() - this.margins.bottom, 10);
            b.left += parseInt(this.$el.outerWidth() + this.margins.right, 10);
            this.$arrow.css({
                bottom: this.settings.padding.height - e,
                borderWidth: g,
                left: i,
                borderRightColor: f,
                borderBottomColor: f
            });
            break;

          case "right":
            b.top += parseInt((this.$el.outerHeight() - this.$tooltip.outerHeight()) / 2, 10);
            b.left += parseInt(this.$el.outerWidth() + this.margins.right, 10);
            this.$arrow.css({
                left: h,
                borderRightColor: f,
                marginTop: -this.settings.arrow_width
            });
            break;

          case "right-bottom":
            b.top += parseInt(this.$el.outerHeight() - this.margins.bottom, 10);
            b.left += parseInt(this.$el.outerWidth() + this.margins.right, 10);
            this.$arrow.css({
                top: this.settings.padding.height - e,
                borderWidth: g,
                left: i,
                borderRightColor: f,
                borderTopColor: f
            });
            break;

          case "bottom-right":
            b.top += parseInt(this.$el.outerHeight() + this.margins.bottom, 10);
            b.left += parseInt(this.$el.outerWidth() - this.margins.right - this.margins.border, 10);
            this.$arrow.css({
                left: this.settings.padding.width - e,
                borderWidth: g,
                top: i,
                borderBottomColor: f,
                borderLeftColor: f
            });
            break;

          case "bottom":
            b.top += parseInt(this.$el.outerHeight() + this.margins.bottom, 10);
            b.left += parseInt((this.$el.outerWidth() - this.$tooltip.outerWidth()) / 2, 10);
            this.$arrow.css({
                top: h,
                marginLeft: -this.settings.arrow_width,
                borderBottomColor: f
            });
            break;

          case "bottom-left":
            b.top += parseInt(this.$el.outerHeight() + this.margins.bottom, 10);
            b.left -= parseInt(this.$tooltip.outerWidth() - this.margins.left - this.margins.border, 10);
            this.$arrow.css({
                right: this.settings.padding.width - e,
                borderWidth: g,
                top: i,
                borderBottomColor: f,
                borderRightColor: f
            });
            break;

          case "left-bottom":
            b.top += parseInt(this.$el.outerHeight() - this.margins.bottom, 10);
            b.left -= parseInt(this.$tooltip.outerWidth() + this.margins.left, 10);
            this.$arrow.css({
                top: this.settings.padding.height - e,
                borderWidth: g,
                right: i,
                borderLeftColor: f,
                borderTopColor: f
            });
            break;

          case "left":
            b.top += parseInt((this.$el.outerHeight() - this.$tooltip.outerHeight()) / 2, 10);
            b.left -= parseInt(this.$tooltip.outerWidth() + this.margins.left, 10);
            this.$arrow.css({
                right: h,
                borderLeftColor: f,
                marginTop: -this.settings.arrow_width
            });
            break;

          case "left-top":
            b.top -= parseInt(this.$tooltip.outerHeight() - this.margins.bottom, 10);
            b.left -= parseInt(this.$tooltip.outerWidth() + this.margins.left, 10);
            this.$arrow.css({
                bottom: this.settings.padding.height - e,
                borderWidth: g,
                right: i,
                borderLeftColor: f,
                borderBottomColor: f
            });
            break;

          case "top-left":
            b.top -= parseInt(this.$tooltip.outerHeight() + this.margins.bottom, 10);
            b.left -= parseInt(this.$tooltip.outerWidth() - this.margins.left, 10);
            this.$arrow.css({
                right: this.settings.padding.width - e,
                borderWidth: g,
                bottom: i,
                borderTopColor: f,
                borderRightColor: f
            });
            break;

          default:
            b.top -= parseInt(this.$tooltip.outerHeight() + this.margins.top, 10);
            b.left += parseInt((this.$el.outerWidth() - this.$tooltip.outerWidth()) / 2, 10);
            this.$arrow.css({
                bottom: h,
                borderTopColor: f,
                marginLeft: -this.settings.arrow_width
            });
        }
        this.$tooltip.css(a.extend(j, {
            top: b.top,
            left: b.left
        }));
    };
    a.fn.simpletooltip = function(c) {
        return this.each(function() {
            var d = a(this);
            if (!d.data().hasOwnProperty("simpletooltipInstanced")) {
                var e = {
                    $el: d
                };
                if (c !== undefined && typeof c === "object") {
                    e.settings = c;
                }
                new b(e);
            }
        });
    };
    a(window).on("load", function() {
        c = a("body");
        a('[data-simpletooltip="init"]').each(function() {
            a(this).simpletooltip();
        });
    });
})(jQuery);