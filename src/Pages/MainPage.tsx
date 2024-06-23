import SlideView from "../Components/Slide/View/SlideView";
import Controller from "../Components/Slide/Controller/ViewVontroller";
import DataHandler from "../Components/Slide/Data/DataProvider";


function Image(){
    return (<div>Hello</div>);
}


function MainPage(){
    return (<>
    <div style={{  
        textAlign:'center', 
        backgroundColor:'black'   
        }}>
            <SlideView tiitle="Thriller" controller={Controller(50,300,150,DataHandler())}/>
      
    </div>
    </>);
}

export default MainPage;