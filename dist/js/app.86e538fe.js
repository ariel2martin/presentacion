(function(A){function e(e){for(var n,r,i=e[0],s=e[1],c=e[2],u=0,l=[];u<i.length;u++)r=i[u],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&l.push(o[r][0]),o[r]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(A[n]=s[n]);d&&d(e);while(l.length)l.shift()();return a.push.apply(a,c||[]),t()}function t(){for(var A,e=0;e<a.length;e++){for(var t=a[e],n=!0,r=1;r<t.length;r++){var i=t[r];0!==o[i]&&(n=!1)}n&&(a.splice(e--,1),A=s(s.s=t[0]))}return A}var n={},r={app:0},o={app:0},a=[];function i(A){return s.p+"js/"+({datos:"datos"}[A]||A)+"."+{datos:"aa1920c0"}[A]+".js"}function s(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return A[e].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.e=function(A){var e=[],t={datos:1};r[A]?e.push(r[A]):0!==r[A]&&t[A]&&e.push(r[A]=new Promise((function(e,t){for(var n="css/"+({datos:"datos"}[A]||A)+"."+{datos:"86f5d3b4"}[A]+".css",o=s.p+n,a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var c=a[i],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===n||u===o))return e()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){c=l[i],u=c.getAttribute("data-href");if(u===n||u===o)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var n=e&&e.target&&e.target.src||o,a=new Error("Loading CSS chunk "+A+" failed.\n("+n+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=n,delete r[A],d.parentNode.removeChild(d),t(a)},d.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(d)})).then((function(){r[A]=0})));var n=o[A];if(0!==n)if(n)e.push(n[2]);else{var a=new Promise((function(e,t){n=o[A]=[e,t]}));e.push(n[2]=a);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=i(A);var l=new Error;c=function(e){u.onerror=u.onload=null,clearTimeout(d);var t=o[A];if(0!==t){if(t){var n=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;l.message="Loading chunk "+A+" failed.\n("+n+": "+r+")",l.name="ChunkLoadError",l.type=n,l.request=r,t[1](l)}o[A]=void 0}};var d=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(e)},s.m=A,s.c=n,s.d=function(A,e,t){s.o(A,e)||Object.defineProperty(A,e,{enumerable:!0,get:t})},s.r=function(A){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(A,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(A,"__esModule",{value:!0})},s.t=function(A,e){if(1&e&&(A=s(A)),8&e)return A;if(4&e&&"object"===typeof A&&A&&A.__esModule)return A;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:A}),2&e&&"string"!=typeof A)for(var n in A)s.d(t,n,function(e){return A[e]}.bind(null,n));return t},s.n=function(A){var e=A&&A.__esModule?function(){return A["default"]}:function(){return A};return s.d(e,"a",e),e},s.o=function(A,e){return Object.prototype.hasOwnProperty.call(A,e)},s.p="/presentacion/dist/",s.oe=function(A){throw console.error(A),A};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var d=u;a.push([0,"chunk-vendors"]),t()})({0:function(A,e,t){A.exports=t("56d7")},"08e0":function(A,e,t){"use strict";t("cd4c")},"56d7":function(A,e,t){"use strict";t.r(e),t.d(e,"nuxt",(function(){return D}));t("e260"),t("e6cf"),t("cca6"),t("a79d");var n=t("2b0e"),r=function(){var A=this,e=A.$createElement,n=A._self._c||e;return n("v-app",[n("v-navigation-drawer",{staticClass:"fondito",attrs:{app:"",temporary:""},model:{value:A.drawer,callback:function(e){A.drawer=e},expression:"drawer"}},[n("perfect-scrollbar",[n("v-icon",{staticStyle:{"margin-left":"92%",color:"grey"},attrs:{small:""},on:{click:function(e){A.drawer=!A.drawer}}},[A._v(" mdi-close ")]),n("v-list",[n("v-card",{staticStyle:{background:"transparent"}},[n("v-list-item",{staticClass:"pb-3"},[n("v-list-item-avatar",[n("v-img",{attrs:{src:t("aca7")}})],1),n("v-list-item-content",[n("v-list-item-title",[A._v("Ariel Martin")]),n("v-list-item-subtitle",[A._v("ariel2martin@gmail.com")])],1)],1)],1)],1),n("v-divider"),n("v-list",{attrs:{nav:"",dense:""}},A._l(A.items,(function(e,t){return n("v-list-item-group",{key:t,attrs:{color:"primary"},model:{value:A.selectedItem,callback:function(e){A.selectedItem=e},expression:"selectedItem"}},[n("v-list-item",{key:t,attrs:{href:e.href,to:{name:e.href}}},[n("v-list-item-icon",[n("v-icon",{domProps:{textContent:A._s(e.icon)}})],1),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:A._s(e.text)}})],1)],1)],1)})),1)],1)],1),n("v-app-bar",{attrs:{app:""}},[n("v-app-bar-nav-icon",{on:{click:function(e){A.drawer=!A.drawer}}}),n("v-toolbar-title",[A._v("Demo")])],1),n("v-main",[n("v-fade-transition",{attrs:{mode:"out-in"}},[n("router-view")],1)],1)],1)},o=[],a={data:function(){return{drawer:!1,selectedItem:0,items:[{href:"graficodinamico",router:!0,text:"Gráfico dinámico",icon:"mdi-swap-vertical-variant"},{href:"sorteo",router:!0,text:"Grupo de juegos",icon:"mdi-tournament"},{href:"tabla",router:!0,text:"Tabla",icon:"mdi-form-select"},{href:"asign",router:!0,text:"Aplicar",icon:"mdi-shuffle"},{href:"peer",router:!0,text:"Videoconferencia",icon:"mdi-video-outline"}]}}},i=a,s=(t("08e0"),t("2877")),c=Object(s["a"])(i,r,o,!1,null,"a80ba5b2",null),u=c.exports,l=(t("d3b7"),t("3ca3"),t("ddb0"),t("8c4f"));n["default"].use(l["a"]);var d=[{path:"/graficodinamico",name:"graficodinamico",component:function(){return t.e("datos").then(t.bind(null,"edae"))}},{path:"/",name:"Home",component:function(){return t.e("datos").then(t.bind(null,"edae"))}},{path:"./",name:"Prueba",component:function(){return t.e("datos").then(t.bind(null,"b5c8"))}},{path:"presentacion/",name:"Prueba2",component:function(){return t.e("datos").then(t.bind(null,"6419"))}},{path:"/tabla",name:"tabla",component:function(){return t.e("datos").then(t.bind(null,"b5c8"))}},{path:"/asign",name:"asign",component:function(){return t.e("datos").then(t.bind(null,"6419"))}},{path:"/peer",name:"peer",component:function(){return t.e("datos").then(t.bind(null,"e001"))}},{path:"/sorteo",name:"sorteo",component:function(){return t.e("datos").then(t.bind(null,"63fa"))}}],f=new l["a"]({mode:"history",base:"/presentacion/dist/",routes:d}),p=f,m=t("2f62");n["default"].use(m["a"]);var g=new m["a"].Store({state:{},mutations:{},actions:{},modules:{}}),v=t("ce5b"),b=t.n(v),h=(t("bf40"),t("5e4e")),w=t("fcf4");n["default"].use(b.a);var y=new b.a({theme:{dark:!0,options:{customProperties:!0},themes:{light:{primary:"#007BFF",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"},dark:{primary:w["a"].blue.lighten3}}},lang:{locales:{es:h["a"]},current:"es"}}),S=(t("e792"),t("d5e8"),t("5363"),t("a4a1")),B=t.n(S);t("f6b9");n["default"].use(B.a),n["default"].config.productionTip=!1;var D=new n["default"]({});new n["default"]({router:p,store:g,vuetify:y,render:function(A){return A(u)}}).$mount("#app")},aca7:function(A,e){A.exports="data:image/jpeg;base64,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"},cd4c:function(A,e,t){}});
//# sourceMappingURL=app.86e538fe.js.map