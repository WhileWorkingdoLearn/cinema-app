import SlideView from "../Components/Slide/SlideView";


function Image(){
    return (<div>Hello</div>);
}


function MainPage(){
    return (<>
    <div style={{  
        textAlign:'center', 
        backgroundColor:'black'   
        }}>
            <SlideView tiitle="Thriller" item={<Image/>}/>
      
    </div>
    </>);
}

export default MainPage;