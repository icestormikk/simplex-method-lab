import {Matrix} from "@/core/domain/Matrix";

export async function gauss(
  matrix: Matrix<number>,
) {
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][i] === 0) {
      continue
    }
    for (let j = matrix.length - 1; j > i; j--) {
      const coefficient = matrix[j][i] / matrix[i][i]
      for (let k = i; k < matrix[j].length; k++) {
        matrix[j][k] -= coefficient * matrix[i][k]
      }
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    const coefficient = matrix[i][i];
    if (!coefficient) {
      continue
    }
    for (let j = i; j < matrix[0].length; j++) {
      matrix[i][j] /= coefficient
    }
  }

  for (let i = matrix.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (matrix[i][i] === 0) {
        continue
      }

      const coefficient = matrix[j][i] / matrix[i][i]
      for (let k = i; k < matrix[0].length; k++) {
        matrix[j][k] -= coefficient * matrix[i][k]
      }
    }
  }
}
