/*
 * @Author: yangdongxu
 * @Date: 2025-04-22 14:53:20
 * @LastEditors: yangdongxu
 * @LastEditTime: 2025-04-22 14:54:48
 * @FilePath: \trust-shield-webd:\find_work_2024_year_first\wlh_web_pro\src\components\hooks\addMenuConfig.ts
 */
export default function addMenuConfig(lf) {
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
        callback(node: any) {
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
}
