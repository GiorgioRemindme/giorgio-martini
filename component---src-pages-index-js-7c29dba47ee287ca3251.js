"use strict";(self.webpackChunkgiorgio_martini_website=self.webpackChunkgiorgio_martini_website||[]).push([[678],{9054:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var a=n(7294),r=n(3207),i=n(7271),o=function(e,t){return Math.random()*(t-e)+e},c="#352D39",s=function(e,t,n){return e>=t&&e<=n};function l(e){var t,n,a="#FF6978",r=[],i=20;function l(e,t,n){var r=t,i=n,c=2,s=!1;return{display:function(){e.noStroke(),e.fill(a),e.ellipse(r,i,c)},flash:function(){c=20,s=!0},randomWalk:function(){r+=o(-1,1),i+=o(-1,1)},values:function(){return{_x:r,_y:i,hovered:s}},fade:function(){c>=0?c-=1:s=!1}}}e.setup=function(){e.frameRate(24),t=e.createCanvas(e.windowWidth,e.windowHeight),e.background(c),t.position(0,0).style("z-index","-1"),i=e.map(e.width,0,2e3,2,20);var a=e.width/i;n=e.height/a;for(var o=0;o<i+1;o++)for(var s=0;s<n+1;s++)r.push(l(e,o*a,s*a))},e.draw=function(){e.background(c),e.strokeWeight(1),r.forEach((function(t,n){var i,o,c,l,u,m=t.values(),d=m._x,f=m._y,h=m.hovered;t.randomWalk(),t.display(),0!==n&&(i=e.mouseX,o=e.mouseY,l=f,void 0===u&&(u=20),s(i,(c=d)-u,c+u)&&s(o,l-u,l+u))&&t.flash(),h&&t.fade(),r.forEach((function(t){s(d,t.values()._x-80,t.values()._x+80)&&s(f,t.values()._y-80,t.values()._y+80)&&(e.stroke(a),e.strokeWeight(1),e.line(d,f,t.values()._x,t.values()._y))}))}))}}var u=function(e){function t(){return e.apply(this,arguments)||this}return(0,r.Z)(t,e),t.prototype.render=function(){return a.createElement(i.d,{sketch:l})},t}(a.Component),m=n(7198),d=n(5444),f=function(){return a.createElement("div",{className:""},a.createElement(u,null),a.createElement(m.Z,{hasFooter:!1,isDarkMode:!1},a.createElement("div",{className:"pt1"},a.createElement("p",{className:"b white f-subheadline"},"Hey, I'm Giorgio Martini."),a.createElement("p",{className:"b white f-title"},"I'm a Frontend developer based in Berlin."),a.createElement("p",{className:"white"},"I also love to create Art with ",a.createElement(d.rU,{className:"_pink",to:"/code/"},"code"),", making ",a.createElement(d.rU,{className:"_pink",to:"/code/"},"music")," and taking ",a.createElement(d.rU,{className:"_pink",to:"/code/"},"pics"),".",a.createElement("p",{className:"white"},"You can read more about me ",a.createElement(d.rU,{className:"_pink",to:"/code/"},"here"),".")))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-7c29dba47ee287ca3251.js.map