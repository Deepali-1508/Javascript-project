let body = document.body;
ScrollTrigger.create({
	trigger: "body",
	start: "top top",
	end: "bottom bottom",
	scrub: 0.15,
	snap: 1 / 28,
	onUpdate: (self) => {
		body.style.setProperty("--progress", self.progress * 100);
		body.style.setProperty("--velocity", Math.abs(self.getVelocity() / 3500));
	},
	onScrubComplete: () => {
		body.style.setProperty("--velocity", 0);
	},
	onEnter: () => {
		body.style.setProperty("--velocity", 0);
	},
	onEnterBack: () => {
		body.style.setProperty("--velocity", 0);
	},
	onLeave: () => {
		body.style.setProperty("--velocity", 0);
		window.scrollTo(0, 0);
	},
	onLeaveBack: () => {
		body.style.setProperty("--velocity", 0);
	}
});
