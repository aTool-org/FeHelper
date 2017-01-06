var setting = {'status': 'on'};


function saveSetting() {
	chrome.storage.local.set({'status': setting['status']}, function() {}); // 保存到本地
}


function setStatus(status) {
	if (status !== 'off') {
		chrome.browserAction.setBadgeText({'text': 'on'});
		chrome.browserAction.setBadgeBackgroundColor({'color': '#14892c'});
	}
	else {
		chrome.browserAction.setBadgeText({'text': 'off'});
		chrome.browserAction.setBadgeBackgroundColor({'color': '#d04437'});
	}
	saveSetting();
}

function toggleOnOff(tab) {
	if (setting['status'] === 'on') setting['status'] = 'off';
	else setting['status'] = 'on';

	setStatus(setting['status']);
}

// 监听点击事件
chrome.browserAction.onClicked.addListener(toggleOnOff);

// 回复状态
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// 请求设置状态
	if ('status' === request.get) sendResponse(setting);
});

// 加载配置
chrome.storage.local.get(['status'], function(data) {
	if ('off' === data['status']) {
		setting['status'] = 'off';
	}
	// 读取配置成功之后，显示图标
	setStatus(setting['status']);
});