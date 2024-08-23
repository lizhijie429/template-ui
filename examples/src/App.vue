<template>
  <div>
    <Button @click="build('111')" type="primary">按钮</Button>
  </div>
</template>

<script setup lang="ts">
import { build } from "@template-ui/utils";
import { Button } from "@template-ui/components";
// const clickHandle = () => {
//   build("111")
// };
</script>
