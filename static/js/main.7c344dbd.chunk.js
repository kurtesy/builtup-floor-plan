(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{127:function(t,e,a){t.exports=a(154)},135:function(t,e,a){},137:function(t,e,a){},141:function(t,e,a){},154:function(t,e,a){"use strict";a.r(e);var r=a(0),n=a.n(r),l=a(53),i=a.n(l),c=(a(135),a(48)),o=a(9),s=(a(137),a(153)),p=(a(139),a(149)),d=a(148),u=a(56),h=(a(140),function(t){var e={};return Object.keys(t).map(function(a){var r=t[a];e[a]=Math.round(20*(parseFloat(r.ft)+parseFloat(r.inc/12)),2)}),e}),m=function(t){var e=t.ft,a=t.inc;return"".concat(e,"'").concat(a,'"')},f=(a(141),["#1C315E","#227C70","#88A47C","#E6E2C3"]),g=[],y=function(t){var e=t.plotDim,a=t.builtupDim,l=(t.scale,t.mainRef),i=t.config,c=Object(r.useRef)(),o=(Object(p.a)([0,1],[[1,0],[1,2]]),null),s=null,h=function(t,e,a,r,n){var l=e.X,i=e.Y;g.map(function(c,p){var h=function(t,e,a){var r=e*a*t/100,n=Math.sqrt(r/1.55);return{width:r/n,height:n}}(c.percent,a,r);t.append("rect").attr("id","room-".concat(p)).attr("class","room-rect").attr("x",l).attr("y",i).attr("width",h.width).attr("height",h.height).attr("stroke","#400000").attr("stroke-width",c.wallThick).attr("fill",f[p%4]).style("opacity",.5).on("click",function(e,a){d.d(".selected-room").classed("selected-room",!1),t.selectAll("circle").remove();var r=d.d(this);r.classed("selected-room",!0),o="room-".concat(p),console.log(this,r,e,a);var n=this.attributes;t.append("circle").attr("class","resize-circle").attr("cx",parseInt(n.x.value)+parseInt(n.width.value)).attr("cy",parseInt(n.y.value)+parseInt(n.height.value)).attr("r",5).attr("fill","blue").on("mousedown",function(t,e){s=!0}).on("mouseup",function(t,e){s=!1}).on("mousemove",function(t,e){var a=u.a(t)[0],r=d.d("#".concat(o)),n=d.d(this);!0===s&&(n.attr("cx",parseInt(a[0])),n.attr("cy",parseInt(a[1])),r.attr("width",parseInt(a[0])-parseInt(r._groups[0][0].attributes.x.value)),r.attr("height",parseInt(a[1])-parseInt(r._groups[0][0].attributes.y.value)))})}),t.append("text").text(c.roomType).attr("width",30).attr("height",30).attr("x",l+h.width/2-30).attr("y",i+h.height/2),t.append("svg:image").attr("x",l+h.width/2-5).attr("y",i+h.height-31).attr("width",30).attr("height",34).attr("xlink:href","door_icon.svg"),l+=h.width,e.X+r-50<=l&&(i+=h.height,l=e.X+n/2+1)})},y=function(){var t=document.getElementsByClassName("MuiList-root")[0].offsetWidth,r=l.current.clientWidth-t,n=l.current.clientHeight,o=e.plotLength,s=e.plotBreadth,p=e.pWallTkn,u=a.builtupLength,f=a.builtupBreadth,y=a.bWallTkn,b={X:r/2-o/2,Y:n/2-s/2},v={X:r/2-u/2,Y:n/2-f/2},x=d.d(c.current).attr("width",r).attr("height",n);x.selectAll("rect").remove(),x.selectAll("text").remove(),x.selectAll("image").remove();var k=d.e().on("zoom",w),w=function(t){d.d("svg").attr("transform",t.transform)},E=d.c().domain([0,1]).range([0,r]),O=d.c().domain([0,1]).range([n,0]),j=d.a(E).ticks(1),B=d.b(O).ticks(1),L=d.a(E).tickSize(-n).tickFormat("").ticks(145),X=d.b(O).tickSize(-r).tickFormat("").ticks(100);x.append("g").attr("class","x axis-grid").attr("transform","translate(0,"+n+")").call(L),x.append("g").attr("class","y axis-grid").call(X),x.append("g").attr("class","x axis").attr("transform","translate(0,"+n+")").call(j),x.append("g").attr("class","y axis").call(B);var Y=d.d("#main").append("text").attr("class","tooltip").style("opacity",0);x.append("defs").append("linearGradient").attr("id","linear-gradient").attr("x1","0%").attr("y1","0%").attr("x2","100%").attr("y2","100%"),x.append("rect").attr("id","plot-rect").attr("x",b.X).attr("y",b.Y).attr("width",o).attr("height",s).attr("stroke","#B1ACE6").attr("stroke-width",p).attr("fill","transparent").style("opacity",.5).on("mousemove",function(t,e){Y.style("opacity",1).html("x: ".concat(t.clientX-b.X,", y:").concat(t.clientY-b.Y)).attr("x",t.clientX-b.X).attr("y",t.clientY-b.Y)}).on("mouseover",function(t,e){d.d(this).attr("r",10).style("fill","lightblue").style("opacity",.5)}).on("mouseout",function(t,e){d.d(this).attr("r",10).style("fill","transparent").style("opacity",1),Y.style("opacity",0)}),x.append("rect").attr("id","plot-rect-inner").attr("x",b.X+p/2).attr("y",b.Y+p/2).attr("width",o-p).attr("height",s-p).attr("stroke","#776ed3").attr("stroke-width",.5).attr("fill","transparent"),x.append("rect").attr("id","plot-rect-outer").attr("x",b.X-p/2).attr("y",b.Y-p/2).attr("width",o+p).attr("height",s+p).attr("stroke","#776ed3").attr("stroke-width",.5).attr("fill","transparent"),x.append("text").attr("x",b.X).attr("y",n/2+8).attr("text-anchor","middle").attr("class","rect-side-breadth").text(m(i.plotBreadth)).style("text-anchor","end"),x.append("text").attr("x",r/2).attr("y",b.Y).attr("text-anchor","middle").attr("class","rect-side-length").text(m(i.plotLength)),x.append("line").attr("x1",r/2).attr("y1",b.Y).attr("x2",r/2).attr("y2",n-b.Y).attr("stroke","#000000").style("stroke-dasharray","3, 3"),x.append("text").attr("x",r/2-5).attr("y",b.Y-10).attr("stroke","#000000").text("N"),x.append("text").attr("x",r/2-5).attr("y",n-b.Y+20).attr("stroke","#000000").text("S"),x.append("line").attr("x1",b.X).attr("y1",n/2).attr("x2",r-b.X).attr("y2",n/2).attr("stroke","#000000").style("stroke-dasharray","3, 3"),x.append("text").attr("x",b.X-20).attr("y",n/2).attr("stroke","#000000").text("W"),x.append("text").attr("x",r-b.X+10).attr("y",n/2).attr("stroke","#000000").text("E"),x.append("rect").attr("x",v.X).attr("y",v.Y).attr("width",u).attr("height",f).attr("stroke","#D03D56").attr("stroke-width",y).attr("fill","transparent").attr("opacity",.5).on("mousemove",function(t,e){Y.style("opacity",1).html("x: ".concat(t.clientX-b.X,", y:").concat(t.clientY-b.Y)).attr("x",t.clientX-b.X).attr("y",t.clientY-b.Y)}).on("mouseover",function(t,e){d.d(this).attr("r",10).style("fill","lightblue").style("opacity",.5)}).on("mouseout",function(t,e){d.d(this).attr("r",10).style("fill","transparent").style("opacity",1),Y.style("opacity",0)}),x.append("rect").attr("id","built-rect-inner").attr("x",v.X+y/2).attr("y",v.Y+y/2).attr("width",u-y).attr("height",f-y).attr("stroke","#776ed3").attr("stroke-width",.5).attr("fill","transparent"),x.append("rect").attr("id","built-rect-outer").attr("x",v.X-y/2).attr("y",v.Y-y/2).attr("width",u+y).attr("height",f+y).attr("stroke","#776ed3").attr("stroke-width",.5).attr("fill","transparent"),h(x,v,f,u,y),x.append("text").attr("x",v.X).attr("y",n/2+8).attr("text-anchor","middle").attr("class","rect-side-breadth").text(m(i.builtupBreadth)).style("text-anchor","start"),x.append("text").attr("x",r/2).attr("y",v.Y).attr("text-anchor","middle").attr("class","rect-side-length").text(m(i.builtupLength)),d.d("svg g").call(k),function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"built-rect-inner",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.25,a=d.d("#".concat(t))._groups[0][0],r=(a.width.baseVal.value,a.height.baseVal.value,[]),n=1/e;console.log("roomsLayout",g);for(var l=0;l<n;l++){var i={roomType:"".concat(l),percent:100*e,wallThick:4};r.push(i)}g=[].concat(r)}()};return Object(r.useEffect)(function(){y()},[e,a]),window.addEventListener("resize",function(){}),n.a.createElement("svg",{id:"main",ref:c})},b=a(185),v=a(202),x=a(203),k=a(204),w=a(205),E=a(199),O=function(t){var e=t.theme,a=t.updateColor,l=Object(r.useState)("#000000"),i=Object(o.a)(l,2),c=i[0],s=(i[1],Object(r.useState)("#800000")),p=Object(o.a)(s,2),d=p[0];p[1];return Object(r.useEffect)(function(){console.log("updateColor",c,d),a(c,d)},[c,d]),n.a.createElement(E.a,{theme:e},n.a.createElement(b.a,null),n.a.createElement(v.a,{sx:{flexGrow:1}},n.a.createElement(x.a,{position:"static"},n.a.createElement(k.a,{disableGutters:!0},n.a.createElement(w.a,{variant:"span",component:"div",sx:{flexGrow:1}},"Plot Layout"),n.a.createElement(v.a,{sx:{flexGrow:1,display:"flex"}},n.a.createElement(w.a,{variant:"span",component:"div",sx:{}},"Plot wall color:"),n.a.createElement(w.a,{variant:"span",component:"div",sx:{}},"Builtup wall color:"))))))},j=a(4),B=a(206),L=a(207),X=a(197),Y=a(196),C=a(208);function T(t){var e=t.props,a=t.theme,l=t.updateCallback,i=Object(r.useState)(Object(c.a)({},e)),s=Object(o.a)(i,2),p=s[0],d=s[1],u=[[{id:"plotLength.ft",title:"Plot Length",value:p.plotLength.ft},{id:"plotLength.inc",value:p.plotLength.inc}],[{id:"plotBreadth.ft",title:"Plot Breadth",value:p.plotBreadth.ft},{id:"plotBreadth.inc",value:p.plotBreadth.inc}],[{id:"pWallTkn.ft",title:"Plot wall thickness",value:p.pWallTkn.ft},{id:"pWallTkn.inc",value:p.pWallTkn.inc}],[{id:"gap.ft",title:"Setback gap",value:p.gap.ft},{id:"gap.inc",value:p.gap.inc}],[{id:"builtupLength.ft",title:"Built-up Length",value:p.builtupLength.ft,readOnly:!0},{id:"builtupLength.inc",value:p.builtupLength.inc,readOnly:!0}],[{id:"builtupBreadth.ft",title:"Built-up breadth",value:p.builtupBreadth.ft,readOnly:!0},{id:"builtupBreadth.inc",value:p.builtupBreadth.inc,readOnly:!0}],[{id:"bWallTkn.ft",title:"Builtup wall thickness",value:p.bWallTkn.ft},{id:"bWallTkn.inc",value:p.bWallTkn.inc}]],h=function(t,e){var a=e.split("."),r=Object(o.a)(a,2),n=r[0],i=r[1],s=Object(j.a)({},i,parseInt(t.target.value)),u=Object(c.a)({},p[n],s),h=Object(c.a)({},p,Object(j.a)({},n,u)),m={builtupBreadth:{ft:h.plotBreadth.ft-2*h.gap.ft,inc:h.plotBreadth.inc-2*h.gap.inc},builtupLength:{ft:h.plotLength.ft-2*h.gap.ft,inc:h.plotLength.inc-2*h.gap.inc}};d(Object(c.a)({},h,m)),console.log("OKK",h,u),l(t,e,p)};return n.a.createElement(E.a,{theme:a},n.a.createElement(b.a,null),n.a.createElement(B.a,{className:"control-list",subheader:n.a.createElement(L.a,{component:"div",id:"nested-list-subheader"},"Area measures")},u.map(function(t,e){var a=Object(o.a)(t,2),r=a[0],l=a[1];return n.a.createElement(X.a,{className:"control-list-items",key:r.id},n.a.createElement(w.a,{variant:"body1"},r.title),n.a.createElement("div",{className:"input-metrics"},n.a.createElement(Y.a,Object.assign({},r,{required:!0,key:r.id,type:"number",InputProps:{readOnly:r.readOnly,style:{width:"4rem",padding:0,fontSize:"0.85rem",marginRight:"5px"},endAdornment:n.a.createElement(C.a,{position:"start",style:{fontSize:"0.75rem"}},"ft")},size:"small",variant:"outlined",onChange:function(t){return h(t,r.id)}})),n.a.createElement(Y.a,Object.assign({},l,{required:!0,key:l.id,type:"number",InputProps:{readOnly:l.readOnly,style:{width:"4rem",padding:0,fontSize:"0.85rem",marginRight:"5px"},endAdornment:n.a.createElement(C.a,{position:"start",style:{fontSize:"0.75rem"}},"in")},size:"small",variant:"outlined",onChange:function(t){return h(t,l.id)}}))))})))}Object(s.a)({palette:{primary:{main:"#0052cc"},secondary:{main:"#edf2ff"}}});var W=Object(s.a)({palette:{mode:"dark"}}),I=function(){var t={plotBreadth:{ft:20,inc:0},plotLength:{ft:30,inc:0},pWallTkn:{ft:0,inc:5},gap:{ft:1,inc:0},bWallTkn:{ft:0,inc:4}};t.builtupBreadth={ft:t.plotBreadth.ft-2*t.gap.ft,inc:t.plotBreadth.inc-2*t.gap.inc},t.builtupLength={ft:t.plotLength.ft-2*t.gap.ft,inc:t.plotLength.inc-2*t.gap.inc};var e=Object(r.useRef)(),a=Object(r.useState)(t),l=Object(o.a)(a,2),i=l[0],s=(l[1],h(t)),p=Object(r.useState)(s),d=Object(o.a)(p,2),u=d[0],m=d[1];return n.a.createElement("div",{className:"App"},n.a.createElement(O,{theme:W,updateColor:function(t,e){m(Object(c.a)({},u,{pWallColor:t,bWallColor:e})),console.log("updateColor",u)}}),n.a.createElement("div",{className:"main-section",ref:e},n.a.createElement(T,{props:i,theme:W,updateCallback:function(t,e,a){var r=h(a);m(r)}}),n.a.createElement(y,{plotDim:u,builtupDim:u,mainRef:e,config:i})))},S=function(t){t&&t instanceof Function&&a.e(1).then(a.bind(null,195)).then(function(e){var a=e.getCLS,r=e.getFID,n=e.getFCP,l=e.getLCP,i=e.getTTFB;a(t),r(t),n(t),l(t),i(t)})};i.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(I,null))),S()}},[[127,3,2]]]);
//# sourceMappingURL=main.7c344dbd.chunk.js.map