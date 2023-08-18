<template>
    <template v-for="brand in brandCategory" :key="brand">
        <h3>
            {{ brand }}
            <span v-if="resource[brand][0].dataWithTBS && resource[brand][0].dataWithoutTBS">
                : Android {{ resource[brand][0]?.dataWithoutTBS.androidVersion }} -
                {{ resource[brand][0]?.dataWithTBS.chromeVersion }} |
                {{ resource[brand][0]?.dataWithoutTBS.chromeVersion }}
            </span>
        </h3>
        <div class="chart-wrapper">
            <h2>首次加载</h2>
            <div class="chart" :id="`chart-${brand}-1`"></div>
            <div class="chart total" :id="`chart-${brand}-1-total`"></div>
        </div>
        <div class="chart-wrapper">
            <h2>二次加载</h2>
            <div class="chart" :id="`chart-${brand}-2`"></div>
            <div class="chart total" :id="`chart-${brand}-2-total`"></div>
        </div>
        <div class="chart-wrapper">
            <h2>三次加载</h2>
            <div class="chart" :id="`chart-${brand}-3`"></div>
            <div class="chart total" :id="`chart-${brand}-3-total`"></div>
        </div>
    </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiFetchTbsData } from '../../services'
import { brandCategory } from '../../models/tbs/index'
import * as echarts from 'echarts'

const page = 1

const pageSize = 1000000

const resource = ref({})

const basisChartOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legendHoverLink: true,
    legend: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    // legend: {
    //     textStyle: {
    //         fontSize: 10
    //     },
    //     itemHeight: 10,
    //     orient: 'vertical',
    //     right: 0,
    //     top: 30,
    //     bottom: 30
    // },
    label: {
        show: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['Native', 'TBS']
    }
}

const onFloatFixed = (num1, num2) => {
    return (num1 - num2).toFixed(2)
}

const fetchData = async () => {
    const rawData = await apiFetchTbsData({ params: { category: 'timingDev-1', pageSize, page } })
    console.log(resource.value)
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
    onChartRender()
}

const onTimingSeriesBuild = (performanceWithTbs, performanceWithoutTbs, publicSeriesOption) => {
    return [
        {
            ...publicSeriesOption,
            name: 'Fetch Start',
            color: '#b7eb8f',
            data: [
                onFloatFixed(performanceWithoutTbs.fetchStart, 0),
                onFloatFixed(performanceWithTbs.fetchStart, 0)
            ]
        },
        {
            ...publicSeriesOption,
            name: 'Fetch Event and HTTP Cache',
            color: '#fff566',
            data: [
                onFloatFixed(
                    performanceWithoutTbs.domainLookupStart,
                    performanceWithoutTbs.fetchStart
                ),
                onFloatFixed(performanceWithTbs.domainLookupStart, performanceWithTbs.fetchStart)
            ]
        },
        {
            ...publicSeriesOption,
            name: 'DNS',
            data: [
                onFloatFixed(
                    performanceWithoutTbs.domainLookupEnd,
                    performanceWithoutTbs.domainLookupStart
                ),
                onFloatFixed(
                    performanceWithTbs.domainLookupEnd,
                    performanceWithTbs.domainLookupStart
                )
            ]
        },
        {
            ...publicSeriesOption,
            name: 'TCP',
            data: [
                onFloatFixed(performanceWithoutTbs.connectEnd, performanceWithoutTbs.connectStart),
                onFloatFixed(performanceWithTbs.connectEnd, performanceWithTbs.connectStart)
            ]
        },
        {
            ...publicSeriesOption,
            name: 'Before Request',
            color: '#EBEBEB',
            data: [
                onFloatFixed(performanceWithoutTbs.requestStart, performanceWithoutTbs.connectEnd),
                onFloatFixed(performanceWithTbs.requestStart, performanceWithTbs.connectEnd)
            ]
        },
        {
            ...publicSeriesOption,
            name: 'Request',
            data: [
                onFloatFixed(
                    performanceWithoutTbs.responseStart,
                    performanceWithoutTbs.requestStart
                ),
                onFloatFixed(performanceWithTbs.responseStart, performanceWithTbs.requestStart)
            ]
        },
        {
            ...publicSeriesOption,
            name: 'Response',
            data: [
                onFloatFixed(
                    performanceWithoutTbs.responseEnd,
                    performanceWithoutTbs.responseStart
                ),
                onFloatFixed(performanceWithTbs.responseEnd, performanceWithTbs.responseStart)
            ]
        },
        {
            ...publicSeriesOption,
            name: 'Vue Processing',
            color: '#efdbff',
            data: [
                onFloatFixed(
                    performanceWithoutTbs.domInteractive,
                    performanceWithoutTbs.responseEnd
                ),
                onFloatFixed(performanceWithTbs.domInteractive, performanceWithTbs.responseEnd)
            ]
        },
        {
            ...publicSeriesOption,
            name: 'DOM Process',
            data: [
                onFloatFixed(
                    performanceWithoutTbs.domComplete,
                    performanceWithoutTbs.domInteractive
                ),
                onFloatFixed(performanceWithTbs.domComplete, performanceWithTbs.domInteractive)
            ]
        },
        {
            ...publicSeriesOption,
            name: 'Before Load',
            color: '#EBEBEB',
            data: [
                onFloatFixed(
                    performanceWithoutTbs.loadEventStart,
                    performanceWithoutTbs.domComplete
                ),
                onFloatFixed(performanceWithTbs.loadEventStart, performanceWithTbs.domComplete)
            ]
        },
        {
            ...publicSeriesOption,
            name: 'Load',
            color: '#a0d911',
            data: [
                onFloatFixed(
                    performanceWithoutTbs.loadEventEnd,
                    performanceWithoutTbs.loadEventStart
                ),
                onFloatFixed(performanceWithTbs.loadEventEnd, performanceWithTbs.loadEventStart)
            ]
        },
        {
            type: 'bar',
            emphasis: {
                focus: 'series'
            },
            color: '#85a5ff',
            name: 'First Paint',
            data: [
                onFloatFixed(performanceWithoutTbs['first-paint'], 0),
                onFloatFixed(performanceWithTbs['first-paint'], 0)
            ]
        },
        {
            type: 'bar',
            emphasis: {
                focus: 'series'
            },
            color: '#b37feb',
            name: 'First Contentful Paint',
            data: [
                onFloatFixed(performanceWithoutTbs['first-contentful-paint'], 0),
                onFloatFixed(performanceWithTbs['first-contentful-paint'], 0)
            ]
        }
    ]
}

