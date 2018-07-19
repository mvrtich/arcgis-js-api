// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.25/esri/copyright.txt for details.

define(["dojo/_base/lang","dojo/_base/declare","dojox/charting/plot2d/Base","dojox/charting/plot2d/_PlotEvents","dojox/charting/plot2d/common","dojox/gfx","dojox/gfx/matrix","dojox/lang/functional","dojox/lang/utils","dojo/has","./animation/_RingAnimation"],function(t,e,i,n,s,r,a,o,h,l,u){var c={createPath:function(t,e,i,n,s,r,a,o,h){var l=function(o){var h={cx:i.cx,cy:i.cy,r:e},l=t.createCircle(h).setStroke({color:a.series.ringBackgroundColor||"#DDDDDD",width:r}),u=n+2*o*Math.PI,c=i.cx+e*Math.cos(n),f=i.cy+e*Math.sin(n),d=i.cx+e*Math.cos(u),p=i.cy+e*Math.sin(u);return{shape:t.createPath().moveTo(c,f).arcTo(e,e,0,o>.5,!0,d,p).setStroke({color:s,width:r}),bgShape:l,end:u,ac:h}};return h.push({sliceIndex:o,func:l}),l}},f=e([i,n,u],{_animationInfos:null,defaultParams:{labels:!0,ticks:!1,fixed:!0,precision:1,labelOffset:20,labelStyle:"default",htmlLabels:!0,radGrad:"native",fanSize:5,startAngle:0,animate:null},optionalParams:{radius:0,omitLabels:!1,stroke:{},outline:{},shadow:{},fill:{},filter:{},styleFunc:null,font:"",fontColor:"",labelWiring:{}},_lastRenderResults:null,constructor:function(e,i){this.opt=t.clone(this.defaultParams),h.updateWithObject(this.opt,i),h.updateWithPattern(this.opt,i,this.optionalParams),this.axes=[],this.run=null,this.dyn=[],this.runFilter=[]},clear:function(){return this.inherited(arguments),this.dyn=[],this.run=null,this},setAxis:function(t){return this},addSeries:function(t){return this.run=t,this},getSeriesStats:function(){return t.delegate(s.defaultStats)},getRequiredColors:function(){return this.run?this.run.data.length:0},getRenderResults:function(){return this._lastRenderResults},render:function(t,e){function i(t){return r._base._getTextBox(t,{font:s.series.font}).w}if(!this.dirty)return this;this.resetEvents(),this.dirty=!1,this._eventSeries={},this.cleanGroup();var n=this.group,s=this.chart.theme;if(!this.run||!this.run.data.length)return this;var h,u,d,p=(t.width-e.l-e.r)/2,x=(t.height-e.t-e.b)/2,m=Math.min(p,x),v="font"in this.opt?this.opt.font:s.series.font,b=a._degToRad(90),y=this.events(),g=this.run.data.map(function(t,e){return"number"!=typeof t&&t.hidden&&(this.runFilter.push(e),t.hidden=!1),this.runFilter.some(function(t){return t===e})?"number"==typeof t?0:{y:0,text:t.text}:t},this);this.dyn=[],"radius"in this.opt&&(m=this.opt.radius);var _={cx:e.l+p,cy:e.t+x,r:m};if(h=o.map(g,"x ? Math.max(x.y, 0) : 0"),o.every(h,"<= 0"))return n.createCircle(_).setStroke(s.series.stroke),this.dyn=h.map(function(){return{}}),this;if(u=o.map(h,"/this",o.foldl(h,"+",0)),this.opt.labels){d=u.map(function(t,e){if(t<0)return"";var i=g[e];return"text"in i?i.text:this._getLabel(100*t)+"%"},this);if(d[0]&&-1!==d[0].indexOf(f.LABEL_SEPARATOR)){var R=0;d.forEach(function(t){t=t.split(f.LABEL_SEPARATOR)[0];var e=i(t);R=Math.max(R,e)});var P=i("&nbsp;");d=d.map(function(t){for(var e=t.split(f.LABEL_SEPARATOR),n=Math.round((R-i(e[0]))/P),s="",r=0;r<n+4;r++)s+="&nbsp;";return"<div><span>"+e[0]+"</span>"+s+"<span>"+e[1]+"</span></div>"})}else d=d.map(function(t){return"<div>"+t+"</div>"})}var L=o.map(g,function(t,e){var i=[this.opt,this.run];return null!=t&&"number"!=typeof t&&i.push(t),this.opt.styleFunc&&i.push(this.opt.styleFunc(t)),s.next("slice",i,!0)},this),A=0;if(this.opt.labels){d.forEach(function(t){A=Math.max(A,i(t))});var S=_.cx+m+A+e.r-t.width;if(S>0){var E=_.cx-m;if(E>S)_.cx-=S;else{var j=(S-E)/2;_.cx-=E+j,m-=j}}}var w=2*m+A;_.cx-=_.cx-m-(t.width-w)/2;var M=new Array(u.length),T=Math.min(m/10,.5*m/u.length),k=m;m-=T/2;var B=[],O=[];if(this._animationInfos=[],u.some(function(t,e){t=Math.max(t,.001);var i,s,r=g[e],a=L[e];i=a.series.fill;var o=c.createPath(n,m,_,b,i,T,a,e,this._animationInfos)(t);return shape=o.shape,O.push(o.ac),this.dyn.push({fill:i,stroke:a.series.stroke}),y&&(s={element:"slice",index:e,run:this.run,shape:shape,x:e,y:"number"==typeof r?r:r.y,cx:_.cx,cy:_.cy,cr:m},this._connectEvents(s),M[e]=s),B.push({x:_.cx,y:_.cy+m}),m-=T+3,!1},this),this.opt.labels){var D=(l("dojo-bidi")&&this.chart.isRightToLeft(),r._base._getTextBox("a",{font:v}).h);B.forEach(function(t,e){n.createPath().moveTo(t.x-5,t.y).lineTo(t.x+k-5,t.y).setStroke(s.series.labelWiring);this.renderLabel(n,t.x+k,t.y+D/3,d[e],s,!0,"left")},this),s.series.show100PercentLabel&&this._show100PercentLabel(s,m,n,_)}var F=0;return this._eventSeries[this.run.name]=o.map(g,function(t){return t<=0?null:M[F++]}),l("dojo-bidi")&&this._checkOrientation(this.group,t,e),this._lastRenderResults={labels:this.opt.labels,slicePies:O,maxLabelWidth:A},this.opt.animate&&this._renderAnimation(g,s,m,n,_,u),this},_show100PercentLabel:function(e,i,n,s){var a={series:t.mixin({},e.series)},o=Math.min(50,.6*i);a.series.font=a.series.font.replace(/\s\w*px/," "+o+"px");var h=r._base._getTextBox("100%",{font:a.series.font});this.renderLabel(n,s.cx-h.w/2,s.cy+h.h/3,"100%",a,!0,"left").style.opacity="0.5"}});return f.LABEL_SEPARATOR="&nbsp;",f});