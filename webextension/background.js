const urls = ["<all_urls>"];
const events = [
	{ name: "BeforeRequest",     specs: ["requestBody"] },
	{ name: "BeforeSendHeaders", specs: ["requestHeaders"] },
	{ name: "SendHeaders",       specs: ["requestHeaders"] },
	{ name: "HeadersReceived",   specs: ["responseHeaders"] },
	{ name: "AuthRequired",      specs: ["responseHeaders"] },
	{ name: "ResponseStarted",   specs: ["responseHeaders"] },
	{ name: "BeforeRedirect",    specs: ["responseHeaders"] },
	{ name: "Completed",         specs: ["responseHeaders"] },
	{ name: "ErrorOccurred",     specs: undefined }
];

var devtoolsPort;

function log (type, name, data)
{
	if (devtoolsPort) {
		devtoolsPort.postMessage({
			type: type,
			name: name,
			data: data
		});
	}
}


events.forEach((event)=>{
	// TODO: is there a way to avoid this `if`?
	if (event.specs) {
		chrome.webRequest[`on${event.name}`].addListener(
			data=>log("request/event", event.name, data), {urls: urls}, event.specs
		);
	} else {
		chrome.webRequest[`on${event.name}`].addListener(
			data=>log("request/event", event.name, data), {urls: urls}
		);
	}
});

browser.runtime.onConnect.addListener(port=>devtoolsPort=port);
