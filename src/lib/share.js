import { isApp } from '@jmfe/jm-common';
import * as $script from 'scriptjs';
import wxShare from './wxshare';

// 分享按钮设置
let params = {
	img: 'https:' + require('../img/share_icon.png'),
	url: window.location.href,
	title: 'custom title',
	desc: 'custom description',
	content: 'custom description'
};

if (isApp('wx')) {
	params['timeline_title'] = params.title;
	delete params.content;
	wxShare.init(params);

} else if (isApp('qq')) {
	$script('//open.mobile.qq.com/sdk/qqapi.js', () => {
		params['share_url'] = params.url;
		params['image_url'] = params.img;
		delete params.url;
		delete params.img;
		delete params.content;
		window.mqq.data.setShareInfo(params);
	});
}
