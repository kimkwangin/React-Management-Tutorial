import React from 'react'   //React  라이브러리 추가
import { post }from 'axios' //axios에서 post형식으로 데이터  전송을 위해 라이브러리 추가

//출처: https://ndb796.tistory.com/222 [안경잡이개발자]
class  CustomerAdd  extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            birthday: '',
            gender:'',
            job:'',
            fileName:''
        }

        //이벤트 핸들러 등록
        //this.handleFormSubmit = this.handleFormSubmit.bind(this)
        //this.handleFileChange = this.handleFileChange.bind(this)
        //this.handleValueChange = this.handleValueChange.bind(this)
        //this.addCustomer = this.addCustomer.bind(this)
    }

    //Submit 핸들러
    handleFormSubmit = (e) => {
        console.log('handleFormSubmit....');

        //이벤트 핸들러의 경우 파라메터로 이벤트 핸들러가 들어온다
        //데이터가 서버에 전송될때 에러가 발생하지 않도록 호출
        e.preventDefault()
        this.addCustomer()
          .then((respose) => {
             //서버에서 response가 왔을떄 콘솔창에  출력
             console.log(respose.data);

             //상태만 갱신
             //비동기적으로 실행되므로
             //갱신하는데까지 시간이 걸림
             this.props.stateRefresh();
         })

        //서버로 고객정보를  전송후  클라이언트 뷰를 갱신
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })

        //전체 화면  리로드
        //window.location.reload();
    }

    //File 내용  변경 핸들러
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    //값 변경 핸들러
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        //값 갱신
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);

        //file이 포함된 경우 헤더를 추가해줘야 한다 (웹표준  규약)
        const config = {
            'content-type' : 'multipart/form-data'
        }

        console.log('addCustomer');
        //현재는 데이터 전송후 다시  전체 페이지가 불려지는데
        //데이터 부분만 갱신해는것이  바람직하다
        return  post(url, formData, config);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필  이미지: <input type="file" name="file" file={this.state.fileName} onChange={this.handleFileChange} /> <br/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> <br/>
                생년월일: <input  type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /> <br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /> <br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /> <br/>
                <button type="submit">추가하기</button>
            </form> 
        );
    }
}



//외부 라이브러리에서 사용할 수 있도록 export해준다
export default CustomerAdd;