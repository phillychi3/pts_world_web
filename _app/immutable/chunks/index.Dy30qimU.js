var T=Object.defineProperty;var U=(t,e,n)=>e in t?T(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var j=(t,e,n)=>U(t,typeof e!="symbol"?e+"":e,n);import{n as w,C as V,f as D,D as q,E as v,F as P,G as O,H as W,I as F,J as z,h as X,K as Y,L as Z,M as tt,N as et,O as A,P as nt,Q as it,R as st,S as rt,T as at}from"./scheduler.IXFySK4N.js";const L=typeof window<"u";let B=L?()=>window.performance.now():()=>Date.now(),M=L?t=>requestAnimationFrame(t):w;const p=new Set;function G(t){p.forEach(e=>{e.c(t)||(p.delete(e),e.f())}),p.size!==0&&M(G)}function H(t){let e;return p.size===0&&M(G),{promise:new Promise(n=>{p.add(e={c:t,f:n})}),abort(){p.delete(e)}}}const b=new Map;let k=0;function ot(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function ft(t,e){const n={stylesheet:q(e),rules:{}};return b.set(t,n),n}function J(t,e,n,i,r,a,u,l=0){const d=16.666/i;let s=`{
`;for(let g=0;g<=1;g+=d){const m=e+(n-e)*a(g);s+=g*100+`%{${u(m,1-m)}}
`}const f=s+`100% {${u(n,1-n)}}
}`,o=`__svelte_${ot(f)}_${l}`,_=V(t),{stylesheet:c,rules:$}=b.get(_)||ft(_,t);$[o]||($[o]=!0,c.insertRule(`@keyframes ${o} ${f}`,c.cssRules.length));const h=t.style.animation||"";return t.style.animation=`${h?`${h}, `:""}${o} ${i}ms linear ${r}ms 1 both`,k+=1,o}function I(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?a=>a.indexOf(e)<0:a=>a.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),k-=r,k||ut())}function ut(){M(()=>{k||(b.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&D(e)}),b.clear())})}let x;function K(){return x||(x=Promise.resolve(),x.then(()=>{x=null})),x}function C(t,e,n){t.dispatchEvent(W(`${e?"intro":"outro"}${n}`))}const S=new Set;let y;function gt(){y={r:0,c:[],p:y}}function yt(){y.r||v(y.c),y=y.p}function ct(t,e){t&&t.i&&(S.delete(t),t.i(e))}function pt(t,e,n,i){if(t&&t.o){if(S.has(t))return;S.add(t),y.c.push(()=>{S.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Q={duration:0};function wt(t,e,n){const i={direction:"in"};let r=e(t,n,i),a=!1,u,l,d=0;function s(){u&&I(t,u)}function f(){const{delay:_=0,duration:c=300,easing:$=F,tick:h=w,css:g}=r||Q;g&&(u=J(t,0,1,c,_,$,g,d++)),h(0,1);const m=B()+_,E=m+c;l&&l.abort(),a=!0,O(()=>C(t,!0,"start")),l=H(R=>{if(a){if(R>=E)return h(1,0),C(t,!0,"end"),s(),a=!1;if(R>=m){const N=$((R-m)/c);h(N,1-N)}}return a})}let o=!1;return{start(){o||(o=!0,I(t),P(r)?(r=r(i),K().then(f)):f())},invalidate(){o=!1},end(){a&&(s(),a=!1)}}}function xt(t,e,n){const i={direction:"out"};let r=e(t,n,i),a=!0,u;const l=y;l.r+=1;let d;function s(){const{delay:f=0,duration:o=300,easing:_=F,tick:c=w,css:$}=r||Q;$&&(u=J(t,1,0,o,f,_,$));const h=B()+f,g=h+o;O(()=>C(t,!1,"start")),"inert"in t&&(d=t.inert,t.inert=!0),H(m=>{if(a){if(m>=g)return c(0,1),C(t,!1,"end"),--l.r||v(l.c),!1;if(m>=h){const E=_((m-h)/o);c(1-E,E)}}return a})}return P(r)?K().then(()=>{r=r(i),s()}):s(),{end(f){f&&"inert"in t&&(t.inert=d),f&&r.tick&&r.tick(1,0),a&&(u&&I(t,u),a=!1)}}}function vt(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Et(t){t&&t.c()}function St(t,e){t&&t.l(e)}function lt(t,e,n){const{fragment:i,after_update:r}=t.$$;i&&i.m(e,n),O(()=>{const a=t.$$.on_mount.map(nt).filter(P);t.$$.on_destroy?t.$$.on_destroy.push(...a):v(a),t.$$.on_mount=[]}),r.forEach(O)}function dt(t,e){const n=t.$$;n.fragment!==null&&(tt(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function _t(t,e){t.$$.dirty[0]===-1&&(it.push(t),st(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ot(t,e,n,i,r,a,u=null,l=[-1]){const d=et;A(t);const s=t.$$={fragment:null,ctx:[],props:a,update:w,not_equal:r,bound:z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(d?d.$$.context:[])),callbacks:z(),dirty:l,skip_bound:!1,root:e.target||d.$$.root};u&&u(s.root);let f=!1;if(s.ctx=n?n(t,e.props||{},(o,_,...c)=>{const $=c.length?c[0]:_;return s.ctx&&r(s.ctx[o],s.ctx[o]=$)&&(!s.skip_bound&&s.bound[o]&&s.bound[o]($),f&&_t(t,o)),_}):[],s.update(),f=!0,v(s.before_update),s.fragment=i?i(s.ctx):!1,e.target){if(e.hydrate){rt();const o=X(e.target);s.fragment&&s.fragment.l(o),o.forEach(D)}else s.fragment&&s.fragment.c();e.intro&&ct(t.$$.fragment),lt(t,e.target,e.anchor),at(),Y()}A(d)}class bt{constructor(){j(this,"$$");j(this,"$$set")}$destroy(){dt(this,1),this.$destroy=w}$on(e,n){if(!P(n))return w;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!Z(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const $t="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add($t);export{bt as S,St as a,pt as b,Et as c,dt as d,yt as e,wt as f,gt as g,xt as h,Ot as i,vt as j,lt as m,ct as t};
