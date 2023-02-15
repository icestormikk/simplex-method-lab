import './App.scss'
import {gauss} from "@/core/gauss/gauss";

function App() {
  const handleButtonClick = async () => {
    const matrix = [
      [2, -1, -4],
      [6, 1, -6]
    ]

    console.log(matrix)
    await gauss(matrix)
    return matrix
      .map((el) => el[el.length - 1])
      .map((el, index) => `x${index}: ${el.toFixed(10)}\n`)
      .reduce((a, b) => a + b, '')
  }

  return (
    <div className="App">
      <h1>Testing screen</h1>
      <button
        type="button"
        onClick={() => {
          handleButtonClick()
            .then((result) =>
              console.log(result)
            )
        }}
      >
        Test
      </button>
    </div>
  )
}

export default App
