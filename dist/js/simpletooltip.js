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
    var b, c = null, d = {
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
    }, e = {
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
    }, f;
    b = function(a) {
        this.$el = a || null;
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
        if (!g(this.$el) || this.$el.data().hasOwnProperty("simpletooltipInstanced")) {
            return;
        }
        this.title = this.$el.attr("title");
        if (this.title === undefined || !this.title.length) {
            return;
        }
        this.$el.attr("title", "");
        this.setTooltip();
        this.initialize();
        this.$el.data("simpletooltip-instanced", "1");
        return this;
    };
    b.prototype.setTooltip = function() {
        if (g(this.$tooltip) && g(this.$arrow)) {
            return;
        }
        this.$tooltip = a(this.templates.tooltip);
        this.$tooltip.html(this.title);
        this.$tooltip.addClass(this.getAttribute("position"));
        this.$arrow = a(this.templates.arrow);
        this.$tooltip.append(this.$arrow);
        return this.$tooltip;
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
            if (d[c] !== undefined && d[c][a] !== undefined) {
                return d[c][a];
            }
        }
        if (f[a] !== undefined) {
            return f[a];
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
        if (!g(this.$el) || !g(this.$tooltip)) {
            return;
        }
        var b = this.$el.offset(), c = this.getAttribute("background_color"), d = this.getAttribute("border_color");
        if (!g(this.$arrow)) {
            this.$arrow = this.$tooltip.find(" > .arrow");
        }
        var e = this.getAttribute("border_width");
        e = !d || typeof e === "boolean" || e === "none" ? 0 : Number(e);
        var h = !e || !d ? c : d;
        var i = Math.round(f.arrow_width * 3 / 4), j = -parseInt(f.arrow_width * 2 + e, 10), k = -parseInt(i * 2 + e, 10);
        var l = {
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
                left: f.padding.width - e,
                borderWidth: i,
                bottom: k,
                borderTopColor: h,
                borderLeftColor: h
            });
            break;

          case "right-top":
            b.top -= parseInt(this.$tooltip.outerHeight() - this.margins.bottom, 10);
            b.left += parseInt(this.$el.outerWidth() + this.margins.right, 10);
            this.$arrow.css({
                bottom: f.padding.height - e,
                borderWidth: i,
                left: k,
                borderRightColor: h,
                borderBottomColor: h
            });
            break;

          case "right":
            b.top += parseInt((this.$el.outerHeight() - this.$tooltip.outerHeight()) / 2, 10);
            b.left += parseInt(this.$el.outerWidth() + this.margins.right, 10);
            this.$arrow.css({
                left: j,
                borderRightColor: h,
                marginTop: -f.arrow_width
            });
            break;

          case "right-bottom":
            b.top += parseInt(this.$el.outerHeight() - this.margins.bottom, 10);
            b.left += parseInt(this.$el.outerWidth() + this.margins.right, 10);
            this.$arrow.css({
                top: f.padding.height - e,
                borderWidth: i,
                left: k,
                borderRightColor: h,
                borderTopColor: h
            });
            break;

          case "bottom-right":
            b.top += parseInt(this.$el.outerHeight() + this.margins.bottom, 10);
            b.left += parseInt(this.$el.outerWidth() - this.margins.right - this.margins.border, 10);
            this.$arrow.css({
                left: f.padding.width - e,
                borderWidth: i,
                top: k,
                borderBottomColor: h,
                borderLeftColor: h
            });
            break;

          case "bottom":
            b.top += parseInt(this.$el.outerHeight() + this.margins.bottom, 10);
            b.left += parseInt((this.$el.outerWidth() - this.$tooltip.outerWidth()) / 2, 10);
            this.$arrow.css({
                top: j,
                marginLeft: -f.arrow_width,
                borderBottomColor: h
            });
            break;

          case "bottom-left":
            b.top += parseInt(this.$el.outerHeight() + this.margins.bottom, 10);
            b.left -= parseInt(this.$tooltip.outerWidth() - this.margins.left - this.margins.border, 10);
            this.$arrow.css({
                right: f.padding.width - e,
                borderWidth: i,
                top: k,
                borderBottomColor: h,
                borderRightColor: h
            });
            break;

          case "left-bottom":
            b.top += parseInt(this.$el.outerHeight() - this.margins.bottom, 10);
            b.left -= parseInt(this.$tooltip.outerWidth() + this.margins.left, 10);
            this.$arrow.css({
                top: f.padding.height - e,
                borderWidth: i,
                right: k,
                borderLeftColor: h,
                borderTopColor: h
            });
            break;

          case "left":
            b.top += parseInt((this.$el.outerHeight() - this.$tooltip.outerHeight()) / 2, 10);
            b.left -= parseInt(this.$tooltip.outerWidth() + this.margins.left, 10);
            this.$arrow.css({
                right: j,
                borderLeftColor: h,
                marginTop: -f.arrow_width
            });
            break;

          case "left-top":
            b.top -= parseInt(this.$tooltip.outerHeight() - this.margins.bottom, 10);
            b.left -= parseInt(this.$tooltip.outerWidth() + this.margins.left, 10);
            this.$arrow.css({
                bottom: f.padding.height - e,
                borderWidth: i,
                right: k,
                borderLeftColor: h,
                borderBottomColor: h
            });
            break;

          case "top-left":
            b.top -= parseInt(this.$tooltip.outerHeight() + this.margins.bottom, 10);
            b.left -= parseInt(this.$tooltip.outerWidth() - this.margins.left, 10);
            this.$arrow.css({
                right: f.padding.width - e,
                borderWidth: i,
                bottom: k,
                borderTopColor: h,
                borderRightColor: h
            });
            break;

          default:
            b.top -= parseInt(this.$tooltip.outerHeight() + this.margins.top, 10);
            b.left += parseInt((this.$el.outerWidth() - this.$tooltip.outerWidth()) / 2, 10);
            this.$arrow.css({
                bottom: j,
                borderTopColor: h,
                marginLeft: -f.arrow_width
            });
        }
        this.$tooltip.css(a.extend(l, {
            top: b.top,
            left: b.left
        }));
    };
    function g(a) {
        return a !== null && a !== undefined && typeof a === "object" && a.jquery !== undefined ? true : false;
    }
    function h(b) {
        c = a("body");
        if (b === undefined || typeof b !== "object") {
            return;
        }
        f = a.extend(e, b);
        if (f["themes"] !== undefined && typeof f.themes === "object") {
            d = a.extend(d, f.themes);
            delete f.themes;
        }
        if (d[f.theme] !== undefined) {
            f = a.extend(f, d[f.theme]);
        }
    }
    a.fn.simpletooltip = function(c) {
        h(c);
        return this.each(function() {
            var c = a(this);
            if (!c.data().hasOwnProperty("simpletooltipInstanced")) {
                new b(c);
            }
        });
    };
    a(window).on("load", function() {
        a('[data-simpletooltip="init"]').each(function() {
            a(this).simpletooltip();
        });
    });
})(jQuery);