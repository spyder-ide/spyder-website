import{m,f as p}from"../chunks/30.COiS_Q8x.js";import{t as g,b as l,a as u,k as c,c as f,s as d,o as _}from"../chunks/index.CqOW2imm.js";import{s as b}from"../chunks/scheduler.GYTdtgjf.js";import{S as P,i as $,r as w,u as y,v as N,n as S,l as h,w as k}from"../chunks/index.qceZ8qmz.js";import{B as j}from"../chunks/Blog.CJzPSQis.js";const i=1,B=10;async function M(){m.setMetadata({title:`${g} | ${l}`,description:u,keywords:c.join(", "),author:f,url:d,image:_});const{posts:e,totalPages:a}=await p(i,B);return{props:{posts:e,pageNum:i,totalPages:a}}}const v=!0,U=Object.freeze(Object.defineProperty({__proto__:null,load:M,prerender:v},Symbol.toStringTag,{value:"Module"}));function z(e){let a,o;return a=new j({props:{data:e[0],pageNum:e[1],totalPages:e[2]}}),{c(){w(a.$$.fragment)},l(t){y(a.$$.fragment,t)},m(t,s){N(a,t,s),o=!0},p(t,[s]){const n={};s&1&&(n.data=t[0]),s&2&&(n.pageNum=t[1]),s&4&&(n.totalPages=t[2]),a.$set(n)},i(t){o||(S(a.$$.fragment,t),o=!0)},o(t){h(a.$$.fragment,t),o=!1},d(t){k(a,t)}}}function O(e,a,o){let{data:t}=a,s,n;return e.$$set=r=>{"data"in r&&o(0,t=r.data)},e.$$.update=()=>{e.$$.dirty&1&&o(1,s=t.props.pageNum),e.$$.dirty&1&&o(2,n=t.props.totalPages)},[t,s,n]}class A extends P{constructor(a){super(),$(this,a,O,z,b,{data:0})}}export{A as component,U as universal};
