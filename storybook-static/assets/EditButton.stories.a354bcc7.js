import{Y as f,X as B,k as s,l as i,H as r,K as a,E as c,y as E,N as h,O as y,m as d}from"./vue.esm-bundler.12598c06.js";import{_ as b}from"./_plugin-vue_export-helper.cdc0426e.js";import{V as p}from"./VTooltip.1c916a39.js";import"./VOverlay.3a1ad8eb.js";import"./theme.d5a2f491.js";import"./forwardRefs.7b10ae4c.js";import"./anchor.24d870ba.js";import"./color.2739ab01.js";import"./router.ccdb5f0a.js";import"./display.7047da8e.js";import"./locale.3b92fa6f.js";import"./transition.546c36d1.js";const _={name:"EditButton",props:{isActive:Boolean},emits:["toggle-button"]},k=t=>(h("data-v-50f19782"),t=t(),y(),t),x=k(()=>d("svg",{"clip-rule":"evenodd","fill-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[d("path",{d:"m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z","fill-rule":"nonzero"})],-1)),w={key:0},A={key:1};function N(t,n,o,I,T,V){const g=f("tooltip");return B((s(),i("button",{class:E([o.isActive?"active":"edit-btn"]),onClick:n[0]||(n[0]=z=>o.isActive=!o.isActive)},[x,o.isActive==!0?(s(),i("div",w,[r(p,{activator:"parent",location:"right"},{default:a(()=>[c("Edit Mode Enabled")]),_:1})])):(s(),i("div",A,[r(p,{activator:"parent",location:"right"},{default:a(()=>[c("Edit Mode")]),_:1})]))],2)),[[g,"Edit Mode"]])}const v=b(_,[["render",N],["__scopeId","data-v-50f19782"]]);_.__docgenInfo={displayName:"EditButton",exportName:"default",description:"",tags:{},props:[{name:"isActive",type:{name:"boolean"}}],events:[{name:"toggle-button"}],sourceFiles:["/Users/chris/Desktop/HYYP/hyyp-storybook/src/stories/Buttons/EditButton.vue"]};const $={component:v,title:"Buttons / Edit Button",argTypes:{onToggle:Boolean}},D=t=>({components:{EditButton:v},setup(){return{args:t}},template:'<EditButton v-bind="args"/>'}),e=D.bind({});e.args={isActive:!1};var l,m,u;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`args => ({
  components: {
    EditButton
  },
  setup() {
    return {
      args
    };
  },
  template: '<EditButton v-bind="args"/>'
})`,...(u=(m=e.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const q=["Default"];export{e as Default,q as __namedExportsOrder,$ as default};
//# sourceMappingURL=EditButton.stories.a354bcc7.js.map
