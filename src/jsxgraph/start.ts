import JXG, {Line} from 'jsxgraph';
import Coefficient from "@/core/domain/math/classes/Coefficient";
import {Inequality} from "@/core/domain/math/classes/Inequality";
import {TargetFunction} from "@/core/domain/math/classes/simplex/TargetFunction";
import {ExtremumType} from "@/core/domain/math/enums/ExtremumType";
import Point from "@/core/domain/math/classes/Point";

function getRestructuredConstraintsInfo(inequalities: Inequality[], board: JXG.Board) {
    const inequalityAsObjects: unknown[] = []
    const lines: Line[] = []

    inequalities.forEach((line) => {
        const nonZeroCoefficients: Coefficient[] = []
        line.polynomial.coefficients.forEach((el) => {
            if (el.multiplier !== 0) {
                nonZeroCoefficients.push(el)
            }
        })

        const l = board.create(
            'line',
            [
                line.polynomial.constant,
                nonZeroCoefficients[0].multiplier,
                nonZeroCoefficients[1].multiplier
            ]
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

    return {inequalityAsObjects, plotLines: lines}
}

function buildGeometryArea(board: JXG.Board, inequalityObjects: unknown[]) {
    const [x, y] = [
        board.create('line', [0, 1, 0]),
        board.create('line', [0, 0, 1])
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

    console.log(target.toString())
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
        ]
    )
}

function getAllIntersectionPointsInFirstQuarter(board: JXG.Board, lines: Array<Line>) {
    const points: Array<Point> = []
    for (let i = 0; i < lines.length - 1; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            const intersection = board.create(
                'intersection',
                [lines[i], lines[j]],
                {opacity: 0.0}
            )

            points.push(
                new Point(intersection.X(), intersection.Y())
            )
        }
    }

    return points.filter((point) => {
        function isInFirstQuarter() {
            for (const coordinate of point.coordinates) {
                if (coordinate < 0) {
                    return false
                }
            }
            return true
        }

        return isInFirstQuarter()
    })
}

function getResult(sourceTarget: TargetFunction, points: Array<Point>) {
    const pointToValue = points.map((point) => {
        console.log(point.coordinates)
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
    shortedTarget: TargetFunction,
    inequalities: Array<Inequality>
) {
    const board = JXG.JSXGraph.initBoard(
        'jxgbox', {boundingbox: [-8, 8, 8, -8], axis: true}
    );

    const {inequalityAsObjects, plotLines} = getRestructuredConstraintsInfo(inequalities, board)
    const {axis} = buildGeometryArea(board, inequalityAsObjects)
    drawNormalVector(board, shortedTarget)

    const intersectionPoints = getAllIntersectionPointsInFirstQuarter(board, [...plotLines, ...axis])
    const extremum = getResult(shortedTarget, intersectionPoints)

    return extremum.point
}