import React, { useState } from 'react'

function useHookMock(initial) {
  const [init, setInit] = useState(initial)
  return [init, (v) => {
    return setInit(v + 1)
  }]
}

export default () => {
  const [init, setInit] = useHookMock(3)
  return <div onClick={() => setInit(init+1)}>click by add {init}</div>
}