import React from 'react'

class ShowVoterManual extends React.Component {
  render() {
    return (
      <div>
        <div>
          <p class="mb-5">
            <h4> <strong> 1. 후보자 공약 보기 </strong> </h4>
            <img src="../../img/show-pledges-1.PNG" alt="show-pledges"/>
            <img src="../../img/show-pledges-2.PNG" alt="show-pledges"/>
          </p>
          <p class="mb-5">
            <h4> <strong> 2. 투표하기 </strong> </h4>
            <img src="../../img/vote-1.PNG" alt="vote"/>
            <img src="../../img/vote-2.PNG" alt="vote"/>
          </p>

          <hr/> <br/>
          <p class="mb-5">
            <h1> 공통 매뉴얼 </h1>
          </p>
          <p class="mb-5">
            <h4> <strong> 1. 투표율 확인 </strong> </h4>
            <img src="../../img/turnout-1.PNG" alt="turnout"/>
            <img src="../../img/turnout-2.PNG" alt="turnout"/>
          </p>
          <p class="mb-5">
            <h4> <strong> 2. 투표 결과 확인 </strong> </h4>
            <img src="../../img/results-1.PNG" alt="results"/>
            <img src="../../img/results-2.PNG" alt="results"/>
          </p>
          <p class="mb-5">
            <h4> <strong> 3. 블록 정보 확인 </strong> </h4>
            <img src="../../img/blockinfo.PNG" alt="blockinfo"/>
          </p>
        </div>
        <hr/>
      </div>
    )
  }
}

export default ShowVoterManual
