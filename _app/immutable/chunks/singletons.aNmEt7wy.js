import{w as u}from"./index.uKdKqA0F.js";import{a as v}from"./paths.RzSekXXP.js";const b="1702916537515",R="sveltekit:snapshot",w="sveltekit:scroll",I="sveltekit:states",S="sveltekit:pageurl",T="sveltekit:history",y="sveltekit:navigation",f={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},_=location.origin;function N(t){if(t instanceof URL)return t;let e=document.baseURI;if(!e){const n=document.getElementsByTagName("base");e=n.length?n[0].href:document.URL}return new URL(t,e)}function U(){return{x:pageXOffset,y:pageYOffset}}function c(t,e){return t.getAttribute(`data-sveltekit-${e}`)}const d={...f,"":f.hover};function g(t){let e=t.assignedSlot??t.parentNode;return e?.nodeType===11&&(e=e.host),e}function L(t,e){for(;t&&t!==e;){if(t.nodeName.toUpperCase()==="A"&&t.hasAttribute("href"))return t;t=g(t)}}function O(t,e){let n;try{n=new URL(t instanceof SVGAElement?t.href.baseVal:t.href,document.baseURI)}catch{}const a=t instanceof SVGAElement?t.target.baseVal:t.target,r=!n||!!a||k(n,e)||(t.getAttribute("rel")||"").split(/\s+/).includes("external"),l=n?.origin===_&&t.hasAttribute("download");return{url:n,external:r,target:a,download:l}}function Y(t){let e=null,n=null,a=null,r=null,l=null,s=null,o=t;for(;o&&o!==document.documentElement;)a===null&&(a=c(o,"preload-code")),r===null&&(r=c(o,"preload-data")),e===null&&(e=c(o,"keepfocus")),n===null&&(n=c(o,"noscroll")),l===null&&(l=c(o,"reload")),s===null&&(s=c(o,"replacestate")),o=g(o);function i(h){switch(h){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:d[a??"off"],preload_data:d[r??"off"],keepfocus:i(e),noscroll:i(n),reload:i(l),replace_state:i(s)}}function p(t){const e=u(t);let n=!0;function a(){n=!0,e.update(s=>s)}function r(s){n=!1,e.set(s)}function l(s){let o;return e.subscribe(i=>{(o===void 0||n&&i!==o)&&s(o=i)})}return{notify:a,set:r,subscribe:l}}function m(){const{set:t,subscribe:e}=u(!1);let n;async function a(){clearTimeout(n);try{const r=await fetch(`${v}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!r.ok)return!1;const s=(await r.json()).version!==b;return s&&(t(!0),clearTimeout(n)),s}catch{return!1}}return{subscribe:e,check:a}}function k(t,e){return t.origin!==_||!t.pathname.startsWith(e)}function x(t){t.client}const P={url:p({}),page:p({}),navigating:u(null),updated:m()};export{T as H,y as N,S as P,w as S,I as a,R as b,Y as c,P as d,f as e,L as f,O as g,x as h,k as i,_ as o,N as r,U as s};
