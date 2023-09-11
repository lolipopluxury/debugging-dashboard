<template>
    <template v-if="loaded">
        <el-select v-model="currentDevice" filterable placeholder="请选择设备" size="large" @change="onChartRender">
            <el-option
                v-for="item in deviceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
        <div class="device-info">
            <el-text type="primary" tag="b" size="large">{{ brandDisplay }}</el-text>
            <el-text type="info" tag="p">安卓系统版本：{{ resource[brandDisplay][0]?.dataWithoutTBS.androidVersion }}</el-text>
            <el-text type="info" tag="p">TBS chrome内核版本：{{ resource[brandDisplay][0]?.dataWithTBS.chromeVersion }}</el-text>
            <el-text type="info" tag="p">原生 chrome内核版本：{{ resource[brandDisplay][0]?.dataWithoutTBS.chromeVersion }}</el-text>
        </div>
        <div class="charts">
            <el-radio-group v-model="chartType" @change="onChartRender">
                <el-radio-button label="line">时间轴</el-radio-button>
                <el-radio-button label="stack">折线图</el-radio-button>
            </el-radio-group>
            <div class="chart-wrapper">
                <el-text tag="b" size="large" type="primary">首次加载</el-text>
                <div class="chart" id="chart-1"></div>
            </div>
            <div class="chart-wrapper">
                <el-text tag="b" size="large" type="primary">二次加载</el-text>
                <div class="chart" id="chart-2"></div>
            </div>
            <div class="chart-wrapper">
                <el-text tag="b" size="large" type="primary">三次加载</el-text>
                <div class="chart" id="chart-3"></div>
            </div>
        </div>
    </template>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { apiFetchTbsData } from '../../services'
import { useLineChartMethods, useStackChartMethods } from '@/utils/tbs/performance'
import { brandCategory, deviceOptions } from '../../models/tbs/index'
import * as echarts from 'echarts'

const lineChartMethods = useLineChartMethods()
const stackChartMethods = useStackChartMethods()

const page = 1
const pageSize = 1000000

const resource = ref({})
const loaded = ref(false)

const currentDevice = ref(0)
const brandDisplay = computed(() => brandCategory[currentDevice.value])

const chartType = ref('line')
const chartInstance = {
    chart1: null,
    chart2: null,
    chart3: null,
}

const fetchData = async () => {
    const rawData = await apiFetchTbsData({ params: { category: 'timingDev-1', pageSize, page } })
    rawData.list.forEach((item) => {
        if (!resource.value[`${item.brandName}(${item.androidVersion})`]) return
        item.isTbs
            ? (resource.value[`${item.brandName}(${item.androidVersion})`][
                  item.step - 1
              ].dataWithTBS = item)
            : (resource.value[`${item.brandName}(${item.androidVersion})`][
                  item.step - 1
              ].dataWithoutTBS = item)
    })
}

const onChartRender = () => {
    const currentData = resource.value[brandDisplay.value]
    const method = chartType.value === 'line' ? lineChartMethods.onChartOptionBuild : stackChartMethods.onChartOptionBuild
    currentData.forEach((item, index) => {
        chartInstance[`chart${index + 1}`].clear()
        chartInstance[`chart${index + 1}`].setOption(method(item))
    })
}

const dataInit = () => {
    brandCategory.forEach((brand) => {
        resource.value[brand] = [
            {
                dataWithTBS: null,
                dataWithoutTBS: null
            },
            {
                dataWithTBS: null,
                dataWithoutTBS: null
            },
            {
                dataWithTBS: null,
                dataWithoutTBS: null
            }
        ]
    })
}

const chartInit = (mount) => {
    for (let i = 1; i <= mount; i++) {
        chartInstance[`chart${i}`] = echarts.init(document.getElementById(`chart-${i}`))
    }
}

const init = async () => {
    dataInit()
    await fetchData()
    loaded.value = true
    nextTick(() => {
        chartInit(3)
        onChartRender()
    })
}

init()
</script>

<style lang="less" scoped>
.device-info {
    margin-top: 0.2rem;
    > p {
        margin-top: 0.02rem;
    }
}

.charts {
    margin-top: 0.2rem;
    .chart-wrapper {
        margin-top: 0.1rem;
        .chart {
            width: 100%;
            height: 3.6rem;
            position: relative;
        }
        .total {
            height: 1.8rem;
        }
    }
}
</style>
