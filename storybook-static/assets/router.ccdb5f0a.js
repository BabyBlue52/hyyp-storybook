import{e as r,a8 as g,_ as l,n as v,S}from"./vue.esm-bundler.12598c06.js";import{p as d,a as u,O as f,g as b,I as x}from"./theme.d5a2f491.js";const E=d({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension");function N(e){return{dimensionStyles:r(()=>({height:u(e.height),maxHeight:u(e.maxHeight),maxWidth:u(e.maxWidth),minHeight:u(e.minHeight),minWidth:u(e.minWidth),width:u(e.width)}))}}function W(){var e,n;return(n=(e=b("useRouter"))==null?void 0:e.proxy)==null?void 0:n.$router}function y(e,n){const a=g("RouterLink"),i=r(()=>!!(e.href||e.to)),s=r(()=>(i==null?void 0:i.value)||f(n,"click")||f(e,"click"));if(typeof a=="string")return{isLink:i,isClickable:s,href:l(e,"href")};const t=e.to?a.useLink(e):void 0;return{isLink:i,isClickable:s,route:t==null?void 0:t.route,navigate:t==null?void 0:t.navigate,isActive:t&&r(()=>{var c,o;return e.exact?(c=t.isExactActive)==null?void 0:c.value:(o=t.isActive)==null?void 0:o.value}),href:r(()=>e.to?t==null?void 0:t.route.value.href:e.href)}}const H=d({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router");let h=!1;function k(e,n){let a=!1,i,s;x&&(v(()=>{window.addEventListener("popstate",t),i=e==null?void 0:e.beforeEach((c,o,m)=>{h?a?n(m):m():setTimeout(()=>a?n(m):m()),h=!0}),s=e==null?void 0:e.afterEach(()=>{h=!1})}),S(()=>{window.removeEventListener("popstate",t),i==null||i(),s==null||s()}));function t(c){var o;(o=c.state)!=null&&o.replaced||(a=!0,setTimeout(()=>a=!1))}}export{H as a,y as b,W as c,k as d,E as m,N as u};
//# sourceMappingURL=router.ccdb5f0a.js.map
