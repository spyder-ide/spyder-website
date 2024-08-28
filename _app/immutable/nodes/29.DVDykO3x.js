import{s as W,o as X,n as B}from"../chunks/scheduler.CZFVEtgY.js";import{S as Y,i as Z,e as b,s as H,c as x,f as P,h as L,d as p,a as k,b as g,j as y,t as C,k as T,l as w,g as E,m as j,n as tt,o as A,p as O,q as U,r as z,u as M,v as q,w as et}from"../chunks/index.CNd5CZrX.js";import{e as R,B as Q}from"../chunks/Button.Bg-1Yv3Z.js";import{r as S}from"../chunks/index.BMEkiqFO.js";import{L as nt}from"../chunks/Loader.lmq2X6M7.js";function F(m,t,r){const e=m.slice();return e[8]=t[r],e}function lt(m){let t,r;return t=new nt({}),{c(){A(t.$$.fragment)},l(e){O(t.$$.fragment,e)},m(e,s){U(t,e,s),r=!0},p:B,i(e){r||(w(t.$$.fragment,e),r=!0)},o(e){C(t.$$.fragment,e),r=!1},d(e){z(t,e)}}}function rt(m){let t,r="Download started…",e,s,c,i,f,a,h,n,l=`If the download does not start automatically, please click the button
      below`,o,_,v,V,$,G=`Alternatively, you can manually select the package you want from the links
      below, or visit our <a href="https://github.com/spyder-ide/spyder/releases" target="_blank">releases page</a> on GitHub.`,I;return v=new Q({props:{highlight:!0,text:"Download for "+m[1],icon:m[0],href:m[2],target:"_blank",rel:"noopener noreferrer"}}),{c(){t=b("h1"),t.textContent=r,e=H(),s=b("h2"),c=M("Selected "),i=b("span"),f=M(m[1]),a=M(`
      or compatible`),h=H(),n=b("p"),n.textContent=l,o=H(),_=b("div"),A(v.$$.fragment),V=H(),$=b("p"),$.innerHTML=G,this.h()},l(u){t=x(u,"H1",{class:!0,"data-svelte-h":!0}),E(t)!=="svelte-idj4d1"&&(t.textContent=r),e=L(u),s=x(u,"H2",{class:!0});var d=P(s);c=q(d,"Selected "),i=x(d,"SPAN",{class:!0});var D=P(i);f=q(D,m[1]),D.forEach(p),a=q(d,`
      or compatible`),d.forEach(p),h=L(u),n=x(u,"P",{class:!0,"data-svelte-h":!0}),E(n)!=="svelte-azqad0"&&(n.textContent=l),o=L(u),_=x(u,"DIV",{class:!0});var N=P(_);O(v.$$.fragment,N),N.forEach(p),V=L(u),$=x(u,"P",{class:!0,"data-svelte-h":!0}),E($)!=="svelte-ciqt58"&&($.innerHTML=G),this.h()},h(){k(t,"class","text-center text-4xl font-extralight mb-16"),k(i,"class","text-red-berry-900 dark:text-white font-semibold"),k(s,"class","text-center dark:text-neutral-200 text-2xl font-light mb-4"),k(n,"class","text-sm text-neutral-500 text-center"),k(_,"class","block my-6 text-center"),k($,"class","text-neutral-500 text-center")},m(u,d){g(u,t,d),g(u,e,d),g(u,s,d),y(s,c),y(s,i),y(i,f),y(s,a),g(u,h,d),g(u,n,d),g(u,o,d),g(u,_,d),U(v,_,null),g(u,V,d),g(u,$,d),I=!0},p(u,d){(!I||d&2)&&et(f,u[1]);const D={};d&2&&(D.text="Download for "+u[1]),d&1&&(D.icon=u[0]),d&4&&(D.href=u[2]),v.$set(D)},i(u){I||(w(v.$$.fragment,u),I=!0)},o(u){C(v.$$.fragment,u),I=!1},d(u){u&&(p(t),p(e),p(s),p(h),p(n),p(o),p(_),p(V),p($)),z(v)}}}function ot(m){let t,r="Please select the package you want from the links below",e,s,c='Or visit our <a href="https://github.com/spyder-ide/spyder/releases">releases page</a> on GitHub.';return{c(){t=b("h1"),t.textContent=r,e=H(),s=b("p"),s.innerHTML=c,this.h()},l(i){t=x(i,"H1",{class:!0,"data-svelte-h":!0}),E(t)!=="svelte-1ccltz"&&(t.textContent=r),e=L(i),s=x(i,"P",{class:!0,"data-svelte-h":!0}),E(s)!=="svelte-14mxf5g"&&(s.innerHTML=c),this.h()},h(){k(t,"class","text-4xl font-extralight text-center"),k(s,"class","text-neutral-500 text-center mt-4")},m(i,f){g(i,t,f),g(i,e,f),g(i,s,f)},p:B,i:B,o:B,d(i){i&&(p(t),p(e),p(s))}}}function J(m){let t,r,e="Available for",s,c,i,f=R(m[3]),a=[];for(let n=0;n<f.length;n+=1)a[n]=K(F(m,f,n));const h=n=>C(a[n],1,1,()=>{a[n]=null});return{c(){t=b("div"),r=b("div"),r.textContent=e,s=H(),c=b("div");for(let n=0;n<a.length;n+=1)a[n].c();this.h()},l(n){t=x(n,"DIV",{class:!0});var l=P(t);r=x(l,"DIV",{class:!0,"data-svelte-h":!0}),E(r)!=="svelte-1b2cxk2"&&(r.textContent=e),s=L(l),c=x(l,"DIV",{class:!0});var o=P(c);for(let _=0;_<a.length;_+=1)a[_].l(o);o.forEach(p),l.forEach(p),this.h()},h(){k(r,"class","text-neutral-500 font-medium mt-4 text-center"),k(c,"class","mx-auto max-w-48 sm:max-w-md mt-4 mb-5 grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-4"),k(t,"class","border-t border-t-mine-shaft-300 dark:border-t-mine-shaft-600 mt-8")},m(n,l){g(n,t,l),y(t,r),y(t,s),y(t,c);for(let o=0;o<a.length;o+=1)a[o]&&a[o].m(c,null);i=!0},p(n,l){if(l&8){f=R(n[3]);let o;for(o=0;o<f.length;o+=1){const _=F(n,f,o);a[o]?(a[o].p(_,l),w(a[o],1)):(a[o]=K(_),a[o].c(),w(a[o],1),a[o].m(c,null))}for(j(),o=f.length;o<a.length;o+=1)h(o);T()}},i(n){if(!i){for(let l=0;l<f.length;l+=1)w(a[l]);i=!0}},o(n){a=a.filter(Boolean);for(let l=0;l<a.length;l+=1)C(a[l]);i=!1},d(n){n&&p(t),tt(a,n)}}}function K(m){let t,r;return t=new Q({props:{highlight:m[8].highlight,icon:m[8].icon,text:m[8].text,href:m[8].href}}),{c(){A(t.$$.fragment)},l(e){O(t.$$.fragment,e)},m(e,s){U(t,e,s),r=!0},p(e,s){const c={};s&8&&(c.highlight=e[8].highlight),s&8&&(c.icon=e[8].icon),s&8&&(c.text=e[8].text),s&8&&(c.href=e[8].href),t.$set(c)},i(e){r||(w(t.$$.fragment,e),r=!0)},o(e){C(t.$$.fragment,e),r=!1},d(e){z(t,e)}}}function st(m){let t,r,e,s,c;const i=[ot,rt,lt],f=[];function a(n,l){return n[0]==="unknown"?0:n[0]!=="unknown"?1:2}r=a(m),e=f[r]=i[r](m);let h=m[3]&&J(m);return{c(){t=b("div"),e.c(),s=H(),h&&h.c(),this.h()},l(n){t=x(n,"DIV",{class:!0});var l=P(t);e.l(l),s=L(l),h&&h.l(l),l.forEach(p),this.h()},h(){k(t,"class","download container max-w-2xl mt-32")},m(n,l){g(n,t,l),f[r].m(t,null),y(t,s),h&&h.m(t,null),c=!0},p(n,[l]){let o=r;r=a(n),r===o?f[r].p(n,l):(j(),C(f[o],1,1,()=>{f[o]=null}),T(),e=f[r],e?e.p(n,l):(e=f[r]=i[r](n),e.c()),w(e,1),e.m(t,s)),n[3]?h?(h.p(n,l),l&8&&w(h,1)):(h=J(n),h.c(),w(h,1),h.m(t,null)):h&&(j(),C(h,1,1,()=>{h=null}),T())},i(n){c||(w(e),w(h),c=!0)},o(n){C(e),C(h),c=!1},d(n){n&&p(t),f[r].d(),h&&h.d()}}}function at(m,t,r){let e="unknown",s="unknown",c="unknown",i="",f=[],a=l=>{for(let o in l)for(let _ in l[o])l[o][_]&&(r(1,c=l[o][_].name),r(2,i=l[o][_].link),f.push({highlight:!0,icon:o,text:c,href:i}));return f};const h=()=>{let l,o;const _=new URLSearchParams(window.location.search);return l=_.get("os"),o=_.get("arch"),!l||!o?!1:{os:l,arch:o}};let n=()=>{const l=h();l&&(r(0,s=l.os),r(4,e=l.arch),S[s][e]&&(r(1,c=S[s][e].name),r(2,i=S[s][e].link)),i&&(window.location=i))};return X(()=>{n(),r(3,f=a(S))}),m.$$.update=()=>{var l,o,_,v;m.$$.dirty&17&&r(1,c=((o=(l=S[s])==null?void 0:l[e])==null?void 0:o.name)??""),m.$$.dirty&17&&r(2,i=((v=(_=S[s])==null?void 0:_[e])==null?void 0:v.link)??"")},[s,c,i,f,e]}class mt extends Y{constructor(t){super(),Z(this,t,at,st,W,{})}}export{mt as component};
