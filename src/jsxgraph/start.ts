import JXG, {Line} from 'jsxgraph';
import {Inequality} from "@/core/domain/math/classes/Inequality";
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";
import Point from "@/core/domain/math/classes/Point";

const CONSTRAINTS_LINE_COLOR = 'lightgray';

function getRestructuredConstraintsInfo(inequalities: Inequality[], board: JXG.Board) {
    const inequalityAsObjects: unknown[] = []
    const lines: Line[] = []

    const axisIndexes = inequalities
        .find((el) =>
            el.polynomial.coefficients.filter((coef) =>
                coef.multiplier !== 0
            ).length === 2
        )
        ?.polynomial.coefficients
        .filter((el) => el.multiplier !== 0)
        .map((el) => el.index) || [0, 1]

    inequalities.forEach((line) => {
        const a = line.polynomial.coefficients.find((el) =>
            el.index === axisIndexes[0]
        )?.multiplier || 0
        const b = line.polynomial.coefficients.find((el) =>
            el.index === axisIndexes[1]
        )?.multiplier || 1

        const l = board.create(
            'line',
            [
                line.polynomial.constant, a, b
            ],
            {strokeColor: CONSTRAINTS_LINE_COLOR}
        )
        lines.push(l)
        inequalityAsObjects.push(
            board.create(
                'inequality',
                [l],
                {fillColor: 'transparent', inverse: true}
            )
        )
    })

    return {inequalityAsObjects, plotLines: lines, axisIndexes}
}

function buildGeometryArea(board: JXG.Board, inequalityObjects: unknown[]) {
    const [x, y] = [
        board.create('line', [0, 1, 0], {strokeColor: CONSTRAINTS_LINE_COLOR}),
        board.create('line', [0, 0, 1], {strokeColor: CONSTRAINTS_LINE_COLOR})
    ]

    let area = board.create(
        'curveintersection',
        [
            board.create('inequality', [x], {inverse: true, fillOpacity: 0.0}),
            board.create('inequality', [y], {inverse: true, fillOpacity: 0.0})
        ],
        {fillOpacity: 0.0}
    )

    for (let i = 0; i < inequalityObjects.length; i++) {
        area = board.create(
            'curveintersection',
            [area, inequalityObjects[i]],
            i === inequalityObjects.length - 1
                ? {fillOpacity: 0.6, fillColor: 'red'}
                : {fillOpacity: 0.0}
        )
    }

    return {axis: [x, y]}
}

function drawNormalVector(board: JXG.Board, target: TargetFunction) {
    const coordsFrom = [0, 0]
    const coordsTo = target.func.coefficients
        .slice(0, 2)
        .map((el) => el.multiplier)

    if (target.extremumType === ExtremumType.MINIMUM) {
        for (let i = 0; i < coordsTo.length; i++) {
            coordsTo[i] *= -1
        }
    }

    board.create(
        'arrow',
        [
            board.create('point', coordsFrom),
            board.create('point', coordsTo)
        ],
        {strokeColor: 'orange'}
    )
}

function drawIntersectionPointsInFirstQuarter(board: JXG.Board, lines: Array<Line>) {
    for (let i = 0; i < lines.length - 1; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            board.create(
                'intersection',
                [lines[i], lines[j]],
                {opacity: 0.0}
            )
        }
    }
}

function getResult(sourceTarget: TargetFunction, points: Array<Point>) {
    const pointToValue = points.map((point) => {
        return {
            point,
            value: sourceTarget.func.getValueIn(...point.coordinates)
        }
    }).sort(
        sourceTarget.extremumType === ExtremumType.MAXIMUM
            ? (a, b) => b.value - a.value
            : (a, b) => a.value - b.value
    )

    return pointToValue[0]
}

export function passPlotStep(
    resultBySimplex: Array<number>,
    shortedTarget: TargetFunction,
    inequalities: Array<Inequality>
) {
    const board = JXG.JSXGraph.initBoard(
        'jxgbox', {boundingbox: [-10, 10, 10, -10], axis: true}
    );

    const {inequalityAsObjects, plotLines, axisIndexes} = getRestructuredConstraintsInfo(inequalities, board)
    const {axis} = buildGeometryArea(board, inequalityAsObjects)
    drawNormalVector(board, shortedTarget)

    drawIntersectionPointsInFirstQuarter(board, [...plotLines, ...axis])
    board.create(
        'point',
        [
            resultBySimplex[axisIndexes[0]], resultBySimplex[axisIndexes[1]]
        ],
        {fillColor: 'red'}
    )

    return {axisIndexes}
}