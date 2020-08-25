import React from 'react'
import NavMain from './contents/NavMain'

class Home extends React.Component {
  render() {
    return (
      <div class="bg-dark text-white" style={{padding:"100px"}}>
        <div class="container text-center">
          <h2 class="mb-4">Welcome to Hyupsung Election App!</h2> <br/>
          <NavMain />
        </div>
      </div>
    )
  }
}

export default Home
