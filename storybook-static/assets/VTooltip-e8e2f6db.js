import{b as e,f as y,K as u,A as S}from"./vue.esm-bundler-3c3b4f83.js";import{m as h,u as O,V as d}from"./VOverlay-139fd8f8.js";import{f as T}from"./forwardRefs-188994b8.js";import{u as x}from"./locale-eae6cb20.js";import{b as A,o as k,l as w,n as C,u as I}from"./theme-43348865.js";const R=A({id:String,text:String,...k(h({closeOnBack:!1,location:"end",locationStrategy:"connected",eager:!0,minWidth:0,offset:10,openOnClick:!1,openOnHover:!0,origin:"auto",scrim:!1,scrollStrategy:"reposition",transition:!1}),["absolute","persistent"])},"VTooltip"),H=w()({name:"VTooltip",props:R(),emits:{"update:modelValue":t=>!0},setup(t,m){let{slots:o}=m;const n=x(t,"modelValue"),{scopeId:v}=O(),f=C(),r=e(()=>t.id||`v-tooltip-${f}`),l=y(),g=e(()=>t.location.split(" ").length>1?t.location:t.location+" center"),V=e(()=>t.origin==="auto"||t.origin==="overlap"||t.origin.split(" ").length>1||t.location.split(" ").length>1?t.origin:t.origin+" center"),P=e(()=>t.transition?t.transition:n.value?"scale-transition":"fade-transition"),b=e(()=>u({"aria-describedby":r.value},t.activatorProps));return I(()=>{const[p]=d.filterProps(t);return S(d,u({ref:l,class:["v-tooltip",t.class],style:t.style,id:r.value},p,{modelValue:n.value,"onUpdate:modelValue":a=>n.value=a,transition:P.value,absolute:!0,location:g.value,origin:V.value,persistent:!0,role:"tooltip",activatorProps:b.value,_disableGlobalStack:!0},v),{activator:o.activator,default:function(){var c;for(var a=arguments.length,s=new Array(a),i=0;i<a;i++)s[i]=arguments[i];return((c=o.default)==null?void 0:c.call(o,...s))??t.text}})}),T({},l)}});export{H as V};
//# sourceMappingURL=VTooltip-e8e2f6db.js.map
