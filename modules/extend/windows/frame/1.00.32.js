"use strict";define(["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0});var a={open:function(){var e=justory.configs,a=arguments.length<=0?void 0:arguments[0],o=a.module,t=a.name||e.defaultFN,n=o+"_"+t,r=a.url||e["static"]+o+"/"+t+"."+e.defaultFT,l=e.statusBarHeight,i=a.rect||{},s=a.animation||{type:e.winAnt(1)},m=a.pageParam||{},u={name:n,url:r,bgColor:a.bgColor||"rgba(255,255,255,0)",bounces:a.bounces===!1?!1:!0,vScrollBarEnabled:a.vScrollBarEnabled===!0?!0:!1,hScrollBarEnabled:a.hScrollBarEnabled===!1?!1:!0,scrollToTop:a.scrollToTop===!1?!1:!0,scaleEnabled:a.scaleEnabled===!0?!0:!1,allowEdit:a.allowEdit===!0?!0:!1,softInputMode:a.softInputMode||"auto",reload:a.reload===!0?!0:!1,showProgress:a.showProgress===!0?!0:!1,pageParam:m,rect:{x:i.x||0,y:i._y?i._y:i.y?i.y+l:l,w:i.w||api.winWidth,h:i._h?i._h:i.h?i.h-l:api.winHeight-l,moptinLeft:i.moptinLeft||0,moptinTop:i.moptinTop||0,moptinBottom:i.moptinBottom||0,moptinRight:i.moptinRight||0}};e.ios&&[u.animation=s],api.openFrame(u),(a.hidden===!0||a.loading===!0)&&api.setFrameAttr({name:n,hidden:!0}),justory.log("openFrame:",{name:n,url:r,pageParam:m})},close:function(){var e=justory.configs,a=arguments.length<=0?void 0:arguments[0],o=a.module,t=a.name,n=void 0===t?e.defaultFN:t,r=o+"_"+n||"";api.closeFrame({name:r}),justory.log("closeFrame:",{name:r,url:e["static"]+o+"/"+n+"."+e.defaultFT})},hide:function(){var e=justory.configs,a=arguments.length<=0?void 0:arguments[0],o=a.module,t=a.name,n=void 0===t?e.defaultFN:t,r=o+"_"+n||"";api.setFrameAttr({name:r,hidden:!0}),justory.log("hideFrame:",{name:r,url:e["static"]+o+"/"+n+"."+e.defaultFT})},show:function(){var e=justory.configs,a=arguments.length<=0?void 0:arguments[0],o=a.module,t=a.name,n=void 0===t?e.defaultFN:t,r=o+"_"+n||"";api.setFrameAttr({name:r,hidden:!1}),justory.log("showFrame:",{name:r,url:e["static"]+o+"/"+n+"."+e.defaultFT})}};e["default"]=a});