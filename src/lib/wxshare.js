var shareConfig: ShareConfig = {
	img: '',
	url: location.href,
	desc: '',
	title: ''
};

var init = function (options) {
	if (typeof options === 'object') {
		for (var p in options) {
			if (options.hasOwnProperty(p)) {
				shareConfig[p] = options[p];
			}
		}
	}

	if (typeof WeixinJSBridge == "object" && isFunction(WeixinJSBridge.invoke)) {
		WXReadyFn();
	} else {
		if (document.addEventListener) {
			document.addEventListener("WeixinJSBridgeReady", WXReadyFn, false);
		} else if (document.attachEvent) {
			document.attachEvent("WeixinJSBridgeReady", WXReadyFn);
			document.attachEvent("onWeixinJSBridgeReady", WXReadyFn);
		}
	}
}

function isFunction(obj) {
	return typeof obj == 'function';
}

function WXReadyFn() {
	try {
		WeixinJSBridge.on("menu:share:timeline", function () {
			WeixinJSBridge.invoke("shareTimeline", {
				"img_url": shareConfig.img,
				"img_width": 55,
				"img_height": 55,
				"link": isFunction(shareConfig.url) ? shareConfig.url(1) : shareConfig.url,
				"desc": shareConfig.desc,
				"title": shareConfig.timeline_title ? shareConfig.timeline_title : shareConfig.title
			}, function () {
				try {
					isFunction(shareConfig.callback) && shareConfig.callback();
				} catch (e) {

				}
			});
		});
		if (/android/i.test(navigator.userAgent)) {
			WeixinJSBridge.on("menu:share:weibo", function () {
				WeixinJSBridge.invoke("shareWeibo", {
					"url": isFunction(shareConfig.url) ? shareConfig.url(2) : shareConfig.url,
					"content": shareConfig.title + ':' + shareConfig.desc
				}, function () {
					try {
						isFunction(shareConfig.callback) && shareConfig.callback();
					} catch (e) {

					}
				});
			});
		} else {
			WeixinJSBridge.on("menu:share:weibo", function () {
				WeixinJSBridge.invoke("shareWeibo", {
					"img_url": shareConfig.img,
					"img_width": 55,
					"img_height": 55,
					"link": isFunction(shareConfig.url) ? shareConfig.url(2) : shareConfig.url,
					"desc": shareConfig.desc,
					"title": shareConfig.title
				}, function () {
					try {
						isFunction(shareConfig.callback) && shareConfig.callback();
					} catch (e) {

					}
				});
			});
		}
		WeixinJSBridge.on("menu:share:appmessage", function () {
			WeixinJSBridge.invoke("sendAppMessage", {
				"img_url": shareConfig.img,
				"img_width": 55,
				"img_height": 55,
				"link": isFunction(shareConfig.url) ? shareConfig.url(3) : shareConfig.url,
				"desc": shareConfig.desc,
				"title": shareConfig.title
			}, function () {
				try {
					isFunction(shareConfig.callback) && shareConfig.callback();
				} catch (e) {

				}
			});
		});
		isFunction(shareConfig.readycallback) && shareConfig.readycallback();
	} catch (e) { }
}

export default { init };
