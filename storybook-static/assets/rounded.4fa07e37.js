import{e as u,I as o}from"./vue.esm-bundler.12598c06.js";import{p as d,v as a}from"./theme.d5a2f491.js";const l=d({rounded:{type:[Boolean,Number,String],default:void 0}},"rounded");function c(n){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:a();return{roundedClasses:u(()=>{const e=o(n)?n.value:n.rounded,s=[];if(e===!0||e==="")s.push(`${r}--rounded`);else if(typeof e=="string"||e===0)for(const t of String(e).split(" "))s.push(`rounded-${t}`);return s})}}export{l as m,c as u};
//# sourceMappingURL=rounded.4fa07e37.js.map
