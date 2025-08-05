<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const collectDatas = ref([])
</script>

<template>
    <div class="home-views">
        <div class="title">
            <img src="/logo.png" width="160px" height="56px" alt="">
        </div>
      <el-table :data="collectDatas" style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
    </div>
</template>

<style scoped>
.home-views{
    height: 100%;
    width: 100%;
    padding: 6px 16px 20px;
    .title{
        border-bottom: 1px solid #dfdfdf;
        padding-bottom: 6px;
        img{
            display: block;
        }
        margin-bottom: 6px;
    }
}
</style>
