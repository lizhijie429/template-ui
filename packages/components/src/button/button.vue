<template>
  <el-button v-bind="$attrs" class="ea-button">
    <slot />
  </el-button>
</template>

<script lang="ts" setup>
import { ElButton } from "element-plus";
defineOptions({ name: "ea-button" });
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
