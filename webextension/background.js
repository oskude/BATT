const events = [
	{ name: "BeforeRequest",     specs: ["requestBody"] },
	{ name: "BeforeSendHeaders", specs: ["requestHeaders"] },
	{ name: "SendHeaders",       specs: ["requestHeaders"] },
	{ name: "HeadersReceived",   specs: ["responseHeaders"] },
	{ name: "AuthRequired",      specs: ["responseHeaders"] },
	{ name: "ResponseStarted",   specs: ["responseHeaders"] },
	{ name: "BeforeRedirect",    specs: ["responseHeaders"] },
	{ name: "Completed",         specs: ["responseHeaders"] }
];
const requests = [];

function log (event, data)
{
	if (!requests[data.requestId]) {
		requests[data.requestId] = [{
			[event]: data
		}];
		console.groupCollapsed(data.requestId, data.method);
		console.info(requests[data.requestId]);
		console.groupEnd();
	} else {
		requests[data.requestId].push({[event]: data});
	}
}

events.forEach((event)=>{
	chrome.webRequest[`on${event.name}`].addListener(
		(data)=>{
			log(event.name, data);
		},{
			urls: ["<all_urls>"]
		},
		event.specs
	);
});

chrome.webRequest.onErrorOccurred.addListener(
	(data)=>{
		log("ErrorOccurred", data);
	},{
		urls: ["<all_urls>"]
	}
);
