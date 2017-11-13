export default function getErrorMessage(data) {
	let code = data.code;
	let errorMsg = '';

	if (data.code == '0') {
		if (data.subCode == '1') {
			errorMsg = '大家太热情了，请稍后再试';
		} else if (data.subCode == '1-2') {
			errorMsg = '啊哦，请稍后再来吧';
		} else {
			errorMsg = '精彩活动敬请期待~';
		}
		code = data.subCode;
	} else if (data.code == '1') {
		errorMsg = '进入页面姿势不对，请稍后再试';
	} else if (data.code == '-1') {
		errorMsg = '排队的人太多，请稍后再来';
	} else if (/timeout/i.test(data.textStatus)) {
		errorMsg = '请检查一下网络再试';
	} else {
		errorMsg = '精彩活动敬请期待~';
	}

	return errorMsg;
}
