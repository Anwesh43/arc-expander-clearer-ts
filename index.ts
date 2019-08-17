const w : number = window.innerWidth
const h : number = window.innerHeight
const scGap : number = 0.05
const rFactor : number = 10

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n
    }

    static updateValue(scale : number, dir : number) : number {
        return scale + dir * scGap
    }
}
