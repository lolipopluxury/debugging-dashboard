const onFloatFixed = (num1, num2) => {
    return (num1 - num2).toFixed(2)
}

export function useLineChartMethods() {
    const basicChartOption = {
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
    const onTimingSeriesBuild = (performanceWithTbs, performanceWithoutTbs) => {
        const publicSeriesOption = {
            type: 'bar',
            stack: 'time',
            emphasis: {
                focus: 'series'
            }
        }
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
    const onChartOptionBuild = (data) => {
        const performanceWithTbs = data.dataWithTBS.performance
            ? JSON.parse(data.dataWithTBS.performance)
            : null
        const performanceWithoutTbs = data.dataWithoutTBS.performance
            ? JSON.parse(data.dataWithoutTBS.performance)
            : null
        const series = onTimingSeriesBuild(performanceWithTbs, performanceWithoutTbs)
        return {
            ...basicChartOption,
            series
        }
    }
    return {
        onTimingSeriesBuild,
        onChartOptionBuild
    }
}

export function useStackChartMethods() {
    const basicChartOption = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['TBS', 'Native']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [
                'Fetch Start',
                'Fetch Event and HTTP Cache',
                'DNS',
                'TCP',
                'Before Request',
                'Request',
                'Vue Processing',
                'DOM Process',
                'Before Load',
                'Load'
            ]
        },
        yAxis: {
            type: 'value'
        },
    }
    const onTimingSeriesBuild = (performanceWithTbs, performanceWithoutTbs) => {
        return [
            {
                name: 'TBS',
                type: 'line',
                stack: 'Total',
                data: [
                    onFloatFixed(performanceWithTbs.fetchStart, 0),
                    onFloatFixed(performanceWithTbs.domainLookupStart, performanceWithTbs.fetchStart),
                    onFloatFixed(
                        performanceWithTbs.domainLookupEnd,
                        performanceWithTbs.domainLookupStart
                    ),
                    onFloatFixed(performanceWithTbs.connectEnd, performanceWithTbs.connectStart),
                    onFloatFixed(performanceWithTbs.requestStart, performanceWithTbs.connectEnd),
                    onFloatFixed(performanceWithTbs.responseStart, performanceWithTbs.requestStart),
                    onFloatFixed(performanceWithTbs.responseEnd, performanceWithTbs.responseStart),
                    onFloatFixed(performanceWithTbs.domInteractive, performanceWithTbs.responseEnd),
                    onFloatFixed(performanceWithTbs.domComplete, performanceWithTbs.domInteractive),
                    onFloatFixed(performanceWithTbs.loadEventStart, performanceWithTbs.domComplete),
                    onFloatFixed(performanceWithTbs.loadEventStart, performanceWithTbs.domComplete),
                    onFloatFixed(performanceWithTbs.loadEventEnd, performanceWithTbs.loadEventStart)
                ]
            },
            {
                name: 'Native',
                type: 'line',
                stack: 'Total',
                data: [
                    onFloatFixed(performanceWithoutTbs.fetchStart, 0),
                    onFloatFixed(performanceWithoutTbs.domainLookupStart, performanceWithoutTbs.fetchStart),
                    onFloatFixed(
                        performanceWithoutTbs.domainLookupEnd,
                        performanceWithoutTbs.domainLookupStart
                    ),
                    onFloatFixed(performanceWithoutTbs.connectEnd, performanceWithoutTbs.connectStart),
                    onFloatFixed(performanceWithoutTbs.requestStart, performanceWithoutTbs.connectEnd),
                    onFloatFixed(performanceWithoutTbs.responseStart, performanceWithoutTbs.requestStart),
                    onFloatFixed(performanceWithoutTbs.responseEnd, performanceWithoutTbs.responseStart),
                    onFloatFixed(performanceWithoutTbs.domInteractive, performanceWithoutTbs.responseEnd),
                    onFloatFixed(performanceWithoutTbs.domComplete, performanceWithoutTbs.domInteractive),
                    onFloatFixed(performanceWithoutTbs.loadEventStart, performanceWithoutTbs.domComplete),
                    onFloatFixed(performanceWithoutTbs.loadEventStart, performanceWithoutTbs.domComplete),
                    onFloatFixed(performanceWithoutTbs.loadEventEnd, performanceWithoutTbs.loadEventStart)
                ]
            }
        ]
    }
    const onChartOptionBuild = (data) => {
        const performanceWithTbs = data.dataWithTBS.performance
            ? JSON.parse(data.dataWithTBS.performance)
            : null
        const performanceWithoutTbs = data.dataWithoutTBS.performance
            ? JSON.parse(data.dataWithoutTBS.performance)
            : null
        const series = onTimingSeriesBuild(performanceWithTbs, performanceWithoutTbs)
        return {
            ...basicChartOption,
            series
        }
    }
    return {
        onTimingSeriesBuild,
        onChartOptionBuild
    }
}