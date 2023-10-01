import{k as u,l as m,m as e,E as r}from"./vue.esm-bundler.12598c06.js";import{_}from"./_plugin-vue_export-helper.cdc0426e.js";const c={name:"TimeScale",props:{size:Array},data(){return{}},methods:{update:function(n){n.target.value}}},y={class:"time-scale"},f={class:"list__item"},b={class:"label--radio"},S={class:"list__item"},T={class:"label--radio"},v={class:"list__item"},g={class:"label--radio"},h={class:"list__item"},k={class:"label--radio"};function x(n,a,I,D,N,s){return u(),m("ul",y,[e("li",f,[e("label",b,[e("input",{type:"radio",class:"radio",name:"calendar-size",value:"day",onInput:a[0]||(a[0]=(...t)=>s.update&&s.update(...t))},null,32),r(" Day ")])]),e("li",S,[e("label",T,[e("input",{type:"radio",class:"radio",name:"calendar-size",checked:"",value:"week",onInput:a[1]||(a[1]=(...t)=>s.update&&s.update(...t))},null,32),r(" Week ")])]),e("li",v,[e("label",g,[e("input",{type:"radio",class:"radio",name:"calendar-size",value:"month",onInput:a[2]||(a[2]=(...t)=>s.update&&s.update(...t))},null,32),r(" Month ")])]),e("li",h,[e("label",k,[e("input",{type:"radio",class:"radio",name:"calendar-size",value:"year",onInput:a[3]||(a[3]=(...t)=>s.update&&s.update(...t))},null,32),r(" Year ")])])])}const p=_(c,[["render",x],["__scopeId","data-v-2a7a8f47"]]);c.__docgenInfo={displayName:"TimeScale",exportName:"default",description:"",tags:{},props:[{name:"size",type:{name:"array"}}],sourceFiles:["/Users/chris/Desktop/HYYP/hyyp-storybook/src/stories/Calendar/TimeScale.vue"]};const Y={component:p,title:"Calendar / Time Scale Selector"},z=n=>({components:{TimeScale:p},setup(){return{args:n}},template:'<TimeScale v-bind="args"/>'}),l=z.bind({});l.args={};var o,i,d;l.parameters={...l.parameters,docs:{...(o=l.parameters)==null?void 0:o.docs,source:{originalSource:`args => ({
  components: {
    TimeScale
  },
  setup() {
    return {
      args
    };
  },
  template: '<TimeScale v-bind="args"/>'
})`,...(d=(i=l.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};const C=["Default"];export{l as Default,C as __namedExportsOrder,Y as default};
//# sourceMappingURL=TimeScale.stories.642b3560.js.map
