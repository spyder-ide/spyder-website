import{l as j,n as q,S as E,i as T,x as b,H as D,y as F,a as G,z as J,d as M,A,g as K}from"./index.C9E1geTY.js";import{r as L,s as O,d as P,n as I}from"./environment.CRt8ewUf.js";import{j as Q}from"./30.D_aDrg9a.js";function Y(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function Z(e,s){j(e,1,1,()=>{s.delete(e.key)})}function x(e,s,i,a,g,h,t,n,d,_,c,o){let w=e.length,r=h.length,m=w;const B={};for(;m--;)B[e[m].key]=m;const v=[],k=new Map,z=new Map,H=[];for(m=r;m--;){const l=o(g,h,m),f=i(l);let u=t.get(f);u?H.push(()=>u.p(l,s)):(u=_(f,l),u.c()),k.set(f,v[m]=u),f in B&&z.set(f,Math.abs(m-B[f]))}const N=new Set,S=new Set;function C(l){q(l,1),l.m(n,c),t.set(l.key,l),c=l.first,r--}for(;w&&r;){const l=v[r-1],f=e[w-1],u=l.key,y=f.key;l===f?(c=l.first,w--,r--):k.has(y)?!t.has(u)||N.has(u)?C(l):S.has(y)?w--:z.get(u)>z.get(y)?(S.add(u),C(l)):(N.add(y),w--):(d(f,t),w--)}for(;w--;){const l=e[w];k.has(l.key)||d(l,t)}for(;r;)C(v[r-1]);return L(H),v}function R(e){let s,i,a,g=[{width:e[1]},{height:e[1]},{viewBox:e[2]},{style:a=e[3]?"color: "+e[3]+";":""},{"stroke-width":"0"},{class:e[4]},e[0].a,e[6],{xmlns:"http://www.w3.org/2000/svg"}],h={};for(let t=0;t<g.length;t+=1)h=P(h,g[t]);return{c(){s=b("svg"),i=new D(!0),this.h()},l(t){s=F(t,"svg",{width:!0,height:!0,viewBox:!0,style:!0,"stroke-width":!0,class:!0,xmlns:!0});var n=G(s);i=J(n,!0),n.forEach(M),this.h()},h(){i.a=null,A(s,h)},m(t,n){K(t,s,n),i.m(e[5],s)},p(t,[n]){n&32&&i.p(t[5]),A(s,h=Q(g,[n&2&&{width:t[1]},n&2&&{height:t[1]},n&4&&{viewBox:t[2]},n&8&&a!==(a=t[3]?"color: "+t[3]+";":"")&&{style:a},{"stroke-width":"0"},n&16&&{class:t[4]},n&1&&t[0].a,n&64&&t[6],{xmlns:"http://www.w3.org/2000/svg"}]))},i:I,o:I,d(t){t&&M(s)}}}function U(e,s,i){let{src:a}=s,{size:g="1em"}=s,{viewBox:h=void 0}=s,{color:t="currentColor"}=s,{title:n=void 0}=s,{className:d=""}=s,_,c={};return e.$$set=o=>{"src"in o&&i(0,a=o.src),"size"in o&&i(1,g=o.size),"viewBox"in o&&i(2,h=o.viewBox),"color"in o&&i(3,t=o.color),"title"in o&&i(7,n=o.title),"className"in o&&i(4,d=o.className)},e.$$.update=()=>{e.$$.dirty&9&&(i(6,c={}),t&&(a.a.stroke!=="none"&&i(6,c.stroke="currentColor",c),a.a.fill!=="none"&&i(6,c.fill="currentColor",c))),e.$$.dirty&129&&i(5,_=(n?`<title>${n}</title>`:"")+a.c)},[a,g,h,t,d,_,c,n]}class p extends E{constructor(s){super(),T(this,s,U,R,O,{src:0,size:1,viewBox:2,color:3,title:7,className:4})}}export{p as I,Y as e,Z as o,x as u};
