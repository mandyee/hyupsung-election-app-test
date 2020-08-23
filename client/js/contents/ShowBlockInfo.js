import React from 'react'

class ShowBlockInfo extends React.Component {
  render() {
    var tableRows = [];
    _.each(this.props.block_ids, (value, index) => {
      tableRows.push(
        <tr key={this.props.block_hashes[index]}>
          <td className="tdCenter">{this.props.block_ids[index]}</td>
          <td>{this.props.block_hashes[index]}</td>
          <td>{this.props.block_ts[index]}</td>
        </tr>
      )
    });

    return (
      <div>
        <div>
          <p class="mb-5">
            블록체인 투표 시스템에서 어떤 활동이 발생하면, <br/>
            &nbsp; 1. 발생한 활동들을 모은 새로운 블록이 이전 블록에 연결되고 <br/>
            &nbsp; 2. 블록체인에 참여하는 모든 사용자가 정보를 공유하기 때문에 <br/>
            <strong>데이터가 안전하게 보관</strong>됩니다.
          </p>
        </div>
        Current Block: {this.props.curr_block} <hr/>
        <div>
          <table>
            <thead><tr>
              <th width='100px'>Block No</th>
              <th width='650px'>Txn Hash</th>
              <th>Timestamp</th>
            </tr></thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
        <hr/>
      </div>
    )
  }
}

export default ShowBlockInfo
