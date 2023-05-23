import React, {ChangeEvent, FormEvent} from 'react';
import {ActionState} from "@/interface/domain/classes/ActionState";
import {readFileAsSimplexEntities} from "@/core/algorithms/filehelper";
import {useAppDispatch} from "@/redux/hooks";
import {updateConstraintsList, updateTargetFunction} from "@/redux/slices/MainState";
import UploadInstructions from "@/interface/Menu/constraints/UploadInstructions";

function UploadModalContent() {
    const dispatch = useAppDispatch()
    const [file, setFile] = React.useState<File>()
    const [state, setState] = React.useState<ActionState|undefined>()

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (!event.currentTarget.files || event.currentTarget.files.length < 1) {
            setState(ActionState.Error("файл не найден"))
            return
        }

        setState(ActionState.Success())
        setFile(event.currentTarget.files[0])
    }

    const handleFileSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (!file?.path) {
            return
        }

        const {target, constraints} = await readFileAsSimplexEntities(file.path)
        dispatch(updateTargetFunction(target))
        dispatch(updateConstraintsList(constraints))
    }

    return (
        <div className="p-2 flex justify-start items-start flex-col gap-2">
            <UploadInstructions/>
            <b>Выберите файл, откуда будут считаны коэффициенты:</b>
            <form
                className="centered w-full"
                onSubmit={(event) => event.preventDefault()}
            >
                <input
                    className="border-0"
                    type="file"
                    name="path"
                    id="path"
                    onChange={(event) => handleFileChange(event)}
                    accept=".txt"
                />
                <button
                    type="submit"
                    onClick={(event) => handleFileSubmit(event)}
                    className="submit-button"
                >
                    Принять
                </button>
            </form>
            {
                state && (
                    <div className="centered text-center w-full">
                        <b style={{color: state.recommendedColor}}>{state.title}</b>
                    </div>
                )
            }
        </div>
    );
}

export default UploadModalContent;