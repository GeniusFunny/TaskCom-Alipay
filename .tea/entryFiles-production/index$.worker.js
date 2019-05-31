if(!self.__appxInited) {
self.__appxInited = 1;
require('@alipay/appx-compiler/lib/sjsEnvInit');

require('./config$');
require('./importScripts$');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;

if(AFAppX.compilerConfig){ AFAppX.compilerConfig.component2 = true; }
function success() {
require('../..//app');
require('../../components/card/index');
require('../../components/task/index');
require('../../components/side-bar/index');
require('../../components/input/index');
require('../../components/textarea/index');
require('../../components/tab/index');
require('../../components/form-button/index');
require('../../components/modal/index');
require('../../pages/personalCenter/index');
require('../../pages/add/index');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}