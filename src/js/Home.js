import React from 'react'
import NavMain from './contents/NavMain'

class Home extends React.Component {
  render() {
    return (
      <div class="container" style={{width:"900px"}}>
        <h2>
          Welcome to Hyupsung Election App !
        </h2>
        <NavMain />
      </div>
    )
  }
}

export default Home
