import React from 'react'

class ShowAdminManual extends React.Component {
  render() {
    return (
      <div>
        <div>
          <p class="mb-5">
            <h4> <strong> 1. 선거 등록 </strong> </h4>
            <img src="../../img/add-election.PNG" alt="add-election"/>
          </p>
          <p class="mb-5">
            <h4> <strong> 2. 선거 시작 </strong> </h4>
            <img src="../../img/start-election.PNG" alt="start-election"/>
          </p>
          <p class="mb-5">
            <h4> <strong> 3. 선거 종료 </strong> </h4>
            <img src="../../img/end-election.PNG" alt="end-election"/>
          </p>
          <p class="mb-5">
            <h4> <strong> 4. 후보자 등록 </strong> </h4>
            <img src="../../img/add-candidate-1.PNG" alt="add-candidate"/>
            <img src="../../img/add-candidate-2.PNG" alt="add-candidate"/>
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

export default ShowAdminManual
