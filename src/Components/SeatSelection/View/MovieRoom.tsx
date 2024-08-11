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

import { CSSProperties, ReactNode, useRef } from "react";

export interface IRowSegment {
  startNumber: number;
  range: number;
  display: boolean;
}

export interface ISeat {
  id: number;
  isSold: boolean;
  isReservated: boolean;
}

const rowStyle: CSSProperties = {
  display: "flex",
  flex: "row",
  paddingTop: "0.5rem",
  justifyContent: "center",
};

const collumnStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginBottom: "20px",
};

const boxSize: CSSProperties = {
  width: "5rem",
  height: "5rem",
  margin: "5px",
  textAlign: "center",
  alignContent: "center",
  backgroundColor: "red",
};

const boxBlack: CSSProperties = {
  width: "5rem",
  height: "5rem",
  margin: "5px",
  textAlign: "center",
  alignContent: "center",
  backgroundColor: "black",
};

export interface SeatProps {
  boxStyle: CSSProperties;
  seatNumber: number;
  handleClickEvent?: (seat: ISeat) => void;
}

export interface SegmentProps {
  range: number;
  startNumber: number;
  isActive: boolean;
}

function Seat({ boxStyle, seatNumber, handleClickEvent }: SeatProps) {
  return (
    <div style={boxStyle} onClick={() => {}}>
      {seatNumber}{" "}
    </div>
  );
}

function PlaceHolder({ boxStyle }: SeatProps) {
  return <div style={boxStyle}>X</div>;
}

export default function CinemaHall({
  roomLayout,
}: {
  roomLayout: IRowSegment[][];
}) {
  const onSeatClicked = (seat: ISeat) => {};

  return (
    <Parent data={roomLayout}>
      {(rows) => (
        <Rows data={rows}>
          {(row) => <Segment props={row} onClicked={onSeatClicked} />}
        </Rows>
      )}
    </Parent>
  );
}

function Parent({
  data,
  children,
}: {
  data: IRowSegment[][];
  children: (props: IRowSegment[]) => React.ReactNode;
}) {
  const clickEvent = (seat: ISeat) => {};

  const props: SeatProps = {
    boxStyle: { width: "10px" },
    seatNumber: 0,
    handleClickEvent: clickEvent,
  };

  return (
    <div style={collumnStyle}>
      {data.map((value, index) => children(value))}
    </div>
  );
}

function Rows({
  data,
  children: component,
}: {
  data: IRowSegment[];
  children: (props: IRowSegment) => React.ReactNode;
}) {
  return <div style={rowStyle}>{data.map((value) => component(value))}</div>;
}

function Segment({
  props,
  onClicked,
}: {
  props: IRowSegment;
  onClicked: (seat: ISeat) => void;
}) {
  const item = props.display
    ? [...Array(props.range).keys()].map((value, index) =>
        Seat({
          boxStyle: boxSize,
          seatNumber: props.startNumber + index,
          handleClickEvent: onClicked,
        })
      )
    : [...Array(props.range).keys()].map((_value) =>
        PlaceHolder({ boxStyle: boxBlack, seatNumber: -1 })
      );
  return <div style={rowStyle}>{item}</div>;
}
