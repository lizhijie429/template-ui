# Alert 警告

`Alert` 用于页面中展示重要的提示信息

- [源代码](https://github.com/FightingDesign/fighting-design/tree/master/packages/fighting-design/alert)
- [文档编辑](https://github.com/FightingDesign/fighting-design/blob/master/docs/docs/components/alert.md)

## 基本使用

`type` 属性可以配置不同的主题类型，展示不同的颜色状态

<div class="example">
  <el-alert title="Success alert" type="success" />
  <el-alert title="Info alert" type="info" />
  <el-alert title="Warning alert" type="warning" />
  <el-alert title="Error alert" type="error" />
</div>

::: details 显示代码

```html
<el-alert title="Success alert" type="success" />
<el-alert title="Info alert" type="info" />
<el-alert title="Warning alert" type="warning" />
<el-alert title="Error alert" type="error" />
```

:::


## Attributes

| 参数          | 说明               | 类型                       | 可选值                                           | 默认值  |
| ------------- | ------------------ | -------------------------- | ------------------------------------------------ | ------- |
| `type`        | 类型               | string                     | `default` `primary` `success` `danger` `warning` | default |
| `font-size`   | 副标题文字大小     | string / number            | ——                                               | 15px    |
| `title-size`  | 主标题文字大小     | string / number            | ——                                               | 17px    |
| `bold`        | 文字是否以粗体显示 | boolean                    | ——                                               | false   |
| `center`      | 是否居中           | boolean                    | ——                                               | false   |
| `close`       | 可关闭             | boolean                    | ——                                               | ——      |
| `simple`      | 简约模式           | boolean                    | ——                                               | ——      |
| `title`       | 标题               | string                     | ——                                               | ——      |
| `round`       | 显示为圆角         | boolean                    | ——                                               | ——      |
| `background`  | 背景颜色           | string                     | ——                                               | ——      |
| `color`       | 副标题字体颜色     | string                     | ——                                               | ——      |
| `title-color` | 主标题字体颜色     | string                     | ——                                               | ——      |
| `fixed`       | 是否固定定位       | boolean                    | ——                                               | false   |
| `overflow`    | 文字超出的展示状态 | string                     | `hidden`                                         | ——      |
| `before-icon` | 自定义前缀 icon    | object (VNode / Component) | ——                                               | null    |
| `close-end`   | 关闭之后触发的回调 | Function                   | ——                                               | null    |

## Slots

| 名称         | 说明               |
| ------------ | ------------------ |
| `default`    | 自定义副标题的内容 |
| `title`      | 自定义主标题的内容 |
| `closeIcon`  | 自定义关闭 icon    |
| `beforeIcon` | 自定义前缀 icon    |

## Interface

组件导出以下类型定义：

```ts
import type {
  AlertPropsType,
  AlertInstance,
  AlertType,
  AlertOverflowType
} from 'fighting-design'
```

## Contributors

<a href="https://github.com/Tyh2001" target="_blank">
  <el-avatar round src="https://avatars.githubusercontent.com/u/73180970?v=4" />
</a>
<a href="https://github.com/jardeng" target="_blank">
  <el-avatar round src="https://avatars.githubusercontent.com/u/19302222?v=4" />
</a>
<a href="https://github.com/HeHasGun" target="_blank">
  <el-avatar round src="https://avatars.githubusercontent.com/u/66313154?v=4" />
</a>

<style scoped>
a {
  margin: 5px;
}

.el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
}
</style>
