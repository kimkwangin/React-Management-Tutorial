import React, { Component } from 'react';
import logo from './logo.svg';
import Customer from './components/Customer'
import './App.css';

const customers = [
  {
    'id':1,
    'image':'https://placeimg.com/64/64/1',
    'name':'족발',
    'birthday':'961222',
    'gender':'남자',
    'job':'직장인'
  },
  {
    'id':2,
    'image':'https://placeimg.com/64/64/2',
    'name':'문어발',
    'birthday':'971121',
    'gender':'남자',
    'job':'대학생'
  },
  {
    'id':3,
    'image':'https://placeimg.com/64/64/3',
    'name':'오리발',
    'birthday':'950212',
    'gender':'여자',
    'job':'중학생'
  }
]

class App extends Component {
  render() {
    return (
      <div>
        {
          customers.map(c=> {
            return (
              <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
              />
            );
          })
        }
      </div>
      
      /*
      <Customer 
          id={customers[0].id}
          image={customers[0].image}
          name={customers[0].name}
          birthday={customers[0].birthday}
          gender={customers[0].gender}
          job={customers[0].job}
      />
      */

      /*
      <div className="gray-background">
        <img src={logo} alt="logo" />
        <h2>Let's develop management system!</h2>
      </div>
      */
    );
  }
}

export default App;
