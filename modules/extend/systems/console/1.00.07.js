"use strict";define(["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0});var n={log:function t(){var e=justory.configs;if(e.debug){var n=(arguments.length<=0?void 0:arguments[0])||"no message!",a=(arguments.length<=1?void 0:arguments[1])?JSON.stringify(arguments.length<=1?void 0:arguments[1]):"no additional data!",g=new Date,t="["+g.getUTCSeconds()+":"+g.getMilliseconds()+"]{"+n+"}["+api.winName+"]["+api.frameName+"]==>"+a;(arguments.length<=2?void 0:arguments[2])&&"ERROR"==(arguments.length<=2?void 0:arguments[2])?console.error(t):(arguments.length<=2?void 0:arguments[2])&&"WARN"==(arguments.length<=2?void 0:arguments[2])?console.warn(t):console.log(t)}}};e["default"]=n});