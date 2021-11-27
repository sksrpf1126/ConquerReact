import React, { useState } from 'react'
import styled from 'styled-components'

const CountSpan = styled.span`
  margin: 0 10px 0 10px;
`

function Immutability(props) {
  console.log('Immutability component rendering')
  const [nameList, setNameList] = useState([]) //input란에 입력한 값을 배열 안에 객체로 저장

  //input란에 enter key down 시에 작동되는 이벤트
  const handleSetName = (e) => {
    if (e.keyCode == 13) {
      const nameListCopy = nameList // 불변성 X
      if (nameListCopy === nameList) {
        console.log('두 객체는 같은 공간을 참조하고 있습니다.')
        // nameListCopy.push({ name: e.target.value, id: Date.now() }) //->이러면 setNameList없이도 nameList의 값 변경이 이루어짐
        // //렌더링은 실행이 안되지만, 값의 변경이 직접 이루어지기 때문에 불변성을 깨트림
        // setNameList(nameListCopy) //값이 달라야만 렌더링이 이루어짐

        /**
         * 불변성 O
         * 불변성을 지켜야 하는 이유?
         * 1. js의 객체나 배열은 참조가 가능하여 값을 변경할 수 있는 변수들이다. 그렇기에 의도치 않은 값 변경은 해당 객체를 참조하고 있는 곳에서
         * 동시적으로 값의 변경이 이루어진다.
         * 2. 최적화를 하지 못한다. 기본적으로 최적화를 할 때 shouldComponentUpdate를 통해 이전 props,state값을 이후의 props,state값과 비교하여
         * 렌더링을 할지 안할지를 정할 수 있다.(function component의 경우에는 shouldComponentUpdate는 존재하지 않으며,useMemo를 통해 비슷하게 동작구현 가능)
         * 하지만, shouldComponentUpdate는 얕은 비교를 통해서 값을 비교를 한다. 그렇기에 객체의 경우 참조하는 주소값만으로 비교를 진행하기에 내부의 값을 조작하는
         * 행위로는 react에서 변경이 되지 않았다고 판단을 한다.
         * 이런 이유로 객체의 불변성을 통해 새로운 객체에 기존의 객체의 내부 값만을 복사 후에 내부 값만을 조작하면 둘의 참조하는 부분이 다르기에 react내부에서
         * 객체의 값 변경이 이루어졌다고 판단을 내린다.
         *
         */
        const differentNameList = [
          ...nameList,
          { name: e.target.value, id: Date.now() },
        ]
        setNameList(differentNameList)
      }

      //setNameList()
      console.log(nameList) //useState 훅으로 값 변경 시 입력한 값 바로 출력 X -> state 변경 - 리렌더링 - state 반영 useState는 비동기이기 때문
      e.target.value = '' //비우기
    }
  }
  return (
    <div>
      <input type='text' onKeyDown={handleSetName}></input>
      {nameList.map((nameObj, index) => {
        return <p key={nameObj.id}>{nameObj.name}</p>
      })}
    </div>
  )
}

export default Immutability
