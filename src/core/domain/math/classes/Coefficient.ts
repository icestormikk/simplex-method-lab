export default class Coefficient {
    constructor(
        public multiplier: number,
        public index: number
    ) {}

    public toString() : string {
        return `${this.multiplier}${this.index !== undefined ? `*x${this.index}` : ''}`
    }
}