import{n as l,s as v,y as w,z as m,A as q}from"./CTuBkF5w.js";const c=[];function z(e,i){return{subscribe:A(e,i).subscribe}}function A(e,i=l){let r;const n=new Set;function u(t){if(v(e,t)&&(e=t,r)){const o=!c.length;for(const s of n)s[1](),c.push(s,e);if(o){for(let s=0;s<c.length;s+=2)c[s][0](c[s+1]);c.length=0}}}function f(t){u(t(e))}function b(t,o=l){const s=[t,o];return n.add(s),n.size===1&&(r=i(u,f)||l),t(e),()=>{n.delete(s),n.size===0&&r&&(r(),r=null)}}return{set:u,update:f,subscribe:b}}function T(e,i,r){const n=!Array.isArray(e),u=n?[e]:e;if(!u.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const f=i.length<2;return z(r,(b,t)=>{let o=!1;const s=[];let p=0,d=l;const g=()=>{if(p)return;d();const a=i(n?s[0]:s,b,t);f?b(a):d=q(a)?a:l},h=u.map((a,_)=>w(a,y=>{s[_]=y,p&=~(1<<_),o&&g()},()=>{p|=1<<_}));return o=!0,g(),function(){m(h),d(),o=!1}})}const k=globalThis.__sveltekit_funvp5?.base??"",B=globalThis.__sveltekit_funvp5?.assets??k;export{B as a,k as b,T as d,A as w};
