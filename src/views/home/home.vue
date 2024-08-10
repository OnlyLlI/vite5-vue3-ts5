<template>
  <div>home11</div>
</template>

<script setup lang="ts">
import { cloneDeep, omit } from 'lodash-es';

const obj = ref({ name: '小明', age: 18, six: '男', });

console.log(omit(cloneDeep(obj.value), 'name'), obj.value);
</script>