import './App.css';
import React, { useState, useEffect } from 'react';
import Spinner from "./Spinner-1s.svg";

var abort = false;


function App() {

  const [data, setData] = useState(null);
  const [input, setInput] = useState(null);
  const [prompt, setPrompt] = useState(null);
  const [images, setImages] = useState([]);
  const [isDisabled, setButton] = useState(false);  
  const [viewObj, setObj] = useState("");
  const [bodyStyle, setStyle] = useState({});
  const [imgStyle, setImgStyle] = useState({});
  const [presetStyle, setPresetStyle] = useState("");


  function disableButton(){

    setButton(true);
  }

  function enableButton(){

    setButton(false);
  }

  function handleChange(event){

    setInput(event.target.value);
    setPrompt(event.target.value);

  }

  function hanldePresetStyle(event){

    setPresetStyle(event.target.value);
  }

  async function handleClick(event){
    disableButton();
    setObj("");
    setImgStyle({});
    event.preventDefault();
    setData(Spinner);
    setImages([Spinner,Spinner,Spinner,Spinner,Spinner,Spinner]);
    fetchData();
  }

  const fetchData = async () => {

    const url = process.env.REACT_APP_URL + prompt + "&style=" + presetStyle ;
    const imgs = [Spinner,Spinner,Spinner,Spinner,Spinner,Spinner];
    const imgsProdia = [Spinner,Spinner,Spinner,Spinner,Spinner,Spinner];

    let limitCounter = 0;

    for(let i=0;i<6;i++){
      
        if(abort)break;

        const response = await fetch(url,{
        });
        const result = await response.json();
        imgsProdia[i]=result;
      }
        
      let ready = false;

        while(!ready && !abort){

          if(limitCounter>=65)break;

          ready=true;

          for(let i=0;i<6;i++){

            if(abort)break;

            limitCounter++;

            const imgResponse = await fetch(imgsProdia[i],{});

            if(imgResponse.status===200){
            imgs[i]=imgsProdia[i];
            setImages(imgs);
            setImgStyle({cursor:"zoom-in"}) 
          } else {ready=false;
          
            if(limitCounter>=30 && !abort){
              const response = await fetch(url,{
                
          });
          const result = await response.json();
          imgsProdia[i]=result;
        }
        if(limitCounter>=55 && !abort){delete imgs[i]; setImages(imgs);}

  }}}

  if(abort){

    for(let i=0;i<6;i++){
      if(imgs[i]===Spinner)delete imgs[i];
    }
    setImages(imgs);
  }

  enableButton();
  abort = false;
  };

  function closeView(){

    setStyle({});
    setObj("");
  }

  function view(url){

    if(viewObj==""){
    setStyle({filter: "blur(8px)"});  
    setObj(<element onClick={() => closeView()} ><img className='view' src={url}></img></element>);
    
  }
    else {setStyle({}); setObj("");}

  }

  function cancelFetching(event){

    event.preventDefault();
    abort=true;
  }  
 
  return (
    <div onClick={() => viewObj!="" && closeView()} className="app">
    <link href="https://fonts.cdnfonts.com/css/crazy-robot" rel="stylesheet"></link>
     <main style={bodyStyle}>
     <h1>Genai</h1>
      <form>
      <div className='inputs'>
      <input onChange={handleChange} placeholder='Type Description' value={input}></input>
      <button onClick={handleClick} type='submit' disabled={isDisabled}>generate</button>
      </div>

      <div className='preset'>

      <select onChange={hanldePresetStyle} value={presetStyle}>

        <option value="">default</option>

        <option value="3d-model">3d-model</option>
        <option value="analog-film">analog-film</option>
        <option value="anime">anime</option>
        <option value="cinematic">cinematic</option>

        <option value="comic-book">comic-book</option>
        <option value="digital-art">digital-art</option>
        <option value="enhance">enhance</option>
        <option value="fantasy-art">fantasy-art</option>

        <option value="isometric">isometric</option>
        <option value="line-art">line-art</option>
        <option value="low-poly">low-poly</option>
        <option value="neon-punk">neon-punk</option>

        <option value="origami">origami</option>
        <option value="photographic">photographic</option>
        <option value="pixel-art">pixel-art</option>
        <option value="texture">texture</option>

        <option value="craft-clay">craft-clay</option>

      </select>
      {isDisabled && <button className='cancel' onClick={cancelFetching}>cancel</button> }
      </div>
      </form>
      
    <div className='imgs'>
    {images.map(e=>{

      return <element style={imgStyle} onClick={ () => e!=Spinner && view(e)}><img src={e}></img></element>
      
    })}

    </div>
    </main>
    {viewObj}
    </div>
  );
}

export default App;
