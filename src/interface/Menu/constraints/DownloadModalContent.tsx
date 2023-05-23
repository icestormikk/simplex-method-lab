import React, {FormEvent} from 'react';
import * as os from "os";
import * as path from "path";
import {writeToFile} from "@/core/algorithms/filehelper";
import {useAppSelector} from "@/redux/hooks";

const DEFAULT_FILE_NAME = 'output';

function DownloadModalContent() {
    const [errorMessage, setErrorMessage] = React.useState<string|undefined>(undefined)
    const [finalMessage, setFinalMessage] = React.useState<string|undefined>(undefined)
    const {targetFunction, constraints} = useAppSelector((state) => state.main)
    const [filename, setFilename] = React.useState(DEFAULT_FILE_NAME)
    const userHomeDirectory = os.homedir()

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const fullPath = path.join(userHomeDirectory, filename + '.txt')

        writeToFile({target: targetFunction, constraints}, fullPath)
            .then((res) => {
                if (res.message !== undefined) {
                    setErrorMessage(res.message)
                } else {
                    console.log('suc')
                    setFinalMessage("Файл успешно сохранён")
                }
            })
    }

    return (
        <div className="flex flex-col gap-4 p-2">
            <p>Файл будет сохранён в директорию: <b>{userHomeDirectory}</b></p>
            <div className="centered flex-col gap-1">
                <p>Выберите имя сохраняемого файла</p>
                <form
                    className="flex flex-row justify-between items-center gap-2"
                    onSubmit={onSubmit}
                >
                    <input
                        type="text"
                        name="filename"
                        id="filename"
                        onChange={(event) => {
                            const value = event.target.value
                            setFilename(
                                value.length === 0 ? DEFAULT_FILE_NAME : value
                            )
                        }}
                        placeholder="Введите имя файла"
                        maxLength={40}
                    />
                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Применить
                    </button>
                </form>
                {
                    finalMessage && (
                        <span className="success-text">{finalMessage}</span>
                    )
                }
                <span className="text-gray-500">
                    Полный путь к файлу: {path.join(userHomeDirectory, filename + '.txt')
                }</span>
            </div>
            {
                errorMessage && (
                    <span>{errorMessage}</span>
                )
            }
        </div>
    );
}

export default DownloadModalContent;