<script setup lang="ts">
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import { onMounted, reactive, ref } from "vue";
import UserTaskNode from "./node/UserTaskNode";
import CircleNode from "./node/CircleNode";
import UserTaskHtml from "./node/UserTaskHtml";
import UserTaskVue from "./node/UserTaskVue";
import customEdge from "./edge/customEdge";
import { Menu,lfJson2Xml } from "@logicflow/extension";
import { DndPanel, Control, MiniMap,Snapshot } from "@logicflow/extension";
import "@logicflow/extension/lib/style/index.css";
LogicFlow.use(Menu);
LogicFlow.use(DndPanel);
LogicFlow.use(Control);
// 注册 miniMap 扩展
LogicFlow.use(MiniMap);
LogicFlow.use(Snapshot);
   // 手动触发矩形节点拖拽
let  startDragRect = (lf) => {
  lf.dnd.startDrag({
    type: 'rect',
    text: '矩形节点',
    width: 100,
    height: 60
  });
};
// 手动触发圆形节点拖拽
let startDragCircle =(lf) => {
  lf.dnd.startDrag({
    type: 'circle',
    text: '圆形节点',
    properties: {
      backgroundColor: '#52c41a'
    }, 
    r: 30  // 圆形半径
  });
};
 // 手动触发自定义节点拖拽
 let startDragCustom = (lf) => {
  lf.dnd.startDrag({
    type: 'user-task-node',
    text: '自定义节点',
    properties: {
      customProp: 'value'
    },
    width: 120,
    height: 80,
    x:200,
    y:200
  });
};
// 注册扩展
let container = ref();
let lf = reactive(null);
let inter = () => {
  console.log("HelloWorld mounted", container.value);
  lf = new LogicFlow({
    container: container.value,
    grid: true,
    style: {
      circle: {
        fill: "#42608d",
        stroke: "pink",
        strokeWidth: 2,
      },
      baseEdge: {
        stroke: "#42608d",
        strokeWidth: 2,
      },
    },
    keyboard: {
      enabled: true,
    },
  });
  // 注册UserTaskNode组件
  lf.register(UserTaskNode);
  lf.register(CircleNode);
  // 注册UserTaskHtml组件
  lf.register(UserTaskHtml);
  // 注册customEdge组件
  lf.register(customEdge);
  // 注册UserTaskVue组件
  lf.register(UserTaskVue);
  // lf.setDefaultEdgeType('custom-edge');
  // 设置拖放面板中的项目
  lf.extension.dndPanel.setPatternItems([
    {
      type: "circle",
      text: "开始",
      label: "开始节点",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==",
      // icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAqCAMAAAAqEZ1jAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAhOAAAITgBRZYxYAAAAKJQTFRFAAAAenb/RpP/k2j/XXf7cXX6P5z7i2n8W3j7ZHP7jmn9VID7Qpf8jWn8Xnr6iWr8YHb7i2n8RJb9dWz8WXr8mWj9RpP8W3n8bW/8l2j+QJz9Q5f9ToT8fWv9ZW/8lWj9VID8YnX7Pp79QZr9pWb+RJT8m2f9k2j9SYz8jWn9hmr8UIT8fmv8VX78Xnn7d2z8ZHT7WHr7bm77Xnb7Z3D7YHH7RJOQRAAAACJ0Uk5TABAgICAwQEBAWF5gZXBwgICbn5+fo7+/vsLP39/f3urv73XwOA8AAAKfSURBVHja7dbJcuIwFIXhIzCxMTMNcdwMDoMZY4NxeP9X66srEckYQlPVvcvPBhZ8dVSIAvz03xNV/Luq4Xq9Hgo8nfDqjXq97hS1yXZNhXg2Z3o+f1KnLqx62y17Pp5smp+158EUaW6I52rkxLF3eoNpt1Ne+bR+Fd8U5Oc8Px6P5M0Evgq11ytpy0jgbk6e5cSxd2pb7yKOikpTouWyhbsNMsnpefZpOzsCI7c8brkM74/LqFSC7HkwVTu9lsB14ZJy745LlDdV5+3iQTXC7s9z3pNEggOh9s3woOFqJT2BmzUSLnMQEEeeh2+rkraiOrjZeL+XXEBwyp71Ybg+hWL+iltGt8ftKQI9QMzSlDxz9VofssIMdxitdJEvbo3jxqAGKXtt6N4OkpvgkmiFa50Ch1UU8zab/Ya4Br/IUnnewHCHg+FEh7/ExUIXdq+KG4N7z3hfzXDkaa5FmGpdMENrYWWjaoDrJtJLu4ajFFfbUduryN1ue4brb2KpjSvgvETe53R24U6Ggz+RYJnsCTMujmMJ9qELErkv9y7cyXAGtNCoI2Dqx9ymAl1bcYMLJ2NO5fZ2dmHLxiBGrJlxEAl7M1HkTFUzseeiWHOxYK+CrwLltRX3qTk7/4PbTXDdaBHLxytMdcllaaA56U1RSEyU56M0jotfYBLvynM091ni0GGtPO73nLkR7AaK6yqOKnG1g+wXrnqZz9nrw87bszdjjn/dDGffbgdX9YmT4HykaoLTp/UABGfyypx7a1yFNb0wpl7BddW8geSO5JU5TE63xhmOPb2uok8reN1Nrn4qjQNBlmfdvkB5beaoMgdP4LpFgbNuX3svtSwABoZ7WPOKa0Inxgl7DurMdfFXVV7savjK8WQ1/cz5+Q9e7A/jUZeiPQO0fwAAAABJRU5ErkJggg=="
    },
    {
      type: "user-task-node",
      label: "自定义矩形",
      text: "自定义矩形文字",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==",
      className: "important-node",
    },
    {
      type: "useTaskHtml",
      label: "自定义html",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==",
      className: "important-node",
    },
    {
      type: "useTaskVue",
      label: "自定义vue",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==",
      className: "import_icon",
    },
    {
      type: "diamond",
      label: "条件判断",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
    },
    {
      type: "custom-circle",
      text: "结束",
      label: "结束节点",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC",
      // style: {
      //   fill: "#00AAFF", // 蓝色填充
      //   stroke: "#0088CC", // 深蓝色边框
      //   strokeWidth: 2,
      // },
      // text: {
      //   color: "#FFFFFF", // 白色文字
      // },
    },
  ]);

  lf.extension.control.addItem({
    key: "mini-map",
    iconClass: "custom-minimap",
    title: "sdd",
    text: "导航",
    onMouseEnter: (lf, ev) => {
      const position = lf.getPointByClient(ev.x, ev.y);
      lf.extension.miniMap.show(
        position.domOverlayPosition.x - 120,
        position.domOverlayPosition.y + 35
      );
    },
    onClick: (lf, ev) => {
      const position = lf.getPointByClient(ev.x, ev.y);
      lf.extension.miniMap.show(
        position.domOverlayPosition.x - 120,
        position.domOverlayPosition.y + 35
      );
    },
  });
  lf.extension.control.addItem({
    key: "mini-map1",
    iconClass: "custom-save",
    title: "sdd",
    text: "保存",
    onClick: (lf, ev) => {
      console.log("点击了mini-map1");
      const graphData = lf.getGraphData(); // 获取画布数据
      console.log(graphData); // 输出节点和边的 JSON 数据
      localStorage.setItem("graphData", JSON.stringify(graphData)); // 将数据存储到 localStorage
      // alert("保存成功");
    },
  });
  lf.extension.control.addItem({
    key: "mini-map1",
    iconClass: "custom-save",
    title: "sdd",
    text: "设置初始画布内容",
    onClick: (lf, ev) => {
      console.log("设置初始画布内容onClick");
      let data = localStorage.getItem("graphData");
      lf.render(JSON.parse(data)); // 渲染数据到画布
    },
  });
  // 为菜单追加选项（必须在 lf.render() 之前设置）
lf.extension.menu.addMenuConfig({
  nodeMenu: [
    {
      text: "分享",
      callback() {
        alert("分享成功！");
      },
    },
    {
      text: "属性",
      callback(node:any) {
        alert(`
          节点id：${node.id}
          节点类型：${node.type}
          节点坐标：(x: ${node.x}, y: ${node.y})`);
      },
    },
  ],
  edgeMenu: [
    {
      text: "属性",
      callback(edge: any) {
        alert(`
          边id：${edge.id}
          边类型：${edge.type}
          边坐标：(x: ${edge.x}, y: ${edge.y})
          源节点id：${edge.sourceNodeId}
          目标节点id：${edge.targetNodeId}`);
      },
    },
  ],
  graphMenu: [
    {
      text: "分享",
      callback() {
        alert("分享成功！");
      },
    },
  ],
});
  // 监听节点点击事件
  //  lf.value.on('node:click', ({ data }) => {
  //         console.log('点击的节点数据:', data);
  //         // 设置节点的属性（例如修改颜色）
  //         data.properties = { ...data.properties, color: 'blue' };
  //         lf.value.updateNodeAttr(data.id, { properties: data.properties }); // 更新节点属性
  //       });
/*   lf.on("node:click", (data) => {
    // console.log("node:click", data.position);
    console.log("点击的节点数据:", data.data);
    data = data.data;
    lf.setProperties(data.id, {
      age: "12",
    });
    console.log(lf.getProperties(data.id));
    // console.log(data.properties)
  }); */
  // lf.on("node:dnd-add", (data) => {
  //   // console.log("node:click", data.position);
  //   console.log("node:dnd-add:外部拖入节点添加时触发", data.data);
  //   // console.log(data.properties)
  // });
  // lf.on("node:dnd-drag", (data) => {
  //   // console.log("node:click", data.position);
  //   console.log("node:dnd-drag:外部拖入节点拖拽中触发", data.data);
  //   // console.log(data.properties)
  // });

  lf.extension.control.addItem({
    key: "mini-map2",
    iconClass: "custom-clear",
    title: "sdd",
    text: "清空画布",
    onClick: (lf, ev) => {
      console.log("点击了mini-map1");
      lf.clearData();
    },
  });
  lf.extension.control.addItem({
    key: "mini-map3",
    iconClass: "custom-downloadImg",
    title: "sdd",
    text: "导出图片",
    onClick: (lf, ev) => {
      console.log("lf.getSnapshot();=======");
      lf.getSnapshot();
      const getSnapshotBase64 = lf.getSnapshotBase64().then((res)=>{
        console.log("getSnapshotBase64",res.data);
      })
      // let fff=lf.getPng();
    },
  });
  lf.on("connection:not-allowed", (msg) => {
      console.log(msg);
    });
  lf.setTheme({
    circle: {
      stroke: "#a3c0a5", // 边框颜色
      fill: "#10a81c", // 填充颜色
      strokeWidth: 2,
    },
    nodeText: {
      color: "#000", // 全局节点文字颜色（红色）
      fontSize: 14,
      overflowMode: "ellipsis", // 文字溢出处理
    },
    edgeText: {
      fill: "#42608d",
      fontSize: 20,
    },
  });
  lf.render({
    nodes: [
      {
        id: "1",
        type: "user-task-node",
        x: 150,
        y: 100,
        text: "用户任务",
        properties: {
          statu: "pass",
          name: "用户任务",
        },
      },
      {
        id: "2",
        type: "circle",
        x: 400,
        y: 200,
        text: "节点2",
      },
      {
        id: "3",
        type: "useTaskHtml",
        x: 400,
        y: 400,
        text: "polygon",
      },
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
      // {
      //   sourceNodeId: "1",
      //   targetNodeId: "2",
      //   type: "polyline",
      //   text: "连线",
      // },
      {
        sourceNodeId: "1",
        targetNodeId: "2",
        type: "custom-edge",
        text: "连线",
      },
    //   {
    //   sourceNodeId: "1",
    //   targetNodeId: "3",
    //   type: "bezier",
    //   startPoint: {
    //     x: 150,
    //     y: 100
    //   },
    //  }
    ],
  });
//     // 监听拖拽结束事件
// lf.on("node:dnd-dragend", (data) => {
//   console.log("node:dnd-dragend: 拖拽结束", data.data);
//   // 这里可以处理拖拽结束后的逻辑，比如保存节点位置或触发其他操作
 
//   // 示例：获取拖拽后的节点位置
//   const nodeModel = data.data.nodeModel; // 拖拽的节点模型
//   if (nodeModel) {
//     console.log("节点新位置:", nodeModel.x, nodeModel.y);
//     // 你可以在这里将新位置发送到后端保存
//   }
// });
// // 监听拖拽中事件
// lf.on("node:dnd-drag", (data) => {
//   console.log("node:dnd-drag: 外部拖入节点拖拽中触发", data.data);
//   // lf.dnd.stopDrag(); // 鼠标释放时结束拖拽
//   // 这里可以处理拖拽中的逻辑，比如动态更新预览位置
// });
// lf.on('node:dnd-add', ({ data }) => {
//   console.log('节点已添加:', data);
//   // 可以在这里修改节点属性
//   lf.setProperties(data.id, {
//     customProp: 'value'
//   });
// });
};
defineProps({
  // msg: {
  //   type: String,
  //   required: true,
  // },
});
onMounted(() => {
  console.log("HelloWorld mounted");
  inter();
});
</script>

