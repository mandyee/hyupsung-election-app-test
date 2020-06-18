import React from 'react'

import App from './App'
import ShowBlockInfo from './contents/ShowBlockInfo'

class BlockInfo extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container">
            <a class="navbar-brand" style={{color:"white"}}>Hyupsung Election App</a>
          </div>
        </nav>

        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <h1 class="my-4"> 블록 정보 <small>Block Information</small> </h1>
              <br/>
              <ShowBlockInfo
                block_ids={this.props.block_ids}
                block_hashes={this.props.block_hashes}
                block_ts={this.props.block_ts}
                curr_block={this.props.curr_block}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BlockInfo
