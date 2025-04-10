<!--
 * @Author: guoshouying
 * @Date: 2025-04-09 14:41:33
 * @LastEditors: guoshouying
 * @LastEditTime: 2025-04-10 10:44:43
 * @FilePath: \wlh_web_pro\src\components\LogicFlow.vue
-->
<script setup>
import LogicFlow from "@logicflow/core";
// import { RectResize } from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";
import { onMounted, ref } from 'vue';
import UserTaskNode from './node/UserTaskNode';
// 注册扩展
// LogicFlow.use(RectResize);
let container=ref();
let inter=() => {
  console.log('HelloWorld mounted',container.value);
 let  lf = new LogicFlow({
        container: container.value,
        grid: true,
        interaction:{
          resize:true
        }
      });
      lf.register(UserTaskNode);
  lf.render({
  nodes: [
    {
      id: "1",
      type: "user-task-node",
      x: 150,
      y: 100,
      text: "节点1",
      properties:{
        statu:'pass',
        name:'用户任务',
      }
    },
    {
      id: "2",
      type: "circle",
      x: 400,
      y: 200,
      text: "节点2",
    },
    // {
    //   id: "3",
    //   type: "polygon",
    //   x: 400,
    //   y: 400,
    //   text: "polygon",
    // },
    // {
    //   id: "4",
    //   type: "diamond",
    //   x: 510,
    //   y: 410,
    //   text: "polygon",
    // },
    // {
    //   id: "5",
    //   type: "text",
    //   x: 580,
    //   y: 410,
    //   text: "text",
    // },
    // {
    //   id: "6",
    //   type: "html",
    //   x: 610,
    //   y: 410,
    //   text: "html",
    // },
  ],
  edges: [
    {
      sourceNodeId: "1",
      targetNodeId: "2",
      type: "polyline",
      text: "连线",
    },
  ],
});
  // lf.render();
}
defineProps({
  // msg: {
  //   type: String,
  //   required: true,
  // },
})
onMounted(() => {
  console.log('HelloWorld mounted')
      inter();
})
</script>

<template>
 <div class="container" ref="container"></div>
</template>

<style>
.container {
  width: 90vw;
  height: 90vh;
}
</style>
