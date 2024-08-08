import{t as z,l as A,S as W,i as X,x as Z,H as x,y as p,f as C,D as $,d as k,E as G,b as E,e as H,s as L,c as M,h as Q,a as _,C as u,j as q,o as y,p as J,q as K,r as O,u as ee,v as te,w as ne}from"./index.DjvOVdNM.js";import{r as le,s as V,g as ie,n as R}from"./scheduler.CZFVEtgY.js";import{g as se}from"./index.CXB4hq09.js";import{BsFacebook as fe,BsGithub as ae,BsInstagram as oe,BsMastodon as re,BsTwitterX as he,BsWindows as ue,BsUbuntu as ce,BsApple as ge,BsQuestionCircleFill as me,BsDownload as we}from"./index.D7Jwt5yH.js";function Ae(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function Ce(t,e){z(t,1,1,()=>{e.delete(t.key)})}function Ee(t,e,l,a,n,s,i,o,f,r,w,g){let m=t.length,b=s.length,d=m;const N={};for(;d--;)N[t[d].key]=d;const P=[],S=new Map,h=new Map,D=[];for(d=b;d--;){const c=g(n,s,d),v=l(c);let B=i.get(v);B?D.push(()=>B.p(c,e)):(B=r(v,c),B.c()),S.set(v,P[d]=B),v in N&&h.set(v,Math.abs(d-N[v]))}const F=new Set,T=new Set;function j(c){A(c,1),c.m(o,w),i.set(c.key,c),w=c.first,b--}for(;m&&b;){const c=P[b-1],v=t[m-1],B=c.key,I=v.key;c===v?(w=c.first,m--,b--):S.has(I)?!i.has(B)||F.has(B)?j(c):T.has(I)?m--:h.get(B)>h.get(I)?(T.add(B),j(c)):(F.add(I),m--):(f(v,i),m--)}for(;m--;){const c=t[m];S.has(c.key)||f(c,i)}for(;b;)j(P[b-1]);return le(D),P}function _e(t){let e,l,a,n=[{width:t[1]},{height:t[1]},{viewBox:t[2]},{style:a=t[3]?"color: "+t[3]+";":""},{"stroke-width":"0"},{class:t[4]},t[0].a,t[6],{xmlns:"http://www.w3.org/2000/svg"}],s={};for(let i=0;i<n.length;i+=1)s=ie(s,n[i]);return{c(){e=Z("svg"),l=new x(!0),this.h()},l(i){e=p(i,"svg",{width:!0,height:!0,viewBox:!0,style:!0,"stroke-width":!0,class:!0,xmlns:!0});var o=C(e);l=$(o,!0),o.forEach(k),this.h()},h(){l.a=null,G(e,s)},m(i,o){E(i,e,o),l.m(t[5],e)},p(i,[o]){o&32&&l.p(i[5]),G(e,s=se(n,[o&2&&{width:i[1]},o&2&&{height:i[1]},o&4&&{viewBox:i[2]},o&8&&a!==(a=i[3]?"color: "+i[3]+";":"")&&{style:a},{"stroke-width":"0"},o&16&&{class:i[4]},o&1&&i[0].a,o&64&&i[6],{xmlns:"http://www.w3.org/2000/svg"}]))},i:R,o:R,d(i){i&&k(e)}}}function de(t,e,l){let{src:a}=e,{size:n="1em"}=e,{viewBox:s=void 0}=e,{color:i="currentColor"}=e,{title:o=void 0}=e,{className:f=""}=e,r,w={};return t.$$set=g=>{"src"in g&&l(0,a=g.src),"size"in g&&l(1,n=g.size),"viewBox"in g&&l(2,s=g.viewBox),"color"in g&&l(3,i=g.color),"title"in g&&l(7,o=g.title),"className"in g&&l(4,f=g.className)},t.$$.update=()=>{t.$$.dirty&9&&(l(6,w={}),i&&(a.a.stroke!=="none"&&l(6,w.stroke="currentColor",w),a.a.fill!=="none"&&l(6,w.fill="currentColor",w))),t.$$.dirty&129&&l(5,r=(o?`<title>${o}</title>`:"")+a.c)},[a,n,s,i,f,r,w,o]}class Y extends W{constructor(e){super(),X(this,e,de,_e,V,{src:0,size:1,viewBox:2,color:3,title:7,className:4})}}function be(t){let e,l,a;return l=new Y({props:{src:t[9],size:20}}),{c(){e=H("span"),y(l.$$.fragment),this.h()},l(n){e=M(n,"SPAN",{class:!0});var s=C(e);J(l.$$.fragment,s),s.forEach(k),this.h()},h(){_(e,"class","flex svelte-13pwg5b"),u(e,"icon-left",t[7]==="left")},m(n,s){E(n,e,s),K(l,e,null),a=!0},p(n,s){(!a||s&128)&&u(e,"icon-left",n[7]==="left")},i(n){a||(A(l.$$.fragment,n),a=!0)},o(n){z(l.$$.fragment,n),a=!1},d(n){n&&k(e),O(l)}}}function U(t){let e,l;return{c(){e=H("span"),l=ee(t[4]),this.h()},l(a){e=M(a,"SPAN",{class:!0});var n=C(e);l=te(n,t[4]),n.forEach(k),this.h()},h(){_(e,"class","flex")},m(a,n){E(a,e,n),q(e,l)},p(a,n){n&16&&ne(l,a[4])},d(a){a&&k(e)}}}function ve(t){let e,l,a;return l=new Y({props:{src:t[9],size:20}}),{c(){e=H("span"),y(l.$$.fragment),this.h()},l(n){e=M(n,"SPAN",{class:!0});var s=C(e);J(l.$$.fragment,s),s.forEach(k),this.h()},h(){_(e,"class","flex svelte-13pwg5b"),u(e,"icon-right",t[7]==="right")},m(n,s){E(n,e,s),K(l,e,null),a=!0},p(n,s){(!a||s&128)&&u(e,"icon-right",n[7]==="right")},i(n){a||(A(l.$$.fragment,n),a=!0)},o(n){z(l.$$.fragment,n),a=!1},d(n){n&&k(e),O(l)}}}function Be(t){let e,l,a,n,s=t[10]&&be(t),i=t[4]&&U(t),o=t[11]&&ve(t);return{c(){e=H("a"),s&&s.c(),l=L(),i&&i.c(),a=L(),o&&o.c(),this.h()},l(f){e=M(f,"A",{rel:!0,href:!0,title:!0,target:!0,class:!0});var r=C(e);s&&s.l(r),l=Q(r),i&&i.l(r),a=Q(r),o&&o.l(r),r.forEach(k),this.h()},h(){_(e,"rel",t[3]),_(e,"href",t[2]),_(e,"title",t[5]),_(e,"target",t[6]),_(e,"class","inline-flex items-center justify-center gap-3 text-sm svelte-13pwg5b"),u(e,"button",t[0]),u(e,"w-full",t[8]),u(e,"icon-link",!t[0]),u(e,"hover:text-red-berry-950",!t[0]),u(e,"dark:hover:text-neutral-100",!t[0]),u(e,"highlight",t[0]&&t[1]),u(e,"py-3",t[0]),u(e,"px-5",t[0]),u(e,"rounded",t[0]),u(e,"regular",!t[1])},m(f,r){E(f,e,r),s&&s.m(e,null),q(e,l),i&&i.m(e,null),q(e,a),o&&o.m(e,null),n=!0},p(f,[r]){f[10]&&s.p(f,r),f[4]?i?i.p(f,r):(i=U(f),i.c(),i.m(e,a)):i&&(i.d(1),i=null),f[11]&&o.p(f,r),(!n||r&8)&&_(e,"rel",f[3]),(!n||r&4)&&_(e,"href",f[2]),(!n||r&32)&&_(e,"title",f[5]),(!n||r&64)&&_(e,"target",f[6]),(!n||r&1)&&u(e,"button",f[0]),(!n||r&256)&&u(e,"w-full",f[8]),(!n||r&1)&&u(e,"icon-link",!f[0]),(!n||r&1)&&u(e,"hover:text-red-berry-950",!f[0]),(!n||r&1)&&u(e,"dark:hover:text-neutral-100",!f[0]),(!n||r&3)&&u(e,"highlight",f[0]&&f[1]),(!n||r&1)&&u(e,"py-3",f[0]),(!n||r&1)&&u(e,"px-5",f[0]),(!n||r&1)&&u(e,"rounded",f[0]),(!n||r&2)&&u(e,"regular",!f[1])},i(f){n||(A(s),A(o),n=!0)},o(f){z(s),z(o),n=!1},d(f){f&&k(e),s&&s.d(),i&&i.d(),o&&o.d()}}}function ke(t,e,l){let a={facebook:fe,github:ae,instagram:oe,mastodon:re,twitter:he,windows:ue,linux:ce,mac:ge,unknown:me,download:we},{button:n=!0}=e,{highlight:s=!1}=e,{icon:i=""}=e,{href:o=""}=e,{rel:f=""}=e,{text:r=""}=e,{title:w=r}=e,{target:g="_parent"}=e,{iconPosition:m="right"}=e,{fullwidth:b=!1}=e,d=a[i],N=i!==""&&d!==void 0,P=!!(N&&m==="left"),S=!!(N&&m==="right");return t.$$set=h=>{"button"in h&&l(0,n=h.button),"highlight"in h&&l(1,s=h.highlight),"icon"in h&&l(12,i=h.icon),"href"in h&&l(2,o=h.href),"rel"in h&&l(3,f=h.rel),"text"in h&&l(4,r=h.text),"title"in h&&l(5,w=h.title),"target"in h&&l(6,g=h.target),"iconPosition"in h&&l(7,m=h.iconPosition),"fullwidth"in h&&l(8,b=h.fullwidth)},[n,s,o,f,r,w,g,m,b,d,P,S,i]}class Ie extends W{constructor(e){super(),X(this,e,ke,Be,V,{button:0,highlight:1,icon:12,href:2,rel:3,text:4,title:5,target:6,iconPosition:7,fullwidth:8})}}export{Ie as B,Y as I,Ae as e,Ce as o,Ee as u};