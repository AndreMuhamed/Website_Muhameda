window.addEventListener("DOMContentLoaded",() => {
	const widget1 = new WeatherWidget("#widget1", {
		city: "Harrisburg",
		kind: "sunny",
		time: new Date(2024,5,21,11,15),
		temperature: 88,
		temperature_scale: "F",
		wind: 5,
		wind_unit: "mph",
		visibility: 22,
		visibility_unit: "mi",
		air_quality: 54,
		humidity: 59
	});
	const widget2 = new WeatherWidget("#widget2", {
		city: "Seattle",
		kind: "cloudy",
		time: new Date(2024,5,21,8,15),
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

class WeatherWidget {
	/** `<details>` used for this widget */
	el: HTMLDetailsElement | null;
	/** `<summary>` of the `<details>` */
	summary: HTMLElement | null | undefined;
	/** Content element succeeding the `<summary>` */
	content: HTMLElement | null | undefined;
	/** Element is collapsing */
	isCollapsing = false;
	/** Element is expanding */
	isExpanding = false;
	/** Animation object */
	animation?: Animation | null;
	/** Animation duration and easing */
	animParams: AnimParams = {
		duration: 400,
		easing: "cubic-bezier(0.33,1,0.67,1)"
	};
	/** Actions to run after expanding the item. */
	animActionsExpand: AnimActions = {
		onfinish: this.onAnimationFinish.bind(this,true),
		oncancel: () => { this.isExpanding = false; }
	};
	/** Actions to run after collapsing the item. */
	animActionsCollapse: AnimActions = {
		onfinish: this.onAnimationFinish.bind(this,false),
		oncancel: () => { this.isCollapsing = false; }
	};
	/** This widget is expanded to show weather details. */
	detailsOpen = true;
	/** Weather data used by this widget */
	weather?: Weather;
	/** Language used for time formatting */
	lang = "en-US";
	/**
	 * @param el CSS selector the widget
	 * @param data Weather data
	 */
	constructor(el: string, data?: Weather) {
		this.el = document.querySelector(el);
		this.weather = data;
		this.displayWeather();
		this.summary = this.el?.querySelector("summary");
		this.summary?.addEventListener("click", this.toggle.bind(this));
		this.content = this.summary?.nextElementSibling as HTMLElement;
	}
	/** Display the weather data in the UI. */
	displayWeather(): void {
		if (!this.weather) return;

		const weatherProps = Object.keys(this.weather).filter(key => key.indexOf("_unit") < 0);

		weatherProps.forEach(prop => {
			const propEl = this.el?.querySelector(`[data-stat=${prop}]`) as HTMLElement;
			
			if (!propEl) return;

			let value = this.weather?.[prop as WeatherKey];
			let unit = "";

			if (prop == "kind") {
				// SVG symbol for the kind of weather
				const kindSymbol = this.el?.querySelector("[data-symbol]");
				kindSymbol?.setAttribute("href",`#${value}`);

			} else if (prop === "time") {
				// `datetime` attribute
				const valueAsDate = value as Date;
				const hourRaw = valueAsDate.getHours();
				let hour = hourRaw < 10 ? `0${hourRaw}` : `${hourRaw}`;
				const minute = `${valueAsDate.getMinutes()}`;

				propEl.setAttribute("datetime",`${hour}:${minute}`);
				// display the hour and minute
				const format = new Intl.DateTimeFormat(this.lang, {
					hour: "numeric",
					minute: "2-digit",
				});
				value = format.format(value as Date);

			} else if (prop === "wind") {
				unit = "mph";
			} else if (prop === "visibility") {
				unit = "mi";
			}
			if (unit !== "") {
				// attach the unit if applicable
				value += ` ${unit}`;
			}
			propEl.innerText = `${value}`;
		});
	}
	/**
	 * Open or close the widget.
	 * @param e Click event whose default behavior should be prevented
	 */
	toggle(e?: Event) {
		e?.preventDefault();
		this.el?.classList.remove("collapsing","expanding");

		if (this.isCollapsing || !this.el?.open) {
			this.open();
		} else if (this.isExpanding || this.el?.open) {
			this.collapse();
		}
	}
	/** Open the item and run the animation for expanding. */
	open(): void {
		if (this.el) {
			this.el.style.height = `${this.el.offsetHeight}px`;
			this.el.open = true;

			this.expand();
		}
	}
	/** Expansion animation */
	expand(): void {
		this.el?.classList.add("expanding");
		this.isExpanding = true;

		const startHeight = this.el?.offsetHeight || 0;
		const summaryHeight = this.summary?.offsetHeight || 0;
		const contentHeight = this.content?.offsetHeight || 0;
		const endHeight = summaryHeight + contentHeight;
		
		this.animation?.cancel();
		this.animation = this.el?.animate(
			{ height: [`${startHeight}px`, `${endHeight}px`] },
			this.animParams
		);
		if (this.animation) {
			this.animation.onfinish = this.animActionsExpand.onfinish;
			this.animation.oncancel = this.animActionsExpand.oncancel;
		}
	}
	/** Close the item and run the animation for collapsing. */
	collapse(): void {
		this.el?.classList.add("collapsing");
		this.isCollapsing = true;

		const startHeight = this.el?.offsetHeight || 0;
		const endHeight = this.summary?.offsetHeight || 0;

		this.animation?.cancel();
		this.animation = this.el?.animate(
			{ height: [`${startHeight}px`, `${endHeight}px`] },
			this.animParams
		);
		if (this.animation) {
			this.animation.onfinish = this.animActionsCollapse.onfinish;
			this.animation.oncancel = this.animActionsCollapse.oncancel;
		}
	}
	/** Actions to run when the animation is finished */
	onAnimationFinish(open: boolean): void {
		if (this.el) {
			this.el.open = open;

			if (this.animation) {
				this.animation = null;
			}
			this.isCollapsing = false;
			this.isExpanding = false;
			this.el.style.height = "";
			this.el.classList.remove("collapsing","expanding");
		}
	}
}

interface Weather {
	city: string,
	kind: string,
	time: Date,
	temperature: number,
	temperature_scale: string,
	wind: number,
	wind_unit: string,
	visibility: number,
	visibility_unit: string,
	air_quality: number,
	humidity: number
}
type WeatherKey = keyof Weather;

type AnimActions = {
	onfinish: () => void,
	oncancel: () => void
}
type AnimParams = {
	duration: number,
	easing: string
}