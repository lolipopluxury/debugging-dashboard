<template>
    <ElTabs v-model="tabActive">
        <ElTabPane label="CSS" name="css">
            <ElTable :data="displayDataCSS" border style="width: 100%">
                <ElTableColumn prop="property" label="属性" width="260" />
                <ElTableColumn label="TBS内核">
                    <template #default="scope">
                        <PropertyDetail :data="scope.row.dataWithTBS" />
                    </template>
                </ElTableColumn>
                <ElTableColumn label="Native内核">
                    <template #default="scope">
                        <PropertyDetail :data="scope.row.dataWithoutTBS" />
                    </template>
                </ElTableColumn>
            </ElTable>
        </ElTabPane>
        <ElTabPane label="ES6" name="js">
            <ElTable :data="displayDataES6" border style="width: 100%">
                <ElTableColumn prop="property" label="Property" width="260" />
                <ElTableColumn label="TBS内核">
                    <template #default="scope">
                        <PropertyDetail :data="scope.row.dataWithTBS" />
                    </template>
                </ElTableColumn>
                <ElTableColumn label="Native内核">
                    <template #default="scope">
                        <PropertyDetail :data="scope.row.dataWithoutTBS" />
                    </template>
                </ElTableColumn>
            </ElTable>
        </ElTabPane>
    </ElTabs>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { apiFetchTbsData } from '../../services'
import { cssCategory, es6Category } from '../../models/tbs/index'

// let result = 0

// setTimeout(() => {
//     const record = observer.takeRecords()

//     console.log('record: ', record)
// }, 6000)

var observer = new PerformanceObserver(function (list, obj) {
    var entries = list.getEntries()
    for (var i = 0; i < entries.length; i++) {
        // Process "mark" and "frame" events
    }
})
observer.observe({ entryTypes: ['longtask', 'frame'] })
var records = observer.takeRecords()
console.log(records)
// console.log(records[0].name)
// console.log(records[0].startTime)
// console.log(records[0].duration)

const PropertyDetail = defineAsyncComponent(() => import('./components/PropertyDetail.vue'))

const tabActive = ref('css')

const resourceCSS = ref({})

const resourceES6 = ref({})

const displayDataCSS = ref([])

const displayDataES6 = ref([])

const page = 1

const pageSize = 1000000

const fetchData = async () => {
    const cssData = await apiFetchTbsData({ params: { category: 'css', pageSize, page } })
    cssData.list.forEach((item) => {
        item.isTbs
            ? resourceCSS.value[item.property].dataWithTBS.push(item)
            : resourceCSS.value[item.property].dataWithoutTBS.push(item)
    })
    const es6Data = await apiFetchTbsData({ params: { category: 'js', pageSize, page } })
    es6Data.list.forEach((item) => {
        item.isTbs
            ? resourceES6.value[item.property].dataWithTBS.push(item)
            : resourceES6.value[item.property].dataWithoutTBS.push(item)
    })
    fetchDataCallback()
}

const dataInit = () => {
    cssCategory.forEach((key) => {
        resourceCSS.value[key] = { dataWithTBS: [], dataWithoutTBS: [] }
    })
    es6Category.forEach((key) => {
        resourceES6.value[key] = { dataWithTBS: [], dataWithoutTBS: [] }
    })
}

const fetchDataCallback = () => {
    cssCategory.forEach((key) => {
        displayDataCSS.value.push({
            property: key,
            ...resourceCSS.value[key]
        })
    })
    es6Category.forEach((key) => {
        displayDataES6.value.push({
            property: key,
            ...resourceES6.value[key]
        })
    })
}

dataInit()
fetchData()
</script>
