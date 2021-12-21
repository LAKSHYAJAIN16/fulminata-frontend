import React, {useRef, useEffect} from "react"

const useLeonidasCallback = (func, deps) => {
    const didMount = useRef(false)
   
    useEffect(() => {
      if (didMount.current) func()
      else didMount.current = true
     }, deps)
}

export default useLeonidasCallback;