const onChartOptionBuild = (type, data) => {
    const performanceWithTbs = data.dataWithTBS.performance
        ? JSON.parse(data.dataWithTBS.performance)
        : null
    const performanceWithoutTbs = data.dataWithoutTBS.performance
        ? JSON.parse(data.dataWithoutTBS.performance)
        : null
    console.log('performanceWithTbs:', performanceWithTbs)
    console.log('performanceWithoutTbs:', performanceWithoutTbs)
    const publicSeriesOption = {
        type: 'bar',
        stack: 'time',
        emphasis: {
            focus: 'series'
        }
    }
    const series = type
        ? onTimingSeriesBuild(performanceWithTbs, performanceWithoutTbs, publicSeriesOption)
        : [
              {
                  ...publicSeriesOption,
                  name: 'Total',
                  color: '#76CCCC',
                  data: [
                      onFloatFixed(performanceWithoutTbs.loadEventEnd, 0),
                      onFloatFixed(performanceWithTbs.loadEventEnd, 0)
                  ]
              }
          ]
    return {
        ...basisChartOption,
        series
    }
}

const onChartBuild = (data, brand, step) => {
    const container = document.getElementById(`chart-${brand}-${step}`)
    const chartInstance = echarts.init(container)
    chartInstance.setOption(onChartOptionBuild(1, data))
    const containerTotal = document.getElementById(`chart-${brand}-${step}-total`)
    const chartInstanceTotal = echarts.init(containerTotal)
    chartInstanceTotal.setOption(onChartOptionBuild(0, data))
}

const onChartRender = () => {
    brandCategory.forEach((brand) => {
        resource.value[brand].forEach((item, index) => {
            onChartBuild(item, brand, index + 1)
        })
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

dataInit()

onMounted(() => {
    fetchData()
})

// const required = [
//     'fetchStart',
//     'domainLookupStart',
//     'domainLookupEnd',
//     'connectStart',
//     'secureConnectionStart',
//     'connectEnd',
//     'requestStart',
//     'responseStart',
//     'responseEnd',
//     'domInteractive',
//     'domContentLoadedEventStart',
//     'domContentLoadedEventEnd',
//     'domComplete',
//     'loadEventStart',
//     'loadEventEnd'
// ]
</script>

<style lang="less" scoped>
.chart-wrapper {
    .chart {
        width: 100%;
        height: 3.6rem;
        position: relative;
    }
    .total {
        height: 1.8rem;
    }
}
</style>
