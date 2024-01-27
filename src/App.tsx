import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components';
import './App.css';

interface ClicksData{
  clicks: number;
}

function App() {
  const [clicks, setClicks] = React.useState(0);

  React.useEffect(function () {
    fetch('http://localhost:8000/clicks')
    .then(function (response) {
      return response.json();
     })
     .then(function (data: ClicksData) {
      setClicks(data.clicks);
     });
  }, []);

  function resetClicks(){
    setClicks(0);
  }

  function increaseClicks() {
    setClicks(clicks + 1);

    const data: ClicksData = {
      clicks: clicks + 1,
    };

    fetch('http://localhost:8000/clicks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <RedButton onClick={increaseClicks}>НЕ НАЖИМАТЬ!</RedButton>
        <Counter>И все же ты нажал{clicks}</Counter>
        <GreenButton onClick={resetClicks}>Сброс!Пожалуйста!</GreenButton>
      </header>
    </div>
  );
}

export default App;

const RedButton = styled.button({
  height: 200,
  width: 200,
  backgroundColor: '#E80000',
  color: '#FFFFFF',
  fontSize: 18,
  fontWeight: 700,
  borderRadius: '50%',
  border: '3px solid #FFFFFF',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#F80000',
  },

  '&:active': {
    backgroundColor: '#D80000',
  }
})

const Counter = styled.p({
  fontSize: 24,
  color: '#FFFFFF',
})

const GreenButton = styled.button({
  height: 50,
  width: 500,
  backgroundColor: '#00FA9A',
  color: '#CD853F',
  fontSize: 20,
  fontWeight: 500,
  borderRadius: '40%',
  border: '3px solid #FFFFFF',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#008000',
  },

  '&:active': {
    backgroundColor: '#9ACD32',
  }
})
