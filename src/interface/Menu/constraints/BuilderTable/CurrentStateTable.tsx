import React from 'react';
import {useAppSelector} from "@/redux/hooks";

function CurrentStateTable() {
    const {targetFunction, constraints} = useAppSelector((state) => state.main)

    return (
        <div className="constraints-menu-panel">
            <div className="flex flex-col">
                <b>Текущая целевая функция:</b>
                <b className="ml-4 text-gray-500">
                    {
                        targetFunction.func.coefficients.filter((el) => el.multiplier !== 0).length ? (
                            targetFunction.toString()
                        ) : (
                            'Не задана'
                        )
                    }
                </b>
            </div>
            <div className="flex flex-col">
                <b>Ограничения:</b>
                <b className="ml-4 text-gray-500 flex flex-col">
                    {
                        constraints
                            .filter((eq) => eq.polynomial.coefficients.reduce((a,b) =>
                                a + b.multiplier, 0
                            ) !== 0)
                            .map((eq, index) => (
                            <b key={index}>{eq.toString()}</b>
                        ))
                    }
                </b>
            </div>
        </div>
    );
}

export default CurrentStateTable;