<template>
  <div id="div"><span>FSDF</span></div>
   <!-- 自定义按钮区域 -->
   <div class="custom-toolbar">
      <button @mousedown="startDragRect(lf)" >拖拽矩形</button>
      <button @mousedown="startDragCircle(lf)">拖拽圆形</button>
      <button @mousedown="startDragCustom(lf)">拖拽自定义节点</button>
    </div>
  <div class="container" ref="container"></div>
</template>

<style  lang="scss" scoped>
#div{
    span{
      color: blue;
    }
}
.container {
  width: 90vw;
  height: 90vh;
}

::v-deep .custom-minimap {
  width: 16px;
  height: 16px;
  background-image: url("../assets/1.png") !important;
  background-size: cover;
}

::v-deep .custom-save {
  width: 16px;
  height: 16px;
  background-image: url("../assets/2.png") !important;
  background-size: cover;
}

::v-deep .custom-clear {
  width: 16px;
  height: 16px;
  background-image: url("../assets/3.png") !important;
  background-size: cover;
}
::v-deep .custom-downloadImg{
  width: 16px;
  height: 16px;
  background-image: url("../assets/4.png") !important;
  background-size: cover;
}
::v-deep .custom-toolbar{
  position: absolute;
  top: 200px;
  left: 100px;
  z-index: 1000;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
</style>
