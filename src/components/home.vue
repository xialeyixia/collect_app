<script setup>
import { ref } from 'vue'
import { get } from '../utils/api'

defineProps({
    msg: String,
})

const collectDatas = ref([])
const getDatas = async (name) => {
    console.log(676767676767)
    try {
        console.log(88888888)
        let res = await get('/api/data', {
            page: 1,
            pageSize: 20,
            name: name
    
        })
        console.log(res, )
        if (res.ret == 0) {
            collectDatas.value = res.data
        }
    } catch (err)  {
        console.log(err, 33333)
    }
}
const getTables = async () => {
    let res = await get('/api/table')
    if (res.ret == 0) {
        console.log(res, 111111)
        getDatas('999999996A6C3075E172BE6C3075')
    }
}
getTables()


</script>

<template>
    <div class="home-views ">
        <div class="title">
            <img src="/logo.png" width="160px" height="56px" alt="" />
        </div>
        <div class="tables">

            <el-table :data="collectDatas" style="width: 100%" height="100%">
                <el-table-column prop="ScanTime" label="ScanTime"  show-overflow-tooltip width="180" />
                <el-table-column prop="FrequencyCount" label="FrequencyCount" show-overflow-tooltip width="80" />
                <el-table-column prop="MaxFrequency" label="MaxFrequency" show-overflow-tooltip width="120" />
                <el-table-column prop="MinFrequency" label="MinFrequency" show-overflow-tooltip width="120" />
                <el-table-column prop="PowerValues" label="PowerValues" width="300" show-overflow-tooltip  />
                <el-table-column prop="RBW" label="RBW" show-overflow-tooltip />
                <el-table-column prop="Harmonic" label="Harmonic" show-overflow-tooltip />
                <el-table-column prop="Duration" label="Duration" show-overflow-tooltip />
                <el-table-column prop="FlowRate" label="FlowRate" show-overflow-tooltip />
                <el-table-column prop="AverageMag" label="AverageMag" show-overflow-tooltip />
                <el-table-column prop="ChannelPower" label="ChannelPower" show-overflow-tooltip />
                <el-table-column prop="FlowVolume" label="FlowVolume" show-overflow-tooltip />
                <el-table-column prop="Pressure" label="Pressure"  show-overflow-tooltip />
                <el-table-column prop="SpecName" label="SpecName" show-overflow-tooltip />
                <el-table-column prop="Stdev" label="Stdev" show-overflow-tooltip />
                <el-table-column prop="SummaryOrNot" label="SummaryOrNot" show-overflow-tooltip />
                <el-table-column prop="Temperature" label="Temperature" show-overflow-tooltip />
                <el-table-column prop="UpMinLowForCp" label="UpMinLowForCp" show-overflow-tooltip />
            </el-table>
        </div>
        </div>
</template>

<style scoped>
.home-views {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 6px 16px 20px;
    .tables{
        flex: 1 1 0%;
        min-height: 0;
    }
    .title {
        border-bottom: 1px solid #dfdfdf;
        padding-bottom: 6px;
        img {
            display: block;
        }
        margin-bottom: 6px;
    }
}
</style>
