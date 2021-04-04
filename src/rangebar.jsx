import {useState, useRef, useCallback} from 'react';

const Range = () => {
  let leftCoord = useRef();
  let leftPosition = useRef(0);

  let rigthCoord = useRef();
  let rigthPosition = useRef(300);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(300);



  const handlerLeft = (e) => {
    const val = e.target.value;
    if (val >= 300 || Number(val) > Number(right)) {
      return;
    }
    setLeft(val)
  } 

  const handlerRight = (e) => {
    const val = e.target.value;
    if (val <= 0 || 300 <= val ||  Number(val) < Number(left)) {
      return;
    }
    setRight(val)
  }

  const activeChangePositionLeft = (e) => {
  
    leftCoord.current = e.clientX;
    
    document.addEventListener('mousemove', changeCoordLeft)
    document.addEventListener('mouseup', () => (
      document.removeEventListener('mousemove', changeCoordLeft)
    ))
  }

  const activeChangePositionRigth = (e) => {
    rigthCoord.current = e.clientX;
    document.addEventListener('mousemove', changeCoordRigth)
    document.addEventListener('mouseup', () => (
      document.removeEventListener('mousemove', changeCoordRigth)
    ))
  }

  const changeCoordLeft = useCallback((moveEvt) => {
    moveEvt.preventDefault();
    const shift = leftCoord.current - moveEvt.clientX;
  
    leftCoord.current = moveEvt.clientX;

    setLeft(prevLeft => {
      leftPosition.current = prevLeft - shift;
      if (prevLeft - shift < 0) {
        return 0
      }
      if (prevLeft - shift > rigthPosition.current) {
        return rigthPosition.current
      }
      return prevLeft - shift
    })
    
  }, [])

  const changeCoordRigth = useCallback((moveEvt) => {
    moveEvt.preventDefault();
    const shift = rigthCoord.current - moveEvt.clientX;
  
    rigthCoord.current = moveEvt.clientX;

    setRight(prevRigth => {
      rigthPosition.current = prevRigth - shift;
      if (prevRigth - shift < leftPosition.current) {
        return leftPosition.current
      }
      if (prevRigth - shift > 300) {
        return 300
      }
      return prevRigth - shift
    })
    
  }, [])



  return (
    <div className='range'>
      <input value={left} onChange={handlerLeft}/>
      <div className='wrapper'>
        <div className='result'></div>
        <div className='leftBar bar' style={{left: `${left/300 * 100}%`}}
          onMouseDown={activeChangePositionLeft}
          ></div>
        <div className='rightBar bar' style={{left: `${right/300 * 100}%`}}
         onMouseDown={activeChangePositionRigth}></div>
      </div>
      <input value={right} onChange={handlerRight}/>
    </div>
  )
}

export default Range;