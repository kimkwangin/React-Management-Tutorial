import React, { Component } from 'react';
import logo from './logo.svg';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd'; //사용자 추가 폼 화면에 출력하기 위해 
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';


//https://material-ui.com/demos/tables/

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress:{
    margin:theme.spacing.unit * 2
  }
})

const customers = [
  
]

class App extends Component {

  //고객정보를 동적으로 처리
  //props는 변경되지 않는 데이터를 처리
  //state는 변경되는 데이터를 처리
 constructor(props)  {
   super(props);
   this.state = {
     customers:"",
     completed:0
   }
 }

 //= () => { 이런식의  표현은 핸들러와 이벤트  등록을 동시에 해준다
 stateRefresh = () => {
    this.setState({
      customers:'',
      completed:0
    });

    this.callApi()
    //callApi를 호출해서 반환된 리턴값을 res로 받아서 customers에 셋팅
    .then(res => this.setState({customers: res}))
    //에러가 발생시 콘솔창에 에러를 출력
    .catch(err => console.log(err));
 }

  //api서버에서 데이터를 받아오는 처리
  //react Component는 라이프 싸이클이 존재하는데
  //react에서 컴포넌트가 모두 마운트가 되어졌을때 호출된다
  componentDidMount() {
    //0.02초 간격으로 프로그래스 갱신
    this.timer = setInterval(this.progress, 20);

    //프로그래스 바 Test를 위해서는 callApi를 주석으로 막으면 된다
    this.callApi()
    //callApi를 호출해서 반환된 리턴값을 res로 받아서 customers에 셋팅
    .then(res => this.setState({customers: res}))
    //에러가 발생시 콘솔창에 에러를 출력
    .catch(err => console.log(err));

  }

  //비동기 통신 처리
  //서버 재기동 필요
  //yarn dev
  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  //프로그래스 바 애니메이션
  progress = () => {
    const { completed } = this.state;
    this.setState({completed:completed >= 100 ? 0 : completed + 1});
  }

  //화면  뷰 출력
  render() {
    const { classes } = this.props;
    return (
      //사용자 추가 내용을 추가 하기 위해 div 태그를 추가
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              //고객의 데이터가 있는경우만 출력
              this.state.customers ?
              this.state.customers.map(c=> {
                return (
                  <Customer
                  stateRefresh={this.stateRefresh}
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                  />
                );
              }) : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
            }
            </TableBody>
          </Table>
        </Paper>

        <CustomerAdd stateRefresh={this.stateRefresh} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
