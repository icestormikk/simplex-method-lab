import {ROUNDING_ACCURACY} from "@/core/constants";
import {Rational} from "@/core/domain/math/classes/Rational";

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

export function fromRationalString(value: string) : number {
    if (!Rational.isRational(value)) {
        return 0
    }

    const nums = value.split('/')
    return Number(nums[0]) / Number(nums[1])
}
