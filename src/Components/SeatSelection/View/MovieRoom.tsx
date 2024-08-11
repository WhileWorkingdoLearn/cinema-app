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

import { CSSProperties } from "react";

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

export function Seat({
  boxSize,
  seatNumber,
  active,
}: {
  boxSize: CSSProperties;
  seatNumber: number;
  active: boolean;
}) {
  const handler = !active
    ? () => {}
    : () => {
        console.log("Click : " + seatNumber);
      };
  return (
    <div style={boxSize} onClick={handler}>
      {seatNumber}{" "}
    </div>
  );
}

export function SeatRange({
  range,
  seatNumberStart,
  display,
}: {
  range: number;
  seatNumberStart: number;
  display: boolean;
}) {
  const boxSize: CSSProperties = {
    width: "5rem",
    height: "5rem",
    margin: "5px",
    textAlign: "center",
    alignContent: "center",
    backgroundColor: "red",
  };

  if (!display) {
    boxSize.backgroundColor = "black";
  }

  return (
    <div style={rowStyle}>
      {[...Array(range).keys()].map((value, index) =>
        Seat({
          boxSize: boxSize,
          seatNumber: seatNumberStart + index,
          active: display,
        })
      )}
    </div>
  );
}

export function Row({ rows }: { rows: IRowSegment[] }) {
  return (
    <div style={rowStyle}>
      {rows.map((value) => (
        <SeatRange
          seatNumberStart={value.startNumber}
          range={value.range}
          display={value.display}
        />
      ))}
    </div>
  );
}

export default function MovieRoom({
  roomLayout,
}: {
  roomLayout: IRowSegment[][];
}) {
  return (
    <div style={collumnStyle}>
      {roomLayout.map((value, index) => (
        <Row key={index} rows={value} />
      ))}
    </div>
  );
}
