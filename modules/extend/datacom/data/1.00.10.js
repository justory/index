"use strict";define(["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0});var r={publish:function(){var e=arguments.length<=0?void 0:arguments[0],r=arguments.length<=1?void 0:arguments[1];$(document).trigger(e,r),justory.log("publish data:",{key:e,value:r},"WARN")},subscribe:function(){for(var e=arguments.length,r=Array(e),a=0;e>a;a++)r[a]=arguments[a];$(document).on(r[0],function(e,a){r.last()(a),justory.log("subscribe data:",{data:a},"WARN")})},send:function(){var e=justory.configs,r=arguments.length<=0?void 0:arguments[0],a=r.win,t=r.frame,n=r.subframe,u=(r.frameGroup,r.data),o=r.name,s=r.frameName,m=r.script,i=function(r,a){var t="";return r&&(t=r.moduleName||r.module+"_"+r.name,t=="root_"+e.defaultFN&&[t="root"],"com"==a&&[t=e.prefixCOM+t],"frameGroup"==a&&[t=e.prefixFG+t]),t};"string"!=typeof u&&[u=JSON.stringify(u)],m="window._execScript("+u+");",a&&!a.frameGroup?(o=i(a),s=i(t),justory.log("sendData:",{win:o,frame:s,data:u},"WARN")):n?(o=i(n,"com"),s=i(n),justory.log("sendData:",{subframe:o,frame:s,data:u},"WARN")):a&&a.frameGroup&&t&&(o=i(a),s=i(t,"frameGroup"),justory.log("sendData:",{frameGroup:a.frameGroup,frame:s,data:u},"WARN")),api.execScript({name:o,frameName:s,script:m}),(arguments.length<=1?void 0:arguments[1])&&(arguments.length<=1?void 0:arguments[1])()},get:function(){for(var e=arguments.length,a=Array(e),t=0;e>t;t++)a[t]=arguments[t];r.subscribe("_execScriptData",function(e){a.last()(e)}),justory.log("getData beginning...",{},"WARN")}};e["default"]=r});