import{f,g,j as m,d as R}from"./vue.esm-bundler-d4c6f595.js";import{I as c,r as u}from"./theme-47119a85.js";function a(o){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"content";const r=f(),t=f();if(c){const n=new ResizeObserver(e=>{o==null||o(e,n),e.length&&(i==="content"?t.value=e[0].contentRect:t.value=e[0].target.getBoundingClientRect())});g(()=>{n.disconnect()}),m(r,(e,s)=>{s&&(n.unobserve(u(s)),t.value=void 0),e&&n.observe(u(e))},{flush:"post"})}return{resizeRef:r,contentRect:R(t)}}export{a as u};
//# sourceMappingURL=resizeObserver-621ea3d2.js.map