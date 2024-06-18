
export interface ViewController {
    CardDim: {width:number,height:number};
    AnimPercentage:number,
    AnimTime:number,
};


export default function Controller():ViewController{
   
    
    return {
            CardDim:{width:150,height:150},
            AnimPercentage:25,
            AnimTime:400,
    }
}