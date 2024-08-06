
/*
 Booking Info
{
    programmId:"afafaaf",
    roomNumber:1,
    dateType:"",
    date:"",
    timeZone:"",
    time:"",
    unavailableSeatsCount:6,
    unavailableSeats: [22,23,43,33,34,35]
}
*/


import { CSSProperties, ReactNode, useRef } from "react"

export interface IRowSegment {
    startNumber:number,
    range:number,
    display:boolean
}

export interface ISeat {
    id:number,
    isSold:boolean,
    isReservated:boolean
}

const rowStyle :CSSProperties= {
    display:'flex',
    flex:'row',
    paddingTop:'0.5rem',
    justifyContent:'center'
}

const collumnStyle :CSSProperties= {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    marginBottom:'20px'
}

const boxSize : CSSProperties = {
    width:'5rem',
    height:'5rem',
    margin:'5px',
    textAlign:'center',
    alignContent:'center',
    backgroundColor:'red'
}

export interface SeatProps {
    boxStyle:CSSProperties,
    seatNumber :number,
    handleClickEvent?:(seat:ISeat)=>void
}

export interface SegmentProps {
    range:number,
    startNumber:number,
    isActive:boolean
}


function Seat({boxStyle, seatNumber,handleClickEvent}:SeatProps){

    return (<div style={boxStyle} onClick={}>{seatNumber} </div>);
}

function PlaceHolder({boxStyle}:SeatProps){
    return (<div style={boxStyle} >X</div>);
}

export function Segment({range,startNumber,isActive}:SegmentProps){


    if(!isActive){
        boxSize.backgroundColor = 'black'
    }

    return <div style={rowStyle}></div>
}


export default function MovieRoom({roomLayout}:{roomLayout:IRowSegment[][]}){
    
    const onSeatClicked = ()=> {};

    return <Parent data={[]}>{
            (rows)=>(<ChildA data={rows}>{
                (row)=> (<ChildB props={row} component={
                    (param) =><Seat boxStyle={param.boxStyle} seatNumber={param.seatNumber} handleClickEvent={onSeatClicked}/>}/>)
            }</ChildA>)}
        </Parent>
}



function Parent({data,children}:{data:IRowSegment[][],children:(props:IRowSegment[])=>React.ReactNode}){
    const clickEvent = (seat:ISeat)=>{}
    const props: SeatProps = {
        boxStyle:{width:"10px"},
        seatNumber:0,
        handleClickEvent:clickEvent
    }
    return (<div>{data.map((value,index)=> children(value))}</div>);
}

function ChildA({data,children: component}:{data:IRowSegment[],children:(props:IRowSegment)=>React.ReactNode}){
    return (<>{data.map((value)=>component(value))}</>);
}

function ChildB({props,component}:{props:IRowSegment,component:React.FC<SeatProps>}){
    const item = props.display ? [...Array(props.range).keys()].map(()=> component) : [...Array(props.range).keys()].map(()=> component);
    return (<div>{
         [...Array(props.range).keys()]
         .map((value,index)=> component({seatNumber:index+1,boxStyle:{width:'10px'},handleClickEvent:()=>{}}))        
         }</div>)
}
