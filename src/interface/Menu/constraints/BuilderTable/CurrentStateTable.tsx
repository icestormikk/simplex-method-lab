import React from 'react';
import {useAppSelector} from "@/redux/hooks";
import {FractionView} from "@/core/domain/math/enums/FractionView";

function CurrentStateTable() {
    const targetFunction = useAppSelector((state) => state.main.targetFunction)
    const constraints = useAppSelector((state) => state.main.constraints)
    const viewMode = useAppSelector((state) => state.main.fractionViewMode)

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
                <div className="ml-4 text-gray-500 flex flex-col">
                    {
                        constraints.map((eq, index) => (
                            <b key={index}>{eq.toString()}</b>
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <b>Режим отображения дробей: </b>
                <b className="ml-4 text-gray-500 flex flex-col">
                    {
                        viewMode === FractionView.RATIONAL ? (
                            "Рациональные дроби"
                        ) : (
                            "Вещественные дроби"
                        )
                    }
                </b>
            </div>
        </div>
    );
}

export default CurrentStateTable;