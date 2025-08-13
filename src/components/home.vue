<script setup>
import { ref } from 'vue'
import { get } from '../utils/api'
import { Refresh } from '@element-plus/icons-vue'

const showLoading = ref(true)
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)

const collectDatas = ref([])
const getDatas = async () => {
    try {
        let res = await get('/api/data', {
            page: currentPage.value,
            pageSize: pageSize.value,
            name: device.value,
        })
        if (res.ret == 0) {
            collectDatas.value = res.data

            total.value = res.pagination.totalItems
        }
    } catch (err) {
        console.log(err)
    } finally {
        showLoading.value = false
        refreshDisabled.value = false
    }
}

const device = ref('')
const deviceOptions = ref([])
const defaultActive = ref('0')
const getTables = async () => {
    try {
        let res = await get('/api/table')
        if (res.ret == 0) {
            res.data.sort((a, b) => a.DeviceName.localeCompare(b.DeviceName))
            let temp = []
            for (let i in res.data) {
                temp.push({
                    id: Number(i) + 1,
                    label: res.data[i].DeviceName,
                    value: res.data[i].DeviceName,
                })
            }
            defaultActive.value = '0'
            deviceOptions.value = temp
            device.value = temp[0].label
            getDatas()
        } else {
            showLoading.value = false
        }
    } catch (err) {
        console.log(err)
        showLoading.value = false
    }
}
getTables()

const formatterNumber = (row, column, cellValue) => {
    return cellValue ? cellValue.toFixed(3) : ''
}

const onSizeChange = (val) => {
    pageSize.value = val
    showLoading.value = true
    getDatas()
}
const onCurrentChange = (val) => {
    currentPage.value = val
    showLoading.value = true
    getDatas()
}

const optionss = ref({ popperClass: 'mypopper' })
const refreshDisabled = ref(false)
const onRefresh = () => {
    showLoading.value = true
    refreshDisabled.value = true
    getDatas()
}

const onMenuClick = (val) => {
    device.value = val.label
    currentPage.value = 1
    pageSize.value = 20
    showLoading.value = true
    getDatas()
}
</script>

