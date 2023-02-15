import {Matrix} from "@/core/domain/Matrix";

export function rebuildByMainElement(
  matrix: Matrix<number>,
  rowIndex: number,
  colIndex: number,
) {
  if (rowIndex > matrix.length - 1) {
    throw new Error(`Wrong row index configuration: ${rowIndex}`)
  }
  if (colIndex > matrix[0].length - 1) {
    throw new Error(`Wrong column index configuration: ${colIndex}`)
  }

  let max = Number.MIN_VALUE;
  let maxRowIndex = rowIndex;
  for (let i = rowIndex; i < matrix.length; i++) {
    if (matrix[i][colIndex] !== 0 && Math.abs(matrix[i][colIndex]) > max) {
      max = Math.abs(matrix[i][colIndex])
      maxRowIndex = i
    }
  }

  if (rowIndex !== maxRowIndex) {
    for (let i = 0; i < matrix[0].length; i++) {
      let temp = matrix[maxRowIndex][i]
      matrix[maxRowIndex][i] = matrix[rowIndex][i]
      matrix[rowIndex][i] = temp
    }
  }
}
