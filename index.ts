const w : number = window.innerWidth
const h : number = window.innerHeight
const scGap : number = 0.05
const rFactor : number = 10
const foreColor : string = "#0D47A1"

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

class DrawingUtil {

    static drawArcExpandClearer(context : CanvasRenderingContext2D, sc1 : number, sc2 : number, r : number) {
        const rUpdated : number = r * sc1
        context.beginPath()
        var t = 0
        for (var i = 360 * sc2; i <= 360; i++) {
            const x : number = rUpdated * Math.cos(i * Math.PI / 180)
            const y : number = rUpdated * Math.sin(i * Math.PI / 180)
            if (t == 0) {
                context.moveTo(x, y)
            } else {
                context.lineTo(x, y)
            }
            t++
        }
        context.fill()
    }

    static drawAECNode(context : CanvasRenderingContext2D, x : number, y : number, scale : number) {
        const r : number = Math.min(w, h) / rFactor
        const sc1 : number = ScaleUtil.divideScale(scale, 0, 2)
        const sc2 : number = ScaleUtil.divideScale(scale, 1, 2)
        context.fillStyle = foreColor
        context.save()
        context.translate(x, y)
        DrawingUtil.drawArcExpandClearer(context, sc1, sc2, r)
        context.restore()
    }
}

class State {

    scale : number = 0
    dir : number = 0
    prevScale : number = 0

    update(cb : Function) {
        this.scale = ScaleUtil.updateValue(this.scale, this.dir)
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
            cb()
        }
    }

    startUpdating(cb : Function) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            cb()
        }
    }
}

class Animator {

    animated : boolean = false
    interval : number

    start(cb : Function) {
        if (!this.animated) {
            this.animated = true
            this.interval = setInterval(cb, 50)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}
