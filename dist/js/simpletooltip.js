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
    var b = null, c = {
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
    }, d = {
        position: "top",
        theme: "dark",
        border_width: 2,
        arrow_width: 6,
        padding: {
            width: 8,
            height: 6
        },
        max_width: 200,
        fade: true
    }, e, f = {
        border: 6,
        top: 15,
        right: 15,
        bottom: 15,
        left: 15
    }, g = [], h = '<div id="simple-tooltip-%index" class="simple-tooltip %position">%title</div>', i = '<span class="arrow">&nbsp;</span>';
    function j(a, b) {
        var d = "simpletooltip-" + b.replace("_", "-"), f;
        if (a.data(d)) {
            return a.data(d);
        }
        if (f = a.data("simpletooltip-theme")) {
            if (c[f] && c[f][b]) {
                return c[f][b];
            }
        }
        if (e[b]) {
            return e[b];
        }
        return false;
    }
    function k(b) {
        var c = g[b.data.index], d, e, f;
        if (c.length) {
            d = h.replace("%index", b.data.index);
            d = d.replace("%title", c);
            d = d.replace("%position", j(a(b.currentTarget), "position"));
            e = a(d);
            f = a(i);
            e.append(f);
            e.$arrow = f;
            return e;
        }
        return false;
    }
    function l(c) {
        var d = a(this), e;
        if (!(e = d.data("$simpletooltip"))) {
            e = k(c);
            d.data("$simpletooltip", e);
        }
        if (!e) {
            return c;
        }
        if (b.find("#" + e.attr("id")).length) {
            return c;
        }
        b.append(e);
        e.hide();
        n(d);
        if (j(d, "fade")) {
            e.delay(180).fadeIn(200);
        } else {
            e.show();
        }
        return c;
    }
    function m(c) {
        var d = a(this), e;
        if (!(e = d.data("$simpletooltip"))) {
            return c;
        }
        if (!b.find("#" + e.attr("id").length)) {
            return c;
        }
        if (!e.css("opacity")) {
            e.remove();
            return c;
        }
        if (j(d, "fade")) {
            e.clearQueue().stop().fadeOut(100, function() {
                e.remove();
            });
        } else {
            e.remove();
        }
        return c;
    }
    function n(b) {
        if (!b.data("$simpletooltip")) {
            return;
        }
        var c = b.data("$simpletooltip"), d = b.offset(), g = c.$arrow ? c.$arrow : c.find(" > .arrow"), h = j(b, "background_color"), i = j(b, "border_color");
        var k = j(b, "border_width");
        k = typeof k === "boolean" || k === "none" ? 0 : Number(k);
        var l = !k ? h : i;
        var m = Math.round(e.arrow_width * 3 / 4), n = -parseInt(e.arrow_width * 2 + k, 10), o = -parseInt(m * 2 + k, 10);
        var p = {
            maxWidth: j(b, "max_width"),
            backgroundColor: h,
            color: j(b, "color"),
            borderColor: i,
            borderWidth: k
        };
        switch (j(b, "position")) {
          case "top-right":
            d.top -= parseInt(c.outerHeight() + f.bottom, 10);
            d.left += parseInt(b.outerWidth() - f.right - f.border, 10);
            g.css({
                left: e.padding.width - k,
                borderWidth: m,
                bottom: o,
                borderTopColor: l,
                borderLeftColor: l
            });
            break;

          case "right-top":
            d.top -= parseInt(c.outerHeight() - f.bottom, 10);
            d.left += parseInt(b.outerWidth() + f.right, 10);
            g.css({
                bottom: e.padding.height - k,
                borderWidth: m,
                left: o,
                borderRightColor: l,
                borderBottomColor: l
            });
            break;

          case "right":
            d.top += parseInt((b.outerHeight() - c.outerHeight()) / 2, 10);
            d.left += parseInt(b.outerWidth() + f.right, 10);
            g.css({
                left: n,
                borderRightColor: l,
                marginTop: -e.arrow_width
            });
            break;

          case "right-bottom":
            d.top += parseInt(b.outerHeight() - f.bottom, 10);
            d.left += parseInt(b.outerWidth() + f.right, 10);
            g.css({
                top: e.padding.height - k,
                borderWidth: m,
                left: o,
                borderRightColor: l,
                borderTopColor: l
            });
            break;

          case "bottom-right":
            d.top += parseInt(b.outerHeight() + f.bottom, 10);
            d.left += parseInt(b.outerWidth() - f.right - f.border, 10);
            g.css({
                left: e.padding.width - k,
                borderWidth: m,
                top: o,
                borderBottomColor: l,
                borderLeftColor: l
            });
            break;

          case "bottom":
            d.top += parseInt(b.outerHeight() + f.bottom, 10);
            d.left += parseInt((b.outerWidth() - c.outerWidth()) / 2, 10);
            g.css({
                top: n,
                marginLeft: -e.arrow_width,
                borderBottomColor: l
            });
            break;

          case "bottom-left":
            d.top += parseInt(b.outerHeight() + f.bottom, 10);
            d.left -= parseInt(c.outerWidth() - f.left - f.border, 10);
            g.css({
                right: e.padding.width - k,
                borderWidth: m,
                top: o,
                borderBottomColor: l,
                borderRightColor: l
            });
            break;

          case "left-bottom":
            d.top += parseInt(b.outerHeight() - f.bottom, 10);
            d.left -= parseInt(c.outerWidth() + f.left, 10);
            g.css({
                top: e.padding.height - k,
                borderWidth: m,
                right: o,
                borderLeftColor: l,
                borderTopColor: l
            });
            break;

          case "left":
            d.top += parseInt((b.outerHeight() - c.outerHeight()) / 2, 10);
            d.left -= parseInt(c.outerWidth() + f.left, 10);
            g.css({
                right: n,
                borderLeftColor: l,
                marginTop: -e.arrow_width
            });
            break;

          case "left-top":
            d.top -= parseInt(c.outerHeight() - f.bottom, 10);
            d.left -= parseInt(c.outerWidth() + f.left, 10);
            g.css({
                bottom: e.padding.height - k,
                borderWidth: m,
                right: o,
                borderLeftColor: l,
                borderBottomColor: l
            });
            break;

          case "top-left":
            d.top -= parseInt(c.outerHeight() + f.bottom, 10);
            d.left -= parseInt(c.outerWidth() - f.left, 10);
            g.css({
                right: e.padding.width - k,
                borderWidth: m,
                bottom: o,
                borderTopColor: l,
                borderRightColor: l
            });
            break;

          default:
            d.top -= parseInt(c.outerHeight() + f.top, 10);
            d.left += parseInt((b.outerWidth() - c.outerWidth()) / 2, 10);
            g.css({
                bottom: n,
                borderTopColor: l,
                marginLeft: -e.arrow_width
            });
        }
        p = a.extend(p, {
            top: d.top,
            left: d.left
        });
        c.css(p);
    }
    function o(f) {
        b = a("body");
        e = a.extend(d, f);
        var g = c[e.theme];
        if (g !== "undefined") {
            e = a.extend(e, g);
        }
    }
    function p() {
        a(".simpletooltip").each(function(b) {
            var c = a(this);
            c.css("cursor", "pointer");
            g[b] = c.attr("title");
            c.attr("title", "");
            c.on("mouseenter", {
                index: b
            }, l);
            c.on("mouseleave", {
                index: b
            }, m);
        });
    }
    a.simpletooltip = function(a) {
        o(a);
        p();
    };
})(jQuery);