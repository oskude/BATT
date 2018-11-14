var backendPort = browser.runtime.connect();
var requests = {};

backendPort.onMessage.addListener(m=>{
	if (m.type === "request/event") {
		let id = m.data.requestId;
		if (!requests[id]) {
			requests[id] = {};
			// TODO: this logs to background.js devtools! (not this panel devtools) bug or feature? (firefox 64.0b8)
			console.groupCollapsed(id, m.data.method, m.data.url);
			console.table(requests[id]);
			console.groupEnd();
		}
		requests[id][m.name] = m.data;
	}
});
