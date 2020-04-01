import React, { useState, useEffect } from 'react';

function useHookMock(initial) {
  const [init, setInit] = useState(initial);
  return [
    init,
    (v) => {
      return setInit(v + 1);
    },
  ];
}

export default () => {
  const [init, setInit] = useHookMock(0);
  useEffect(() => {
    setInit(1);
  }, []);
  return <div onClick={() => setInit(init + 1)}>click by add {init}</div>;
};
