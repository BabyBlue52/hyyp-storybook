import{l as u,m,p as e,C as r}from"./vue.esm-bundler-d4c6f595.js";import{_}from"./_plugin-vue_export-helper-c27b6911.js";const d={name:"TimeScale",props:{size:Array},data(){return{}},methods:{update:function(n){n.target.value}}},y={class:"time-scale"},b={class:"list__item"},f={class:"label--radio"},S={class:"list__item"},T={class:"label--radio"},v={class:"list__item"},g={class:"label--radio"},h={class:"list__item"},k={class:"label--radio"};function x(n,a,I,D,N,s){return u(),m("ul",y,[e("li",b,[e("label",f,[e("input",{type:"radio",class:"radio",name:"calendar-size",value:"day",onInput:a[0]||(a[0]=(...t)=>s.update&&s.update(...t))},null,32),r(" Day ")])]),e("li",S,[e("label",T,[e("input",{type:"radio",class:"radio",name:"calendar-size",checked:"",value:"week",onInput:a[1]||(a[1]=(...t)=>s.update&&s.update(...t))},null,32),r(" Week ")])]),e("li",v,[e("label",g,[e("input",{type:"radio",class:"radio",name:"calendar-size",value:"month",onInput:a[2]||(a[2]=(...t)=>s.update&&s.update(...t))},null,32),r(" Month ")])]),e("li",h,[e("label",k,[e("input",{type:"radio",class:"radio",name:"calendar-size",value:"year",onInput:a[3]||(a[3]=(...t)=>s.update&&s.update(...t))},null,32),r(" Year ")])])])}const p=_(d,[["render",x],["__scopeId","data-v-20c483a3"]]);d.__docgenInfo={displayName:"TimeScale",exportName:"default",description:"",tags:{},props:[{name:"size",type:{name:"array"}}],sourceFiles:["/Users/chris/Desktop/HYYP/hyyp-storybook/src/components/Calendar/TimeScale.vue"]};const Y={component:p,title:"Calendar / Time Scale Selector"},z=n=>({components:{TimeScale:p},setup(){return{args:n}},template:'<TimeScale v-bind="args"/>'}),l=z.bind({});l.args={};var o,i,c;l.parameters={...l.parameters,docs:{...(o=l.parameters)==null?void 0:o.docs,source:{originalSource:`args => ({
  components: {
    TimeScale
  },
  setup() {
    return {
      args
    };
  },
  template: '<TimeScale v-bind="args"/>'
})`,...(c=(i=l.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const E=["Default"];export{l as Default,E as __namedExportsOrder,Y as default};
//# sourceMappingURL=TimeScale.stories-852f01ce.js.map
