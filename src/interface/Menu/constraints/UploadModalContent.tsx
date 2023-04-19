import React, {ChangeEvent, FormEvent} from 'react';
import {ActionState} from "@/interface/domain/classes/ActionState";
import {readFileAsSimplexEntities} from "@/core/algorithms/filehelper";
import {useAppDispatch} from "@/redux/hooks";
import {updateConstraintsList, updateTargetFunction} from "@/redux/slices/MainState";

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
            <form onSubmit={(event) => event.preventDefault()}>
                <input type="file" name="path" id="path" onChange={(event) => handleFileChange(event)}/>
                <button
                    type="submit"
                    onClick={(event) => handleFileSubmit(event)}
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