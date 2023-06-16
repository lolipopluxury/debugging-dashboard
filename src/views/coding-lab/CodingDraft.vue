<template>
    <div class="coding-draft">
        <img class="target" src="./displacement-map/ripple.jpg" />
        <br />
        <svg width="500" height="312">
            <defs>
                <filter id="filter-ripple">
                    <feImage
                        :xlink:href="imgMap"
                        x="0"
                        y="0"
                        width="500"
                        height="312"
                        result="ripple"
                    ></feImage>
                    <feDisplacementMap
                        xChannelSelector="G"
                        yChannelSelector="R"
                        color-interpolation-filters="sRGB"
                        in="SourceGraphic"
                        in2="ripple"
                        scale="40"
                    ></feDisplacementMap>
                </filter>
            </defs>
        </svg>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const dataDisplacementImg = () => {
    let t = document.createElement('canvas')
    if (!t.getContext) {
        return
    }
    let e = t.getContext('2d')
    let r = 512,
        a = 512,
        i = 250,
        n = 100
    let o = i - n
    t.width = r
    t.height = a
    let l = function (t, r, a, o) {
        let l = (2 * Math.PI) / o.length
        let f = 0
        let s = null
        let c = null,
            u = null
        for (let d = 0; d < o.length; d++) {
            c = o[d]
            u = o[(d + 1) % o.length]
            let p = t + Math.cos(f) * a
            let g = t + Math.cos(f + l) * a
            let v = r + Math.sin(f) * a
            let h = r + Math.sin(f + l) * a
            e.beginPath()
            s = e.createLinearGradient(p, v, g, h)
            s.addColorStop(0, c)
            s.addColorStop(1, u)
            e.strokeStyle = s
            e.arc(t, r, a, f, f + l)
            e.lineWidth = i - n
            e.stroke()
            e.closePath()
            f += l
        }
    }
    e.beginPath()
    e.arc(r / 2, a / 2, i, 0, Math.PI * 2)
    e.fillStyle = '#7f7f7f'
    e.fill()
    l(r / 2, a / 2, n + o / 2, ['rgb(255,0,0)', 'rgb(0, 255, 0)', 'rgb(255,0,0)', 'rgb(0, 255, 0)'])
    let f = e.createRadialGradient(r / 2, a / 2, n, r / 2, a / 2, i)
    f.addColorStop(0, 'rgba(127,127,127,1)')
    f.addColorStop(17 / o, 'rgba(115,115,115,.8)')
    f.addColorStop(25 / o, 'rgba(115,115,115,0.1)')
    f.addColorStop(28 / o, 'rgba(115,115,115,0.1)')
    f.addColorStop(37 / o, 'rgba(115,104,104,.8)')
    f.addColorStop(43 / o, 'rgba(115,104,104,1)')
    f.addColorStop(44 / o, 'rgba(127,127,127,1)')
    f.addColorStop(50 / o, 'rgba(127,127,127,.6)')
    f.addColorStop(54 / o, 'rgba(127,127,127,0)')
    f.addColorStop(61 / o, 'rgba(0,0,0,0)')
    f.addColorStop(67 / o, 'rgba(0,0,0,1)')
    f.addColorStop(78 / o, 'rgba(0,0,0,1)')
    f.addColorStop(88 / o, 'rgba(0,0,0,0)')
    f.addColorStop(100 / o, 'rgba(0,0,0,0)')
    f.addColorStop(108 / o, 'rgba(0,0,0,1)')
    f.addColorStop(117 / o, 'rgba(0,0,0,1)')
    f.addColorStop(136 / o, 'rgba(0,0,0,0)')
    f.addColorStop(1, 'rgba(0,0,0,0)')
    e.beginPath()
    e.arc(r / 2, a / 2, i, 0, Math.PI * 2)
    e.fillStyle = f
    e.fill()
    return t.toDataURL()
}

const imgMap = ref(dataDisplacementImg())
console.log(imgMap.value)
</script>

<style lang="less" scoped>
.target {
    width: 500px;
    height: auto;
    filter: url(#filter-ripple);
}
</style>
