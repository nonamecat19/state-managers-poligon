import {useState} from "react";

interface ReturnType {
    dependency: boolean
    update: () => void
}

const useForceUpdate = (): ReturnType => {
    const [dependency, setDependency] = useState<boolean>(true);
    const update = () => {
        setDependency(!dependency)
    }
    return {dependency, update}
}
export default useForceUpdate