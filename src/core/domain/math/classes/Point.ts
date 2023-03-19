import Line from "./Line";

export default class Point {
    readonly coordinates: Array<number>
    constructor(
        ...coordinates: Array<number>
    ) {
        this.coordinates = coordinates
    }

    isBelong(line: Line) : boolean {
        const result = this.coordinates.map((el, index) =>
            line.coefficients[index].multiplier * el
        ).reduce((a,b) => a + b, 0)
        return result + line.constant === 0.0
    }
}