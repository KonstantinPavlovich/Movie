import '../css/globalcss.css'
import { useState } from "react";
import React from "react";

export default function MyApp({ Component, pageProps }) {
  const [value1, setValue1] = React.useState('Red'),
        [value2, setValue2] = React.useState('movie'),
        [amount, setValue3] = React.useState("Ищем фильмы"),
        [mas_films, setValue4] = React.useState([]), 
        [film_about, setValue5] = React.useState('') 
        ;     
   return <><h1>Итоговая работа по NextJs+React</h1>
  <div className="mydiv"><p>Поиск фильмов:</p>
  <div className="form" id="myform">
       <span>Название фильма:</span> 
       <input id="inp1" value={value1} name="inp1" onChange={event=>setValue1(event.target.value)} title="Введите фрагмент названия фильма" placeholder="Название фильма"></input><br></br>
       <span>Тип фильма:</span>
       <select name="inp2" size="1" value={value2} onChange={event=>setValue2(event.target.value)} id="inp2">
         <option value="movie">Фильмы</option>
         <option value="series">Сериалы</option>
         <option value="episode">Эпизоды</option>
       </select>  
       <button id="btn1" onClick={()=>films(value1,value2,setValue3,setValue4,setValue5)}>Поиск</button>
      </div> 
</div>       
<div className="found" id="result">
  <div className="amount_films" id="amountf">{amount}</div>
  <div className="cards" id="cards">
  {Film_cards(mas_films,(ev)=>setValue5(ev))}
 </div>
 </div>
 {Dop_info(film_about)}
</>
}

function films(inp1,inp2,f3,f4,f5){
       let poisk=(inp1==0?'':'&s='+inp1.trim()), type=inp2,
           str = 'https://www.omdbapi.com/?apikey=b2ad8fab'+poisk+'&type='+type,
           response, obj;
       f5('');    //  При новом поиске уберём информацию о старом фильме    
       if (poisk==='') {  // &&(typeof p != "number")){
           alert("Вы ничего не ввели в графе с названием фильма, поиск прерван.");
           return false;
     }
    //  msv.push("Новый фильм");
     fetch(str).then(response=>response.json(),err=>console.dir(err)).then(obj=>showFilms(obj,f3,f4));
 }
function Film_cards(m,f){
  let el, i, str = m.map((el,i)=>
     <><div className="cardf" id="tmpl">
     <img className="pict" id="pict1" src={el.Poster}></img>
   <div className="text" id="text1">
     <div className="genre" id="sp1">{el.Type}</div>
     <div className="name" id="sp12">{el.Title}</div>
     <div className="year" id="sp3">{el.Year}</div>
     <button id={el.imdbID} onClick={(event)=>film_about(event,f)}>Подробнее</button>    
  </div>
  </div></>)
  return str;
}

   function showFilms(mas,f3,f4){ 
    let elm;
    if (typeof mas.totalResults == "string"){     //   Если фильмы найдены
      f3("Найдено "+mas.totalResults+" фильмов");
      if (typeof mas.Search == "object") f4(mas.Search);}
    else{      //   Фильмы не найдены
      f3("Фильмы не найдены");
      f4([]);
    }  
    return mas.Response="True";
}

   function film_about(el,f){
    let film_id = el.target.id;
    let str = 'https://www.omdbapi.com/?apikey=b2ad8fab&i='+film_id;
    fetch(str).then(response=>response.json()).then((obj)=>Dop_info(obj,f))};

    function Dop_info(obj,f){
    if (typeof f=="function") f(obj);
    if (typeof obj !== "object") return '';
    return <>
    <div className="about_film">
    <span className="film_head"><h3>Информация о фильме:</h3></span>
  <div className="wind" id="wind">
    <img className="wind_pict" id="pict2" src={obj.Poster}></img>
    <div className="wind_text" id="text2">
      <div className="name2" id="name2">Название фильма: {obj.Title}</div>
      <div className="year2" id="year2">Релиз: {obj.Year}</div>
      <div className="genre2" id="genre2">Жанр: {obj.Type}</div>
      <div className="country" id="country">Страна: {obj.Country}</div>
      <div className="director" id="director">Режиссёр: {obj.Director}</div>
      <div className="writer" id="writer">Сценарий: {obj.Writer}</div>
      <div className="actors" id="actors">Актёры: {obj.Actors}</div>
      <div className="awards" id="awards">Награды: {obj.Awards}</div>
    </div>
  </div>
    </div>
    </>
    }

   
 