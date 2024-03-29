export const cssCategory = 'position: sticky,position: fixed,display: flow-root,display: grid,display: inline-grid,isolation,display: flex,flex-direction: row,flex-direction: row-reverse,flex-direction: column,flex-direction: column-reverse,flex-wrap: nowrap,flex-wrap: wrap,flex-wrap: wrap-reverse,justify-content: flex-start,justify-content: flex-end,justify-content: center,justify-content: space-between,justify-content: space-around,align-items: flex-start,align-items: flex-end,align-items: center,align-items: baseline,align-items: stretch,align-content: flex-start,align-content: flex-end,align-content: center,align-content: space-between,align-content: space-around,align-content: stretch,order,flex-grow,flex-shrink,flex-basis,align-self: auto,align-self: flex-start,align-self: flex-end,align-self: center,align-self: baseline,align-self: stretch,transform: matrix(),transform: translate(),transform: translateX(),transform: translateY(),transform: scale(),transform: scaleX(),transform: scaleY(),transform: rotate(),transform: skew(),transform: skewX(),transform: skewY(),transform: translate3d(),transform: translateZ(),transform: scale3d(),transform: scaleZ(),transform: rotate3d(),transform: rotateX(),transform: rotateY(),transform: rotateZ(),transform: perspective(),linear-gradient,radial-gradient,conic-gradient,repeating-linear-gradient,repeating-radial-gradient,repeating-conic-gradient,block-size,writing-mode,caret-color,column-count,font-stretch,hyphens,inline-size,letter-spacing,line-break,white-space: nowrap,white-space: pre,white-space: pre-wrap,white-space: pre-line,white-space: break-spaces,word-break: keep-all,border-block,border-block-end,border-inline,clip-path,overflow-x,overflow-y,filter: blur(),filter: brightness(),filter: contrast(),filter: drop-shadow(),filter: grayscale(),filter: hue-rotate(),filter: invert(),filter: opacity(),filter: saturate(),filter: sepia(),scroll-behavior,scroll-margin,scroll-padding,scroll-snap-align,scroll-snap-stop,transition'.split(',')

export const es6Category = 'Destructuring in objects,Destructuring in arrays,Spread syntax in array literals,Spread syntax in function calls,Spread syntax in object literals,Exponentiation (**),Exponentiation assignment (**=),Nullish coalescing operator (??),Nullish coalescing assignment (??=),Optional chaining (?.),Logical OR assignment (||=),Logical AND assignment (&&=),import.meta,class expression,class super(),function* expression && yield,Promise,async function expression && await,async function* expression,yield*,Function.prototype[@@hasInstance](),for...of in String,String.includes(),String.at(),String.replaceAll(),String.trimEnd()/trimStart(),RegExp.prototype[@@match](),RegExp.prototype[@@matchAll](),RegExp.prototype[@@replace](),RegExp.prototype[@@search](),RegExp.prototype[@@split](),Array.prototype.at(),Array.prototype.copyWithin(),Array.prototype.entries(),Array.prototype.fill(),Array.prototype.find(),Array.prototype.findIndex(),Array.prototype.findLast(),Array.prototype.findLastIndex(),Array.prototype.flat(),Array.prototype.flatMap(),Array.from(),Array.prototype.includes(),Array.of(),Array.prototype.values(),Array.prototype.toReversed(),Array.prototype.toSorted(),Array.prototype.toSpliced(),Array.prototype.with(),Object.assign(),Object.getOwnPropertyDescriptors(),Object.hasOwn(),Object.values(),Object.entries(),Object.fromEntries(),Set() constructor,Set.prototype[@@iterator](),Set[@@species],Map() constructor,Map[@@species],Proxy() constructor,Proxy.revocable(),Reflect,ArrayBuffer() constructor,ArrayBuffer[@@species],ArrayBuffer.prototype.maxByteLength,ArrayBuffer.prototype.resizable,ArrayBuffer.prototype.resize()'.split(',')

// vivo X7(5) HUAWEI P8max(6)
// export const brandCategory = 'vivo X7(5),HUAWEI P8max(6),vivo X9(7),MI 6X(8),JSN-AL00(8),MI 6X(9),Mi 10(10),V1838A(10),Mi 10 Pro(11),M2012K11AC(12),2201123C(13)'.split(',')
export const brandCategory = [
    // 'HUAWEI P8max(6)',
    'Redmi 5 Plus(7)',
    'MI 6X(8)',
    'MI 6X(9)',
    'V1838A(10)', 'COL-AL10(10)', 'HMA-AL00(10)',
    'Mi 10 Pro(11)',
    'M2012K11AC(12)',
    'GM1900(12)',
    'M2012K11C(13)', '2201123C(13)'
]

export const deviceOptions = [
    {
        label: '红米5plus(安卓7)',
        value: 0
    },
    {
        label: '小米6x(安卓8)',
        value: 1
    },
    {
        label: '小米6x(安卓9)',
        value: 2
    },
    {
        label: 'VIVOX27(安卓10)',
        value: 3
    },
    {
        label: '荣耀10(安卓10)',
        value: 4
    },
    {
        label: 'mate 20(安卓10)',
        value: 5
    },
    {
        label: '小米10pro(安卓11)',
        value: 6
    },
    {
        label: 'Redmi K40(安卓12)',
        value: 7
    },
    {
        label: '一加7pro(安卓12)',
        value: 8
    },
    {
        label: '小米11(安卓13)',
        value: 9
    },
    {
        label: '小米12(安卓13)',
        value: 10
    }
]