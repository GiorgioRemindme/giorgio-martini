"use strict";(self.webpackChunkgiorgio_martini_website=self.webpackChunkgiorgio_martini_website||[]).push([[678],{5945:function(e,t,n){n.r(t),n.d(t,{default:function(){return d}});var a=n(7294),r=n(3207),i=n(7271),o="#352D39",s=function(e,t,n){return e>=t&&e<=n};function c(e){var t,n,a="#FF6978",r=[],i=20;function c(e,t,n){var r=t,i=n,o=2,s=!1;return{display:function(){e.noStroke(),e.fill(a),e.ellipse(r,i,o)},flash:function(){o=20,s=!0},randomWalk:function(){r+=e.random(-.5,.5),i+=e.random(-.5,.5)},values:function(){return{_x:r,_y:i,hovered:s}},fade:function(){o>=0?o-=1:s=!1}}}e.setup=function(){t=e.createCanvas(e.windowWidth,e.windowHeight),e.background(o),t.position(0,0).style("z-index","-1"),i=e.map(e.width,0,2e3,2,30);var a=e.width/i;n=e.height/a;for(var s=0;s<i+1;s++)for(var l=0;l<n+1;l++)r.push(c(e,s*a,l*a))},e.draw=function(){e.background(o),e.strokeWeight(1),r.forEach((function(t,n){var i,o,c,l,u,m=t.values(),d=m._x,f=m._y,h=m.hovered;t.randomWalk(),t.display(),0!==n&&(i=e.mouseX,o=e.mouseY,l=f,void 0===u&&(u=20),s(i,(c=d)-u,c+u)&&s(o,l-u,l+u))&&t.flash(),h&&t.fade(),r.forEach((function(t){s(d,t.values()._x-40,t.values()._x+40)&&s(f,t.values()._y-40,t.values()._y+40)&&(e.stroke(a),e.strokeWeight(1),e.line(d,f,t.values()._x,t.values()._y))}))}))}}var l=function(e){function t(){return e.apply(this,arguments)||this}return(0,r.Z)(t,e),t.prototype.render=function(){return a.createElement(i.d,{sketch:c})},t}(a.Component),u=n(7198),m=n(5444),d=function(){return a.createElement("div",{className:""},a.createElement(l,null),a.createElement(u.Z,{hasFooter:!1,isDarkMode:!1},a.createElement("div",{className:"pt1"},a.createElement("p",{className:"b white f-subheadline"},"Hey, I'm Giorgio Martini."),a.createElement("p",{className:"b white f-title"},"I'm a Frontend developer based in Berlin."),a.createElement("p",{className:"white"},"I also love to create Art with ",a.createElement(m.rU,{className:"_pink",to:"/code"},"code"),", making ",a.createElement(m.rU,{className:"_pink",to:"/code"},"music")," and taking ",a.createElement(m.rU,{className:"_pink",to:"/code"},"pics"),".",a.createElement("p",{className:"white"},"You can read more about me ",a.createElement(m.rU,{className:"_pink",to:"/code"},"here"),".")))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-1beca0802169f4331708.js.map