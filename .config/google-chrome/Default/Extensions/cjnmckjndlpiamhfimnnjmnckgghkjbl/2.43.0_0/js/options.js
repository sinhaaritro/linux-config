(()=>{"use strict";var e,t={7144:(e,t,o)=>{const n=o(9377),r=o(9560),c=o(4521),s=document.querySelector("#custom-ports"),i=document.querySelector("#custom-rules-container"),u=document.querySelector("#request-timeout"),l=document.querySelector("#debug-mode");function a(){const e=i.querySelectorAll(".custom-rules-row"),t=[],o=[];e.forEach((e=>{const n=e.querySelector("input").value,r=e.querySelector("select").value;try{new RegExp(n)}catch(e){o.push(n)}t.push([n,r])})),t[t.length-1][0].length>0&&(e[e.length-1].querySelector("button").classList.remove("hidden"),d());const n=document.querySelector("#custom-rules-error");if(o.length>0){const e=o.map((e=>`'${e}'`));if(1===e.length)n.textContent=`The following regular expression is invalid: ${e[0]}`;else{const t=e.slice(0,-1).join(", ")+" and "+e.slice(-1);n.textContent=`The following regular expressions are invalid: ${t}`}return void n.classList.remove("hidden")}n.classList.add("hidden");const s=t.filter((e=>e[0].trim().length>0));r.config.set("customRules",s).then(c.noop).catch(c.noop)}function d(e,t){const o=document.createElement("div");o.classList.add("custom-rules-row");const r=document.createElement("input");r.placeholder="Regular expression",r.value=void 0!==e?e:"";const c=document.createElement("select");for(const e of n.parsers){const o=document.createElement("option");o.value=e.constructor.name,o.textContent=e.constructor.name,o.selected=e.constructor.name===t,void 0===t&&n.parsers[0]===e&&(o.selected=!0),c.add(o)}const s=document.createElement("button");s.textContent="X",void 0===e&&s.classList.add("hidden"),s.addEventListener("click",(()=>{s.classList.contains("hidden")||(o.remove(),a())})),r.addEventListener("input",(()=>a())),c.addEventListener("change",(()=>a())),o.appendChild(r),o.appendChild(c),o.appendChild(s),i.appendChild(o)}s.addEventListener("input",(function(){const e=this.value.split(",").map((e=>e.trim())).filter((e=>e.length>0)).map((e=>Number(e))),t=[...new Set(e)],o=document.querySelector("#custom-ports-error");t.some(isNaN)||t.some((e=>e<0))?o.classList.add("hidden"):(o.classList.remove("hidden"),r.config.set("customPorts",t).then(c.noop).catch(c.noop))})),u.addEventListener("input",(function(){const e=this.valueAsNumber;r.config.set("requestTimeout",e<1?1:e).then(c.noop).catch(c.noop)})),l.addEventListener("input",(function(){r.config.set("debugMode",this.checked).then(c.noop).catch(c.noop)})),r.config.get("customPorts").then((e=>{s.value=e.join(",")})).catch(c.noop),r.config.get("customRules").then((e=>{for(const t of e)d(t[0],t[1]);d()})).catch(c.noop),r.config.get("requestTimeout").then((e=>{u.valueAsNumber=e})).catch(c.noop),r.config.get("debugMode").then((e=>{l.checked=e})).catch(c.noop)}},o={};function n(e){var r=o[e];if(void 0!==r)return r.exports;var c=o[e]={exports:{}};return t[e].call(c.exports,c,c.exports,n),c.exports}n.m=t,e=[],n.O=(t,o,r,c)=>{if(!o){var s=1/0;for(a=0;a<e.length;a++){for(var[o,r,c]=e[a],i=!0,u=0;u<o.length;u++)(!1&c||s>=c)&&Object.keys(n.O).every((e=>n.O[e](o[u])))?o.splice(u--,1):(i=!1,c<s&&(s=c));if(i){e.splice(a--,1);var l=r();void 0!==l&&(t=l)}}return t}c=c||0;for(var a=e.length;a>0&&e[a-1][2]>c;a--)e[a]=e[a-1];e[a]=[o,r,c]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={798:0};n.O.j=t=>0===e[t];var t=(t,o)=>{var r,c,[s,i,u]=o,l=0;if(s.some((t=>0!==e[t]))){for(r in i)n.o(i,r)&&(n.m[r]=i[r]);if(u)var a=u(n)}for(t&&t(o);l<s.length;l++)c=s[l],n.o(e,c)&&e[c]&&e[c][0](),e[c]=0;return n.O(a)},o=self.webpackChunkcompetitive_companion=self.webpackChunkcompetitive_companion||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var r=n.O(void 0,[592],(()=>n(7144)));r=n.O(r)})();