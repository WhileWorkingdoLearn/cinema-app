
import {  ReactNode, useEffect, useRef, useState } from 'react';
import './slideView.css';
import Controller from './ViewVontroller';

function Slot(props:{ width:number,height:number,index:number}){
  return (<>
  <div className='Slot' style={{
    width:props.width,
    height:props.height
  }}>Slot + {props.index}</div>
  </>);
}

function SlideView(params:{tiitle:string,item:ReactNode}){
  const [translateX,setTranslateX]= useState<{
    transform: string,
    transitionDuration:string
  }>( {
    transform: `translateX(${0}%)`,
    transitionDuration: `${0}ms`
  });
  const [cardCount,setCardCount] = useState<number>(0);
  const viewContainerRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const viewController = Controller();

 
  const buttonEvent = (dir:'next' | 'prev')=>{
    var update = {
      transform: `translateX(${0}%)`,
      transitionDuration: `${0}ms`
    }

    if(dir === 'next'){
        var update = {
          transform: `translateX(-${viewController.AnimPercentage}%)`,
          transitionDuration: `${viewController.AnimTime}ms`,
      }   
    }

    if(dir === 'prev'){
        var update =  {
          transform: `translateX(${viewController.AnimPercentage}%)`,
          transitionDuration: `${viewController.AnimTime}ms`
      }
    }

    setTranslateX(update);
    
    setTimeout(()=>{
      setTranslateX(
        {
          transform: `translateX(${0}%)`,
          transitionDuration: `${0}ms`
        })},viewController.AnimTime); 
        
}  

  
  const updateCardCount = () => {
    if(cardContainerRef .current){
      const containerWidth = cardContainerRef .current.clientWidth;
      const newCardCount = Math.floor(containerWidth / viewController.CardDim.width);
      setCardCount(newCardCount);
    }
  }

  useEffect(() => {
    updateCardCount();
    window.addEventListener('resize', updateCardCount);
    return () => window.removeEventListener('resize', updateCardCount);
  },[]);

  
  
  return (<>
      <div className='MainFrame'>
        <header>
        <div className="Title"> {params.tiitle}</div>
        </header>    
        <div  className='ComponentGrid'>
          <button className='SlideButtonLeft' 
            onClick={()=> { buttonEvent('prev')}}>prev</button>
            <div className='ViewContainer' 
              ref={viewContainerRef}>

                <div className='CardContainer' 
                  style={translateX} 
                  ref={cardContainerRef}>
                  {
                    Array.from({length: cardCount}, (_, i) => i + 1).map((value:number) => {
                        return<div className='Slot' key={value} style={{
                          width:viewController.CardDim.width,
                          height:viewController.CardDim.height
                        }}>{params.item}
                        </div>;
                    })               
                  }
                </div>           
            </div>
            <button className='SlideButtonRight' onClick={()=> { buttonEvent('next')}}>next</button>
        </div>
      </div>
  </>);

}

export default SlideView;
