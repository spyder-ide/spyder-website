import{f as i}from"../chunks/28.D5QBwc6E.js";import{s as m}from"../chunks/scheduler.CZFVEtgY.js";import{S as g,i as u,o as c,p as f,q as l,l as _,t as d,r as P}from"../chunks/index.DjvOVdNM.js";import{B as y}from"../chunks/Blog.Ok4J1JLa.js";let s=10;async function $({params:a}){const e=parseInt(a.page,s)||1,{posts:o,totalPages:t}=await i(e,s);return{props:{posts:o,pageNum:e,totalPages:t}}}async function b(){const{_:a,totalPages:e}=await i(1,s);return Array.from({length:e},(t,n)=>({page:`${n+1}`}))}const N=!0,B=Object.freeze(Object.defineProperty({__proto__:null,entries:b,load:$,prerender:N},Symbol.toStringTag,{value:"Module"}));function S(a){let e,o;return e=new y({props:{data:a[0],pageNum:a[1],totalPages:a[2]}}),{c(){c(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,n){l(e,t,n),o=!0},p(t,[n]){const r={};n&1&&(r.data=t[0]),n&2&&(r.pageNum=t[1]),n&4&&(r.totalPages=t[2]),e.$set(r)},i(t){o||(_(e.$$.fragment,t),o=!0)},o(t){d(e.$$.fragment,t),o=!1},d(t){P(e,t)}}}function h(a,e,o){let{data:t}=e,n,r;return a.$$set=p=>{"data"in p&&o(0,t=p.data)},a.$$.update=()=>{a.$$.dirty&1&&o(1,n=t.props.pageNum),a.$$.dirty&1&&o(2,r=t.props.totalPages)},[t,n,r]}class M extends g{constructor(e){super(),u(this,e,h,S,m,{data:0})}}export{M as component,B as universal};
