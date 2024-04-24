<template>
  <div class="bg-red-700">
    <h1>
      Cours de babylonJS
    </h1>
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {Experience1} from '@/Experiences/Experience1';

export default defineComponent({
  name: 'HelloWorld',
  mounted(){
    const canvas = document.querySelector('canvas')!;
    new Experience1(canvas);
    
  }
});
</script>
<style>
  canvas{
    width : 70%;
    height: 70%;
  }
</style>
