define(function() {

	var re = ",请稍后重试!";

	return {
		ajax: {
			0: "网络无法连接,请检查网络配置!",
			1: "请求超时" + re,
			2: "网络授权异常" + re,
			3: "数据返回错误" + re,
			unknown: "网络繁忙" + re
		},
		location: {
			android: "定位服务未开启,请进入系统设置中打开相应开关,并允许使用定位服务",
			ios: "定位服务未开启,请进入系统【设置】>【隐私】>【定位服务】中打开开关,并允许使用定位服务",
			title: "请打开定位开关",
			buttons: "知道了"
		},
		alipay: {
			9000: "支付成功!",
			4000: "系统异常,请稍候重新操作!",
			4001: "数据格式不正确!",
			4003: "该用户绑定的支付宝账户被冻结或不允许支付!",
			4004: "付款对象已解除该支付宝帐号!",
			4005: "支付宝帐号绑定失败或没有绑定!",
			4006: "订单支付失败!",
			4010: "请重新绑定您的支付宝账户!",
			6000: "支付服务正在进行升级操作,请稍候重新操作!",
			6001: "您取消了支付操作!",
			0001: "缺少商户配置信息或配置设置错误(商户id,支付公钥,支付密钥)!",
			0002: "您还没有安装支付宝客户端(iOS)或安全支付插件(Android)!",
			0003: "签名错误(公钥私钥错误)",
			unknown: "发生未知错误,请稍后操作或联系客服人员!"
		},
		rongCloud: {
			405: "您的账户已被列入黑名单中,详情请联系客服!",
			3001: "服务器超时" + re,
			"-2": "发送处理失败" + re,
			"-1": "发生未知错误" + re,
			"-10000": "初始化失败" + re,
			"-10001": "服务器连接失败" + re,
			"-10002": "数据发生错误" + re,
			unknown: "发生未知错误,请稍后操作或联系客服人员!"
		}
	}

});