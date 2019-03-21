import React from 'react';

//Material UI를 사용하기 위해
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';

class Customer extends React.Component
{
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.image?<img src= {this.props.image} alt="pfofile"/>:''}</TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        );
    }
}

class CustomerBack extends React.Component {
    render() {
        return(
           <div>
               <CustomerProfile id={this.props.id} image={this.props.image} name={this.props.name} />
               <CustomerInfo birthday={this.props.birthday} gender={this.props.gender} job={this.props.job}/>
           </div>
        );
    }
}

//Customer 정보를 Customerprofile과 Info로 나누어 출력
class CustomerProfile extends React.Component {
    //Customer의 id 와 image를 randering하는 부분
    render() {
        return(
            <div>
                <image src={this.props.image} alt="pfofile" />
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        );
    }
}

class CustomerInfo extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.birthday}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        );
    }
}

export default Customer;