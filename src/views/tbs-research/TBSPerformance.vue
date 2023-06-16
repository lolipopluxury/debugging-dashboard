<template>
    <!-- <div class="line-chart" ref="chart"></div> -->
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
            <div class="chart" :id="`chart-${brand}-1`"></div>
            <div class="chart" :id="`chart-${brand}-2`"></div>
            <div class="chart" :id="`chart-${brand}-3`"></div>
        </div>
        <div class="chart-wrapper total">
            <div class="chart" :id="`chart-${brand}-1-total`"></div>
            <div class="chart" :id="`chart-${brand}-2-total`"></div>
            <div class="chart" :id="`chart-${brand}-3-total`"></div>
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
    legendHoverLink: true,
    legend: {
        textStyle: {
            fontSize: 10
        },
        itemHeight: 10,
        orient: 'vertical',
        right: 0,
        top: 30,
        bottom: 30
    },
    label: {
        show: true
        // color: '#fff'
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category'
    },
    series: [
        { type: 'bar', color: '#87e8de' },
        { type: 'bar', color: '#d3adf7' }
    ]
}

const titleTextMap = {
    1: '首次加载',
    2: '二次加载',
    3: '三次加载'
}

const fetchData = async () => {
    const rawData = await apiFetchTbsData({ params: { category: 'performance', pageSize, page } })
    rawData.list.forEach((item) => {
        item.isTbs
            ? (resource.value[item.brandName][item.step - 1].dataWithTBS = item)
            : (resource.value[item.brandName][item.step - 1].dataWithoutTBS = item)
    })
    onChartRender()
}

const onChartOptionBuild = (type, data, step) => {
    const performanceWithTbs = JSON.parse(data.dataWithTBS.performance)
    const performanceWithoutTbs = JSON.parse(data.dataWithoutTBS.performance)
    // console.log('performanceWithTbs', step, performanceWithTbs)
    // console.log('performanceWithoutTbs', step, performanceWithoutTbs)
    const title = type
        ? {
              text: titleTextMap[step]
          }
        : { text: '' }
    const dataset = {
        dimensions: ['dimension', 'TBS', 'Native'],
        source: type
            ? [
                  {
                      dimension: 'DOM',
                      TBS: (
                          performanceWithTbs.domContentLoadedEventEnd -
                          performanceWithTbs.domInteractive
                      ).toFixed(2),
                      Native: (
                          performanceWithoutTbs.domContentLoadedEventEnd -
                          performanceWithoutTbs.domInteractive
                      ).toFixed(2)
                  },
                  {
                      dimension: 'Request',
                      TBS: (
                          performanceWithTbs.responseEnd - performanceWithTbs.requestStart
                      ).toFixed(2),
                      Native: (
                          performanceWithoutTbs.responseEnd - performanceWithoutTbs.requestStart
                      ).toFixed(2)
                  },
                  {
                      dimension: 'Connect',
                      TBS: (performanceWithTbs.connectEnd - performanceWithTbs.fetchStart).toFixed(
                          2
                      ),
                      Native: (
                          performanceWithoutTbs.connectEnd - performanceWithoutTbs.fetchStart
                      ).toFixed(2)
                  }
              ]
            : [
                  {
                      dimension: 'Total',
                      TBS: performanceWithTbs.domContentLoadedEventEnd.toFixed(2),
                      Native: performanceWithoutTbs.domContentLoadedEventEnd.toFixed(2)
                  },
                  {
                      dimension: 'Pre-DOM',
                      TBS: (
                          performanceWithTbs.domInteractive - performanceWithTbs.responseEnd
                      ).toFixed(2),
                      Native: (
                          performanceWithoutTbs.domInteractive - performanceWithoutTbs.responseEnd
                      ).toFixed(2)
                  }
              ]
    }
    return {
        ...basisChartOption,
        dataset,
        title
    }
}

const onChartBuild = (data, brand, step) => {
    const container = document.getElementById(`chart-${brand}-${step}`)
    const chartInstance = echarts.init(container)
    chartInstance.setOption(onChartOptionBuild(1, data, step))
    const containerTotal = document.getElementById(`chart-${brand}-${step}-total`)
    const chartInstanceTotal = echarts.init(containerTotal)
    chartInstanceTotal.setOption(onChartOptionBuild(0, data, step))
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
</script>

<style lang="less" scoped>
.line-chart {
    width: 8rem;
    height: 4rem;
}
.chart-wrapper {
    height: 3.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .chart {
        width: 30%;
        height: 100%;
        position: relative;
    }
}
.total {
    height: 2.4rem;
}
</style>
