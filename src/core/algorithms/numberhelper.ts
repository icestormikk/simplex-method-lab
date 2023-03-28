import {ROUNDING_ACCURACY} from "@/core/constants";

const EPSILON = 10**(ROUNDING_ACCURACY * (-1))
const FRACTION_DIGITS = 20;

function getDifference(value: number) {
    return Math.abs(value - parseInt(`${value.toFixed(FRACTION_DIGITS)}`))
}

export function normalize(value: number) : number {
    if (getDifference(value) < EPSILON) {
        value = parseInt(`${value.toFixed(FRACTION_DIGITS)}`)
    }

    return value
}
