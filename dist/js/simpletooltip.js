/**
 * Simpletooltip is a JQuery plugin, thought to insert short tooltips to any element of your website more easily
 * v1.3.0
 *
 * 2014 Carlos Sanz Garcia
 * Distributed under MIT license
 *
 * http://not-only-code.github.com/Simpletooltip
 */

(function(a) {
    var b = {
        direction: "top",
        color: "#cccccc",
        background_color: "#222222",
        border_color: "#111111",
        border_width: 2,
        arrow_width: 6,
        padding: {
            width: 8,
            height: 6
        },
        max_width: 200,
        fade: true,
        position: {}
    }, c, d = {
        border: 6,
        top: 15,
        right: 15,
        bottom: 15,
        left: 15
    }, e = [ "top", "top-right", "right-top", "right", "right-bottom", "bottom-right", "bottom", "bottom-left", "left-bottom", "left", "left-top", "top-left" ], f = [], g = '<div id="simple-tooltip-%index" class="simple-tooltip %position">%title<span class="arrow">&nbsp;</span></div>';
    function h(a) {
        for (var b = 0; b < e.length; b++) {
            if (a.hasClass(e[b])) {
                return e[b];
            }
        }
        return c.direction;
    }
    function i(b) {
        var c = f[b.data.index], d;
        if (c.length) {
            d = g.replace("%index", b.data.index);
            d = d.replace("%position", h(a(b.target)));
            d = d.replace("%title", c);
            return d;
        }
        return false;
    }
    function j(b) {
        var c = a(this), d = "#simple-tooltip-" + b.data.index, e = i(b), f = l(c, "fade");
        if (e) {
            var g = a("body").find(d);
            if (g.length) {
                b.preventDefault();
                return false;
            }
            a(e).appendTo(a("body"));
            var h = a("body").find(d);
            h.hide();
            m(h, c);
            if (f) {
                h.delay(180).fadeIn(200);
            } else {
                h.show();
            }
        }
        b.preventDefault();
    }
    function k(b) {
        b.preventDefault();
        var c = a("body").find("#simple-tooltip-" + b.data.index), d = l(a(this), "fade");
        if (c.length === 0) {
            return false;
        }
        if (c.css("opacity") === 0) {
            c.remove();
            return false;
        }
        if (d) {
            c.clearQueue().stop().fadeOut(100, function() {
                c.remove();
            });
        } else {
            c.remove();
        }
    }
    function l(a, b) {
        var d = "simpletooltip-" + b.replace("_", "-");
        if (a.data(d)) {
            return a.data(d);
        }
        if (c[b]) {
            return c[b];
        }
        return false;
    }
    function m(a, b) {
        var e = b.offset(), f = a.find(" > .arrow"), g = l(b, "background_color"), i = l(b, "border_color");
        var j = l(b, "border_width");
        j = typeof j === "boolean" || j === "none" ? 0 : Number(j);
        var k = !j ? g : i;
        var m = Math.round(c.arrow_width * 3 / 4), n = -parseInt(c.arrow_width * 2 + j, 10), o = -parseInt(m * 2 + j, 10);
        a.css({
            maxWidth: l(b, "max_width"),
            backgroundColor: g,
            color: l(b, "color"),
            borderColor: i,
            borderWidth: j
        });
        switch (h(b)) {
          case "top-right":
            e.top -= parseInt(a.outerHeight() + d.bottom, 10);
            e.left += parseInt(b.outerWidth() - d.right - d.border, 10);
            f.css({
                left: c.padding.width - j,
                borderWidth: m,
                bottom: o,
                borderTopColor: k,
                borderLeftColor: k
            });
            break;

          case "right-top":
            e.top -= parseInt(a.outerHeight() - d.bottom, 10);
            e.left += parseInt(b.outerWidth() + d.right, 10);
            f.css({
                bottom: c.padding.height - j,
                borderWidth: m,
                left: o,
                borderRightColor: k,
                borderBottomColor: k
            });
            break;

          case "right":
            e.top += parseInt((b.outerHeight() - a.outerHeight()) / 2, 10);
            e.left += parseInt(b.outerWidth() + d.right, 10);
            f.css({
                left: n,
                borderRightColor: k,
                marginTop: -c.arrow_width
            });
            break;

          case "right-bottom":
            e.top += parseInt(b.outerHeight() - d.bottom, 10);
            e.left += parseInt(b.outerWidth() + d.right, 10);
            f.css({
                top: c.padding.height - j,
                borderWidth: m,
                left: o,
                borderRightColor: k,
                borderTopColor: k
            });
            break;

          case "bottom-right":
            e.top += parseInt(b.outerHeight() + d.bottom, 10);
            e.left += parseInt(b.outerWidth() - d.right - d.border, 10);
            f.css({
                left: c.padding.width - j,
                borderWidth: m,
                top: o,
                borderBottomColor: k,
                borderLeftColor: k
            });
            break;

          case "bottom":
            e.top += parseInt(b.outerHeight() + d.bottom, 10);
            e.left += parseInt((b.outerWidth() - a.outerWidth()) / 2, 10);
            f.css({
                top: n,
                marginLeft: -c.arrow_width,
                borderBottomColor: k
            });
            break;

          case "bottom-left":
            e.top += parseInt(b.outerHeight() + d.bottom, 10);
            e.left -= parseInt(a.outerWidth() - d.left - d.border, 10);
            f.css({
                right: c.padding.width - j,
                borderWidth: m,
                top: o,
                borderBottomColor: k,
                borderRightColor: k
            });
            break;

          case "left-bottom":
            e.top += parseInt(b.outerHeight() - d.bottom, 10);
            e.left -= parseInt(a.outerWidth() + d.left, 10);
            f.css({
                top: c.padding.height - j,
                borderWidth: m,
                right: o,
                borderLeftColor: k,
                borderTopColor: k
            });
            break;

          case "left":
            e.top += parseInt((b.outerHeight() - a.outerHeight()) / 2, 10);
            e.left -= parseInt(a.outerWidth() + d.left, 10);
            f.css({
                right: n,
                borderLeftColor: k,
                marginTop: -c.arrow_width
            });
            break;

          case "left-top":
            e.top -= parseInt(a.outerHeight() - d.bottom, 10);
            e.left -= parseInt(a.outerWidth() + d.left, 10);
            f.css({
                bottom: c.padding.height - j,
                borderWidth: m,
                right: o,
                borderLeftColor: k,
                borderBottomColor: k
            });
            break;

          case "top-left":
            e.top -= parseInt(a.outerHeight() + d.bottom, 10);
            e.left -= parseInt(a.outerWidth() - d.left, 10);
            f.css({
                right: c.padding.width - j,
                borderWidth: m,
                bottom: o,
                borderTopColor: k,
                borderRightColor: k
            });
            break;

          default:
            e.top -= parseInt(a.outerHeight() + d.top, 10);
            e.left += parseInt((b.outerWidth() - a.outerWidth()) / 2, 10);
            f.css({
                bottom: n,
                borderTopColor: k,
                marginLeft: -c.arrow_width
            });
        }
        a.css({
            top: e.top,
            left: e.left
        });
    }
    function n() {
        a(".simpletooltip").each(function(b) {
            var c = a(this);
            c.css("cursor", "pointer");
            f[b] = c.attr("title");
            c.attr("title", "");
            c.on("mouseenter", {
                index: b
            }, j);
            c.on("mouseleave", {
                index: b
            }, k);
        });
    }
    a.simpletooltip = function(d) {
        c = a.extend(b, d);
        n();
    };
})(jQuery);