import React, { useEffect, useRef, useState } from 'react'

function LifeCycle(props) {
  const [funcShow, setFuncShow] = useState(true)

  return (
    <div>
      <h1>Hello World!</h1>
      <input
        type='button'
        value='funcSelect'
        onClick={() => {
          setFuncShow(!funcShow)
        }}></input>
      {funcShow && <FuncComp initNumber={2} />}
    </div>
  )
}

//전역?변수들
let funcStyle = 'color : blue'
let render = 0
let update = false

function FuncComp(props) {
  const [number, setNumber] = useState(props.initNumber)
  const [date, setDate] = useState(new Date().toString())
  let testValue = 0
  const mountRef = useRef(false)

  /**
   * useEffect함수는 컴포넌트가 렌더링이 될 때마다 특정 작업을 할 수 있도록 해주는 Hook으로 lifeCycle에 해당되는 componentDidMount, componentDidUpdate,
   * componentWillunMount 이 외에 clean Up의 작업까지 가능하다.
   * 큰 틀은 useEffect(콜백함수,[배열 인자(들)]) 이며, 배열은 선택
   * 아래의 경우는 콜백함수(return X)만 있는 경우로, 동작되는 경우는 첫 렌더링(componentDidMount)과 state,props값 변경에 따른(componentDidUpdate) 동작만
   * 동작이 되는 경우이다.
   */
  // useEffect(() => {
  //   console.log(
  //     '%cfunc=>useEffect (componentDidMount & componentDidUpdate)' + ++render,
  //     funcStyle
  //   )
  // })

  /**
   * 콜백함수 내부에 return (함수)의 경우로 clean up이라는 동작을 구현한 것이다.
   * Clean Up의 역할은 return 하기 이전의 작업들을 다음 렌더링이 이루어진 후에 그 이전의 작업들에 대한 정리 or 후속 작업이다.
   * (render와 componentDidMount or componentDidUpdate 사이)
   *
   */
  // useEffect(() => {
  //   console.log(
  //     '%cfunc=>useEffect (componentDidMount & componentDidUpdate)' + ++render,
  //     funcStyle
  //   )
  //   //clean up(정리 or 후속작업)
  //   return () => {
  //     console.log('%cfunc=>return useEffect (clean up) ' + ++render, funcStyle)
  //   }
  // })

  /**
   * 아래의 경우는 콜백함수와 빈 배열이 있는 경우로, 배열에는 componentDidupdate에 영향을 주는 state,props중 특정 값(여러개 가능)을 넣을 수도있고
   * 아래처럼 빈 배열로만 선언할 수 있는데, 아래의 빈 배열의 경우에는 첫 화면 렌더링 이후에는 동작이 되지 않는 경우를 구현한 것
   */
  // useEffect(() => {
  //   console.log('%cfunc=>useEffect (componentDidMount)' + ++render, funcStyle)
  // }, [])

  /**
   * 아래의 경우는 콜백함수와 배열에 number라는 state가 들어간 경우로, 첫 화면 렌더링과 이후 number의 값이 변할 때만 componentDidUpdate가 동작이
   * 된다.
   */
  // useEffect(() => {
  //   console.log('%cfunc=>useEffect (componentDidMount, number change)'+ ++render, funcStyle)
  // }, [number])

  /**
   * useEffect(콜백함수 + return + 빈 배열) 조합
   * componentDidMount와 componentWillunMount의 경우에만 동작한다.
   * 빈 배열이므로 첫 화면 렌더링 이후 componentDidUpdate에서는 동작을 안하다가 컴포넌트가 제거되는 시점에 후속작업이 동작이 되는 것이다.
   * 그 후속작업이 컴포넌트 제거되는 시점에 동작이 되는 것이므로 componentWillunMount의 동작을 구현한 것이라 볼 수 있다.
   * 여기에 배열에 값만을 추가한다면 배열에 들어간 값만이 바뀔때에 componentDidUpdate의 동작이 추가된다.
   * 주의할 점은 해당 useEffect가 실핼이 되어야 후속작업도 동작이 되는데 이후 다른 useEffect가 실행이 된다면 후속작업은 동작되지 않는다.
   * 컴포넌트가 제거되는 시점에서는 렌더링이 이루어지지 않고 바로 제거가 됨
   */
  // useEffect(() => {
  //   console.log('%cfunc=>useEffect (componentDidMount)' + ++render, funcStyle)
  //   return () => {
  //     console.log('componentWillunMount')
  //   }
  // }, [])

  /**
   * 위의 경우에서 내부 콜백함수만 제거하면 컴포넌트가 제거될 때만 동작이 되는 useEffect를 구현할 수 있다.
   */
  // useEffect(() => {
  //   return () => {
  //     console.log('componentWillunMount')
  //   }
  // }, [])

  /**
   * componentDidUpdate만 동작이 되게하는 방법은 useRef 훅을 통하여 첫 렌더링일 때는 false값으로 동작을 막고, 이후 true값으로 변경하여서
   * 이후의 componentDidupdate만 동작되게 하는 것이다. 당연히 배열안에 특정값을 넣는다면 특정값에서만 componentDidUpdate가 동작이 된다.
   * 이후 제거가되고 다시 첫 화면 렌더링 될때에는 다시 useRef 값이 false이므로 첫 화면 렌더링 때에 똑같이 동작이 안됨
   */
  // useEffect(() => {
  //   if (mountRef.current) {
  //     console.log('componentDidUpdate 실행')
  //   } else {
  //     mountRef.current = true
  //   }
  // }, [])

  console.log('%cfunc => render ' + ++render, funcStyle)

  return (
    <div className='container'>
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {date}</p>
      <input
        type='button'
        value='random'
        onClick={() => {
          setNumber(Math.random)
        }}></input>
      <input
        type='button'
        value='date'
        onClick={() => {
          setDate(new Date().toString())
        }}></input>
      <input
        type='button'
        value='testValue'
        onClick={() => {
          testValue = testValue + 1
          console.log('testvalue 값', testValue)
        }}></input>
    </div>
  )
}

export default LifeCycle
