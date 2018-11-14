var backendPort = browser.runtime.connect();
var requests = {};

Vue.component("request-event", {
	props: ["data", "name"],
	template: `
		<span>{{ name }} </span>
	`
});

Vue.component("request-entry", {
	props: ["request", "id"],
	template: `
		<div>
			<span>{{ id }}</span>
			<span>{{ request.BeforeRequest.method }}</span>
			<span>{{ request.BeforeRequest.type }}</span>
			<span>{{ request.BeforeRequest.url }}</span>
			<request-event
				v-for="(data, name) in request"
				v-bind:key="name"
				v-bind:data="data"
				v-bind:name="name"
			></request-event>
		</div>
	`
});

var app = new Vue({
	el: "#app",
	data: {
		requests: {}
	},
	template: `
		<div>
			<request-entry
				v-for="(request, key) in requests"
				v-bind:key="key"
				v-bind:id="key"
				v-bind:request="request"
			></request-entry>
		</div>
	`
});

backendPort.onMessage.addListener(m=>{
	if (m.type === "request/event") {
		let id = m.data.requestId;
		if (!app.requests[id]) {
			Vue.set(app.requests, id, {});
		}
		Vue.set(app.requests[id], m.name, m.data);
	}
});