<template>
    <div class="home-views">
        <el-container style="height: 100%; display: flex; flex-direction: column">
            <el-header style="margin-bottom: 4px">
                <div class="title">
                    <div style="display: flex; align-items: center">
                        <img src="/logo.png" width="160px" height="56px" alt="" />
                        <span style="font-size: 20px; margin-left: 8px">OYNER SYSTEM</span>
                    </div>
                    <div class="right">
                        <!-- <span>选择设备：</span>
                        <el-select v-model="device" @change="onChangeDevice" style="width: 300px">
                            <el-option
                                v-for="item in deviceOptions"
                                :key="item.DeviceName"
                                :label="item.DeviceName"
                                :value="item.DeviceName"
                            />
                        </el-select> -->
                        <el-button
                            type="primary"
                            @click="onRefresh"
                            :disabled="refreshDisabled"
                            :icon="Refresh"
                            style="margin-left: 10px"
                            >刷新</el-button
                        >
                    </div>
                </div>
            </el-header>
            <el-container style="flex: 1 1 0%; min-height: 0">
                <el-aside width="270px" style="padding-top: 30px">
                    <div class="myAside">
                        <span>选择设备：</span>
                        <el-menu
                            style="flex: 1 1 0%; min-height: 0"
                            :default-active="defaultActive"
                            mode="vertical"
                            class="el-menu-vertical-demo"
                        >
                            <el-menu-item
                                v-for="(item, index) in deviceOptions"
                                @click="onMenuClick(item)"
                                :index="String(index)"
                            >
                                <template #title>{{ item.label }}</template>
                            </el-menu-item></el-menu
                        >
                    </div>
                </el-aside>
                <el-main style="height: 100%; display: flex; flex-direction: column"
                    ><div class="tables">
                        <el-table
                            :data="collectDatas"
                            show-overflow-tooltip
                            header-row-class-name="myheader"
                            :tooltip-options="optionss"
                            v-loading="showLoading"
                            style="width: 100%"
                            height="100%"
                        >
                            <el-table-column prop="ScanTime" label="ScanTime" width="180"> </el-table-column>
                            <el-table-column prop="FrequencyCount" width="80">
                                <template #header>
                                    <el-tooltip content="FrequencyCount" raw-content placement="top-end">
                                        <span>FrequencyCount</span>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column prop="MaxFrequency" label="MaxFrequency" width="120">
                                <template #header>
                                    <el-tooltip content="MaxFrequency" raw-content placement="top-end">
                                        <span>MaxFrequency</span>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column prop="MinFrequency" width="120">
                                <template #header>
                                    <el-tooltip content="MinFrequency" raw-content placement="top-end">
                                        <span>MinFrequency</span>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column prop="PowerValues" label="PowerValues" width="300" />
                            <el-table-column prop="RBW" label="RBW" />
                            <el-table-column prop="Harmonic">
                                <template #header>
                                    <el-tooltip content="Harmonic" raw-content placement="top-end">
                                        <span>Harmonic</span>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column prop="Duration">
                                <template #header>
                                    <el-tooltip content="Duration" raw-content placement="top-end">
                                        <span>Duration</span>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column prop="FlowRate" :formatter="formatterNumber">
                                <template #header>
                                    <el-tooltip content="FlowRate" raw-content placement="top-end">
                                        <span>FlowRate</span>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column prop="AverageMag" label="AverageMag"  /> -->
                            <el-table-column prop="ChannelPower" :formatter="formatterNumber">
                                <template #header>
                                    <el-tooltip content="ChannelPower" raw-content placement="top-end">
                                        <span>ChannelPower</span>
                                    </el-tooltip>
                                </template> </el-table-column
                            >/>
                            <el-table-column prop="FlowVolume" :formatter="formatterNumber">
                                <template #header>
                                    <el-tooltip content="FlowVolume" raw-content placement="top-end">
                                        <span>FlowVolume</span>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column prop="Pressure" :formatter="formatterNumber">
                                <template #header>
                                    <el-tooltip content="Pressure" raw-content placement="top-end">
                                        <span>Pressure</span>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column prop="SpecName" label="SpecName"  />
                <el-table-column prop="Stdev" label="Stdev"  />
                <el-table-column prop="SummaryOrNot" label="SummaryOrNot"  /> -->
                            <el-table-column prop="Temperature" :formatter="formatterNumber">
                                <template #header>
                                    <el-tooltip content="Temperature" raw-content placement="top-end">
                                        <span>Temperature</span>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column prop="UpMinLowForCp" label="UpMinLowForCp"  /> -->
                        </el-table>
                    </div>
                    <div class="pager">
                        <el-pagination
                            v-model:current-page="currentPage"
                            v-model:page-size="pageSize"
                            :page-sizes="[20, 50, 100]"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                            @size-change="onSizeChange"
                            @current-change="onCurrentChange"
                        /></div
                ></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.home-views {
    height: 100%;
    width: 100%;
    .myAside {
        height: 100%;
        display: flex;
        flex-direction: column;
        span {
            padding-left: 20px;
        }
    }
    .tables {
        flex: 1 1 0%;
        min-height: 0;
    }
    .title {
        width: 100%;
        border-bottom: 1px solid #dfdfdf;
        padding-bottom: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .right {
            display: flex;
            align-items: center;
        }
        img {
            display: block;
        }
        margin-bottom: 6px;
    }
    .pager {
        padding: 12px 0 0;
        display: flex;
        justify-content: flex-end;
    }
}
</style>
<style>
button:focus {
    outline: none;
}
.myheader {
    .cell {
        max-width: 100%;
        white-space: nowrap;
    }
}
.mypopper {
    span {
        word-break: break-all;
    }
}
</style>
