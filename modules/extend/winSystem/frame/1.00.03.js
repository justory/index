define(function(require,exports,module){var a=function(){return{open:function(){var a=justory.configs,e=arguments[0],module=e.module,r=e.name||a.defaultFN,o=module+"_"+r,n=e.url||a["static"]+module+"/"+r+"."+a.defaultFT,t=(e.bgColor||"#fff",a.statusBarHeight),l=e.rect||{},m=l.x||0,g=e.animation||{type:a.winAnt(1)};e.pageParam&&e.pageParam.pageParam?[$.extend(e.pageParam,e.pageParam.pageParam),delete e.pageParam.pageParam]:"";var i=e.pageParam||{};(i.loading===!0||e.loading===!0)&&(m=-api.winWidth),api.openFrame({name:o,url:n,bgColor:e.bgColor||"rgba(255,255,255,0)",bounces:e.bounces===!0?!0:!1,vScrollBarEnabled:e.vScrollBar===!0?!0:!1,hScrollBarEnabled:e.hScrollBar===!0?!0:!1,scrollToTop:e.scrollToTop===!1?!1:!0,scaleEnabled:e.scaleEnabled===!0?!0:!1,allowEdit:e.allowEdit===!0?!0:!1,softInputMode:e.softInputMode||"auto",reload:e.reload===!0?!0:!1,showProgress:e.showProgress===!0?!0:!1,animation:g,pageParam:i,rect:{x:m,y:l._y?l._y:l.y?l.y+t:t,w:l.w||"auto",h:l._h?l._h:l.h?l.h-t:api.winHeight-t,marginLeft:l.mL||0,marginTop:l.mt||0,marginBottom:l.mb||0,marginRight:l.mr||0}}),justory.systems.log("openFrame:",{name:o,url:n,pageParam:i})}}}();module.exports=a});