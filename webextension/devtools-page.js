function handleShown() {
	// TODO: start message handling here?
}

function handleHidden() {
	// TODO: stop message handling here?
}

browser.devtools.panels.create(
	"BATT",
	"",
	"devtools-panel.html"
).then((newPanel) => {
	newPanel.onShown.addListener(handleShown);
	newPanel.onHidden.addListener(handleHidden);
});
