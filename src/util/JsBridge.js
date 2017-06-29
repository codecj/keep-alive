const JsBridge = (callback) =>{
	if (window.WebViewJavascriptBridge) {
          return callback(WebViewJavascriptBridge);
      } else {
          document.addEventListener(
              'WebViewJavascriptBridgeReady',
              function() {
                  callback(WebViewJavascriptBridge)
              },
              false
          );
      }
      if (window.WVJBCallbacks) {
          return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() {
          document.documentElement.removeChild(WVJBIframe)
      }, 0);
};

//返回jsbridge
export const navBack = () =>{
	JsBridge(bridge => {
       bridge.callHandler('navBack')
  })
};

//扫一扫jsbridge
export const scan = (cb) =>{
  JsBridge(bridge => {
      window.WebViewJavascriptBridge.callHandler('scan',null,(responseData) => {
          cb(responseData);
      })
  })
};

 // Request.jsBbridge(bridge => {
 //                window.WebViewJavascriptBridge.callHandler(
 //                    'showAddressPicker', {
 //                        'Data': 'json数据传给Android端'
 //                    } //该类型是任意类型
 //                    , (responseData) => {
 //                        var res = responseData
 //                            // JSON.parse(JSON.stringify(responseData))
 //                        if ((typeof res) == 'string') {
 //                            res = JSON.parse(responseData);
 //                        }
 //                        this.areaid = res.areaid;
 //                        res.areaid == '' ? this.address = '全部区域' : this.address = res.address;
 //                    }
 //                );
 //            })
