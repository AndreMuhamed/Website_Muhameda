window.addEventListener("DOMContentLoaded", function () {
    var widget1 = new WeatherWidget("#widget1", {
        city: "Harrisburg",
        kind: "sunny",
        time: new Date(2024, 5, 21, 11, 15),
        temperature: 88,
        temperature_scale: "F",
        wind: 5,
        wind_unit: "mph",
        visibility: 22,
        visibility_unit: "mi",
        air_quality: 54,
        humidity: 59
    });
    var widget2 = new WeatherWidget("#widget2", {
        city: "Seattle",
        kind: "cloudy",
        time: new Date(2024, 5, 21, 8, 15),
        temperature: 70,
        temperature_scale: "F",
        wind: 6,
        wind_unit: "mph",
        visibility: 23,
        visibility_unit: "mi",
        air_quality: 41,
        humidity: 47
    });
});
var WeatherWidget = /** @class */ (function () {
    /**
     * @param el CSS selector the widget
     * @param data Weather data
     */
    function WeatherWidget(el, data) {
        var _this = this;
        var _a, _b, _c;
        /** Element is collapsing */
        this.isCollapsing = false;
        /** Element is expanding */
        this.isExpanding = false;
        /** Animation duration and easing */
        this.animParams = {
            duration: 400,
            easing: "cubic-bezier(0.33,1,0.67,1)"
        };
        /** Actions to run after expanding the item. */
        this.animActionsExpand = {
            onfinish: this.onAnimationFinish.bind(this, true),
            oncancel: function () { _this.isExpanding = false; }
        };
        /** Actions to run after collapsing the item. */
        this.animActionsCollapse = {
            onfinish: this.onAnimationFinish.bind(this, false),
            oncancel: function () { _this.isCollapsing = false; }
        };
        /** This widget is expanded to show weather details. */
        this.detailsOpen = true;
        /** Language used for time formatting */
        this.lang = "en-US";
        this.el = document.querySelector(el);
        this.weather = data;
        this.displayWeather();
        this.summary = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector("summary");
        (_b = this.summary) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.toggle.bind(this));
        this.content = (_c = this.summary) === null || _c === void 0 ? void 0 : _c.nextElementSibling;
    }
    /** Display the weather data in the UI. */
    WeatherWidget.prototype.displayWeather = function () {
        var _this = this;
        if (!this.weather)
            return;
        var weatherProps = Object.keys(this.weather).filter(function (key) { return key.indexOf("_unit") < 0; });
        weatherProps.forEach(function (prop) {
            var _a, _b, _c;
            var propEl = (_a = _this.el) === null || _a === void 0 ? void 0 : _a.querySelector("[data-stat=" + prop + "]");
            if (!propEl)
                return;
            var value = (_b = _this.weather) === null || _b === void 0 ? void 0 : _b[prop];
            var unit = "";
            if (prop == "kind") {
                // SVG symbol for the kind of weather
                var kindSymbol = (_c = _this.el) === null || _c === void 0 ? void 0 : _c.querySelector("[data-symbol]");
                kindSymbol === null || kindSymbol === void 0 ? void 0 : kindSymbol.setAttribute("href", "#" + value);
            }
            else if (prop === "time") {
                // `datetime` attribute
                var valueAsDate = value;
                var hourRaw = valueAsDate.getHours();
                var hour = hourRaw < 10 ? "0" + hourRaw : "" + hourRaw;
                var minute = "" + valueAsDate.getMinutes();
                propEl.setAttribute("datetime", hour + ":" + minute);
                // display the hour and minute
                var format = new Intl.DateTimeFormat(_this.lang, {
                    hour: "numeric",
                    minute: "2-digit"
                });
                value = format.format(value);
            }
            else if (prop === "wind") {
                unit = "mph";
            }
            else if (prop === "visibility") {
                unit = "mi";
            }
            if (unit !== "") {
                // attach the unit if applicable
                value += " " + unit;
            }
            propEl.innerText = "" + value;
        });
    };
    /**
     * Open or close the widget.
     * @param e Click event whose default behavior should be prevented
     */
    WeatherWidget.prototype.toggle = function (e) {
        var _a, _b, _c;
        e === null || e === void 0 ? void 0 : e.preventDefault();
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.classList.remove("collapsing", "expanding");
        if (this.isCollapsing || !((_b = this.el) === null || _b === void 0 ? void 0 : _b.open)) {
            this.open();
        }
        else if (this.isExpanding || ((_c = this.el) === null || _c === void 0 ? void 0 : _c.open)) {
            this.collapse();
        }
    };
    /** Open the item and run the animation for expanding. */
    WeatherWidget.prototype.open = function () {
        if (this.el) {
            this.el.style.height = this.el.offsetHeight + "px";
            this.el.open = true;
            this.expand();
        }
    };
    /** Expansion animation */
    WeatherWidget.prototype.expand = function () {
        var _a, _b, _c, _d, _e, _f;
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.classList.add("expanding");
        this.isExpanding = true;
        var startHeight = ((_b = this.el) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
        var summaryHeight = ((_c = this.summary) === null || _c === void 0 ? void 0 : _c.offsetHeight) || 0;
        var contentHeight = ((_d = this.content) === null || _d === void 0 ? void 0 : _d.offsetHeight) || 0;
        var endHeight = summaryHeight + contentHeight;
        (_e = this.animation) === null || _e === void 0 ? void 0 : _e.cancel();
        this.animation = (_f = this.el) === null || _f === void 0 ? void 0 : _f.animate({ height: [startHeight + "px", endHeight + "px"] }, this.animParams);
        if (this.animation) {
            this.animation.onfinish = this.animActionsExpand.onfinish;
            this.animation.oncancel = this.animActionsExpand.oncancel;
        }
    };
    /** Close the item and run the animation for collapsing. */
    WeatherWidget.prototype.collapse = function () {
        var _a, _b, _c, _d, _e;
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.classList.add("collapsing");
        this.isCollapsing = true;
        var startHeight = ((_b = this.el) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
        var endHeight = ((_c = this.summary) === null || _c === void 0 ? void 0 : _c.offsetHeight) || 0;
        (_d = this.animation) === null || _d === void 0 ? void 0 : _d.cancel();
        this.animation = (_e = this.el) === null || _e === void 0 ? void 0 : _e.animate({ height: [startHeight + "px", endHeight + "px"] }, this.animParams);
        if (this.animation) {
            this.animation.onfinish = this.animActionsCollapse.onfinish;
            this.animation.oncancel = this.animActionsCollapse.oncancel;
        }
    };
    /** Actions to run when the animation is finished */
    WeatherWidget.prototype.onAnimationFinish = function (open) {
        if (this.el) {
            this.el.open = open;
            if (this.animation) {
                this.animation = null;
            }
            this.isCollapsing = false;
            this.isExpanding = false;
            this.el.style.height = "";
            this.el.classList.remove("collapsing", "expanding");
        }
    };
    return WeatherWidget;
}());
