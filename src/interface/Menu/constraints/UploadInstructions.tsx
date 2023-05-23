import React from 'react';

function UploadInstructions() {
    return (
        <div className="max-w-[30rem] whitespace-break-spaces flex flex-col gap-4">
            <div>
                <p>
                    На вход поступает файл в формате <b>.txt</b>,
                    содержащий коэффициенты целевой функции,
                    а также ограничений, накладываемых на целевую функцию.<br/>
                    Коэффиценты, написанные в первой строчке файла, будут считаны как коэффициенты целевой
                    функции; последущие - как коэффициенты уравнений-ограничений.
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <p>Пример:</p>
                <div className="bordered rounded-md px-2 font-bold bg-gray-100 shadow-md relative">
                    <p>1 0 1 0</p>
                    <p>1 2 3 4</p>
                    <p>5 6 7 8</p>
                    <span className="absolute bottom-2 right-2 text-sm font-light">Загружаемый файл</span>
                </div>
                <div className="bordered rounded-md px-2 font-bold bg-gray-100 shadow-md relative">
                    <p>{'1*x0+1*x2 -> MIN'}</p>
                    <p>1*x0+2*x1+3*x2 = 4</p>
                    <p>5*x0+6*x1+7*x2 = 8</p>
                    <span className="absolute bottom-2 right-2 text-sm font-light">Результат в программе</span>
                </div>
            </div>
        </div>
    );
}

export default UploadInstructions;