"use strict";define(["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0});var a={name:function o(e){var a=justory.configs,r=e[0],t="";if(r){var n=r.module,o=r.name||a.defaultFN;t=n+"_"+o}return t||api.frameName},open:function(){var e=justory.configs,a=arguments.length<=0?void 0:arguments[0],o=a.module,r=a.name||e.defaultFN,t=o+"_"+r,n=a.url||e["static"]+o+"/"+r+"."+e.defaultFT,i=e.statusBarHeight,l=a.rect||{},m=a.animation||{type:e.winAnt(1)},s=a.pageParam||{},u={name:t,url:n,bgColor:a.bgColor||"rgba(255,255,255,0)",bounces:a.bounces===!1?!1:!0,vScrollBarEnabled:a.vScrollBarEnabled===!0?!0:!1,hScrollBarEnabled:a.hScrollBarEnabled===!1?!1:!0,scrollToTop:a.scrollToTop===!1?!1:!0,scaleEnabled:a.scaleEnabled===!0?!0:!1,allowEdit:a.allowEdit===!0?!0:!1,softInputMode:a.softInputMode||"auto",reload:a.reload===!0?!0:!1,showProgress:a.showProgress===!0?!0:!1,pageParam:s,rect:{x:l.x||0,y:l._y||0===l._y?l._y:l.y?l.y+i:i,w:l.w||api.winWidth,h:l._h?l._h:l.h?l.h-i:api.winHeight-i,moptinLeft:l.moptinLeft||0,moptinTop:l.moptinTop||0,moptinBottom:l.moptinBottom||0,moptinRight:l.moptinRight||0}};e.ios&&[u.animation=m],api.openFrame(u),(a.hidden===!0||a.loading===!0)&&api.setFrameAttr({name:t,hidden:!0}),justory.log("openFrame:",{name:t,url:n,pageParam:s})},close:function(){for(var e=arguments.length,o=Array(e),r=0;e>r;r++)o[r]=arguments[r];var t=a.name(o);api.closeFrame({name:t}),justory.log("closeFrame:",{name:t})},hide:function(){for(var e=arguments.length,o=Array(e),r=0;e>r;r++)o[r]=arguments[r];var t=a.name(o);api.setFrameAttr({hidden:!0,name:t}),justory.log("hideFrame:",{name:t})},show:function(){for(var e=arguments.length,o=Array(e),r=0;e>r;r++)o[r]=arguments[r];var t=a.name(o);api.setFrameAttr({hidden:!1,name:t}),justory.log("showFrame:",{name:t})}};e["default"]=a});