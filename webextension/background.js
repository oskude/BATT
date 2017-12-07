function log (event, data)
{
	console.groupCollapsed(data.requestId, event);
	console.info(data);
	console.groupEnd();
}

chrome.webRequest.onBeforeRequest.addListener(
	(data)=>{
		log("BeforeRequest", data);
	},{
		urls: ["<all_urls>"]
	},[
		"requestBody"
	]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
	(data)=>{
		log("BeforeSendHeaders", data);
	},{
		urls: ["<all_urls>"]
	},[
		"requestHeaders"
	]
);

chrome.webRequest.onSendHeaders.addListener(
	(data)=>{
		log("SendHeaders", data);
	},{
		urls: ["<all_urls>"]
	},[
		"requestHeaders"
	]
);

chrome.webRequest.onHeadersReceived.addListener(
	(data)=>{
		log("HeadersReceived", data);
	},{
		urls: ["<all_urls>"]
	},[
		"responseHeaders"
	]
);

chrome.webRequest.onAuthRequired.addListener(
	(data)=>{
		log("AuthRequired", data);
	},{
		urls: ["<all_urls>"]
	},[
		"responseHeaders"
	]
);

chrome.webRequest.onResponseStarted.addListener(
	(data)=>{
		log("ResponseStarted", data);
	},{
		urls: ["<all_urls>"]
	},[
		"responseHeaders"
	]
);

chrome.webRequest.onBeforeRedirect.addListener(
	(data)=>{
		log("BeforeRedirect", data);
	},{
		urls: ["<all_urls>"]
	},[
		"responseHeaders"
	]
);

chrome.webRequest.onCompleted.addListener(
	(data)=>{
		log("Completed", data);
	},{
		urls: ["<all_urls>"]
	},[
		"responseHeaders"
	]
);

chrome.webRequest.onErrorOccurred.addListener(
	(data)=>{
		log("ErrorOccurred", data);
	},{
		urls: ["<all_urls>"]
	}
);
