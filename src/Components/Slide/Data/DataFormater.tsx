// Generische Typen für die Felder
export type GenericArray<T> = T[];
export type GenericResult<T> = [GenericArray<T>, GenericArray<T>, GenericArray<T>];

// Funktion um das Array aufzuteilen
function transformArrayToRenderData<T>(array: GenericArray<T>, index: number, fieldSize: number): [(T|null)[],(T|null)[],(T|null)[]]  {
    // Validierung des Index
    if (index < 0 || index >= array.length) {
       // throw new Error("Index out of bounds");
    }

    // Funktion zum Aufteilen eines Arrays in Blöcke fester Länge und zyklisch zu füllen
    function getCyclicSlice(arr: GenericArray<T> , start: number, length: number): Array<T | null> {
        let result: Array<T | null> = [];
        for (let i = 0; i < length; i++) {
            result.push(arr[(start + i + arr.length) % arr.length] || null);
        }
        return result;
    }

    // Ergebnis Struktur vorbereiten
    let result: [(T|null)[],(T|null)[],(T|null)[]]  = [[], [], []];

    // Mittleres Array füllen
    result[1] = getCyclicSlice(array, index, fieldSize);

    // Linkes Array füllen
    result[0] = getCyclicSlice(array, index - fieldSize, fieldSize);

    // Rechtes Array füllen
    result[2] = getCyclicSlice(array, index + fieldSize, fieldSize);

    return result;
}


export default transformArrayToRenderData;
