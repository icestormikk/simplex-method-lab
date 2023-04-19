import React, {FormEvent} from 'react';

interface StartBasisFromProps {
    basisCoefficients: Array<number>
    setBasisCoefficients: React.Dispatch<React.SetStateAction<Array<number>>>
}

function StartBasisForm({basisCoefficients, setBasisCoefficients}: StartBasisFromProps) {
    const [list, setList] = React.useState([...basisCoefficients])

    const handleBasisUpdate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setBasisCoefficients(list)
    }

    const onChange = (value: number, index: number) => {
        setList((prevState) =>
            [...prevState.slice(0, index), value, ...prevState.slice(index + 1)]
        )
    }

    return (
        <form
            className="flex flex-col gap-2"
            onSubmit={(event) => handleBasisUpdate(event)}
        >
            <div className="flex gap-1">
                {
                    basisCoefficients.map((coefficient, index) => (
                        <input
                            key={index}
                            type="number"
                            id={`c-${index}`}
                            name={`c-${index}`}
                            defaultValue={coefficient}
                            className="w-16 h-8 px-2"
                            onChange={(event) => {
                                onChange(Number(event.target.value), index)
                            }}
                        />
                    ))
                }
            </div>
            <div>
                <button
                    type="submit"
                    className="w-max px-2 py-0.5 bg-green-600/80 text-[#efefef] rounded-md"
                >
                    Применить
                </button>
                {
                    basisCoefficients.length > 0 && (
                        <span className="text-gray-600 font-bold ml-3">
                            {'Текущий базис: (' + basisCoefficients.join(', ') + ')'}
                        </span>
                    )
                }
            </div>
        </form>
    );
}

export default StartBasisForm;