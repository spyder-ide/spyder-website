import{n as l,s as w,y as m,z as q,A as z}from"./CTuBkF5w.js";const c=[];function A(e,o){return{subscribe:k(e,o).subscribe}}function k(e,o=l){let r;const n=new Set;function a(t){if(w(e,t)&&(e=t,r)){const i=!c.length;for(const s of n)s[1](),c.push(s,e);if(i){for(let s=0;s<c.length;s+=2)c[s][0](c[s+1]);c.length=0}}}function b(t){a(t(e))}function f(t,i=l){const s=[t,i];return n.add(s),n.size===1&&(r=o(a,b)||l),t(e),()=>{n.delete(s),n.size===0&&r&&(r(),r=null)}}return{set:a,update:b,subscribe:f}}function T(e,o,r){const n=!Array.isArray(e),a=n?[e]:e;if(!a.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const b=o.length<2;return A(r,(f,t)=>{let i=!1;const s=[];let p=0,d=l;const g=()=>{if(p)return;d();const u=o(n?s[0]:s,f,t);b?f(u):d=z(u)?u:l},h=a.map((u,_)=>m(u,y=>{s[_]=y,p&=~(1<<_),i&&g()},()=>{p|=1<<_}));return i=!0,g(),function(){q(h),d(),i=!1}})}const v=globalThis.__sveltekit_is986p?.base??"",B=globalThis.__sveltekit_is986p?.assets??v;export{B as a,v as b,T as d,k as w};
