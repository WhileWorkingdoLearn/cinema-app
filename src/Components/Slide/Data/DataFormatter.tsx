import { Console } from "console";

// Generische Typen für die Felder
export type GenericArray<T> = T[];
export type GenericResult<T> = [GenericArray<T>, GenericArray<T>, GenericArray<T>];

// Funktion um das Array aufzuteilen
function transformArrayToRenderData<T>(array: GenericArray<T>, index: number, fieldSize: number): [T[],T[],T[]]  {
    // Validierung des Index
    //console.log("DateFormatter - Index" + index);
    if (index < 0 || index >= array.length) {
       //console.log("Index out of bounds");
       return [[], [], []];
    }

    // Funktion zum Aufteilen eines Arrays in Blöcke fester Länge und zyklisch zu füllen
    function getCyclicSlice(arr: GenericArray<T> , start: number, length: number): Array<T> {
        let result: Array<T> = [];
        for (let i = 0; i < length; i++) {
            result.push(arr[(start + i + arr.length) % arr.length]);
        }
        return result;
    }

    // Ergebnis Struktur vorbereiten
    let result: [T[],T[],T[]]  = [[], [], []];

    // Mittleres Array füllen
    result[1] = getCyclicSlice(array, index, fieldSize);
   // console.log(result[1]);
    // Linkes Array füllen
    result[0] = getCyclicSlice(array, index - fieldSize, fieldSize);
    // Rechtes Array füllen
    result[2] = getCyclicSlice(array, index + fieldSize, fieldSize);

    return result;
}


export default transformArrayToRenderData;
