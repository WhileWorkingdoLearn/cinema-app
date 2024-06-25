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
            <SlideView/>
      
    </div>
    </>);
}

export default MainPage;