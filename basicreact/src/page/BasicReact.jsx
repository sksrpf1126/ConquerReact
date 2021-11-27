import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HLink = styled(Link)`
  margin: 0 10px 0 10px;
`

function BasicReact(props) {
  return (
    <div>
      <HLink to='/Immutability'>불변성</HLink>
      <HLink to='/LifeCycle'>라이프사이클</HLink>
    </div>
  )
}

export default BasicReact
