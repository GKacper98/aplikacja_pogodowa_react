import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import Result from './Result';

//klucz do api
const APIKey = '53ad542efa2753b468bb3d0c1ab24e95';

class App extends Component {

  state = {
    value:'',
    date:'',
    city:'',
    sunrise:'',
    sunset:'',
    temp:'',
    pressure:'',
    wind:'',
    err:false,
  }

  //handleinputchange metoda do wywolywania wpisania w formularz nazwy value w tym wypadku miasta,
  //metoda ta pobiera value i ustawia w state
  // oraz ponownie renderuje wszystkie komponenty
  // pozniej podpinamy metode handle do danego kompnentu

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  //obsluga przycisku submit, czyi wyszukaj

  // handleCitySubmit = e =>{
  //   e.preventDefault();
    
  //   const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}`;
    
  //   //fetch wysyla zadanie pod adres api, dostamy odpowiedz na pozytywna lub nie,
  //   //zeby api dzialalo tworzymy metode pobierania czyli fetch danych z api
  //   //robimy ifa po to zeby przechwycic blad jesli nie ma bledu przechodzimy do kolejnych then
  //   fetch(API)
  //   .then(response => {
  //     if(response.ok){
  //       return response
  //     }
  //     throw Error("Nie udało się")
  //   })
  //   .then(response => response.json())
  //   .then(data => {

  //     const time = new Date().toLocaleString()


  //     //prevstate uzywamy do uzywania starych funkcji ktore sie nie zmieniaja, moze byc ale nie musi
  //     // czyli mowiac, odwolujemy sie do statevalue do aktualnej wartosci 
  //     this.setState(state => ({

  //       err: false,
  //       date: time,
  //       sunrise:data.sys.sunrise,
  //       sunset:data.sys.sunset,
  //       temp:data.main.temp,
  //       pressure:data.main.pressure,
  //       wind:data.wind.speed,
  //       city: state.value,
        
  //     }))
  //   })


  //   //mozna uzyc tez return zamiast state (), jak wyzej
  //   .catch(err => 
  //   {
  //     console.log(err)
  //     this.setState(prevState =>{

  //       return{
  //       err:true,
  //       city: prevState.value
  //     }})
  //   })
    
  
  // }

//handleinputchange tutaj ja wywołujemy ta metode w dziecku ktore z niego bedzie korzystac
  

//metoda, odswieza strone od razu po wpisaniu czegos w formularz
componentDidUpdate(prevProps, prevState){
  console.log("zmiana");

  if(prevState.value !== this.state.value) {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}`;
    
    //fetch wysyla zadanie pod adres api, dostamy odpowiedz na pozytywna lub nie,
    //zeby api dzialalo tworzymy metode pobierania czyli fetch danych z api
    //robimy ifa po to zeby przechwycic blad jesli nie ma bledu przechodzimy do kolejnych then
    fetch(API)
    .then(response => {
      if(response.ok){
        return response
      }
      throw Error("Nie udało się")
    })
    .then(response => response.json())
    .then(data => {

      const time = new Date().toLocaleString()


      //prevstate uzywamy do uzywania starych funkcji ktore sie nie zmieniaja, moze byc ale nie musi
      // czyli mowiac, odwolujemy sie do statevalue do aktualnej wartosci 
      this.setState(state => ({

        err: false,
        date: time,
        sunrise:data.sys.sunrise,
        sunset:data.sys.sunset,
        temp:data.main.temp,
        pressure:data.main.pressure,
        wind:data.wind.speed,
        city: state.value,
        
      }))
    })


    //mozna uzyc tez return zamiast state (), jak wyzej
    .catch(err => 
    {
      console.log(err)
      this.setState(prevState =>{

        return{
        err:true,
        city: prevState.value
      }})
    })
     
  }
}


render(){
  return (
    <div className="App">

      
      <Form 
      value={this.state.value} 
      change={this.handleInputChange}
      //submit={this.handleCitySubmit}
      />
      <Result weather={this.state} />
    </div>
    );
  }
}

export default App;
