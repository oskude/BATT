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
const requests = [];

function log (event, data)
{
	if (!requests[data.requestId]) {
		requests[data.requestId] = {};
		console.groupCollapsed(data.requestId, data.method, data.url);
		console.table(requests[data.requestId]);
		console.groupEnd();
	} else {
		requests[data.requestId][event] = data;
	}
}

events.forEach((event)=>{
	if (event.specs) {
		chrome.webRequest[`on${event.name}`].addListener(
			(data)=>{
				log(event.name, data);
			},{
				urls: ["<all_urls>"]
			},
			event.specs
		);
	} else {
		chrome.webRequest[`on${event.name}`].addListener(
			(data)=>{
				log(event.name, data);
			},{
				urls: ["<all_urls>"]
			}
		);
	}
});
