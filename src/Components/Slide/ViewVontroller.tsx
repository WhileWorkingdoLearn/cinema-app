export interface ViewController {
  CardDim: { width: number; height: number };
  AnimPercentage: number;
  AnimTime: number;
  calcIndex: (cardCount: number) => number;
}

export default function Controller(): ViewController {
  const reCalcIndex = (cardCount: number) => {
    return 0;
  };

  return {
    CardDim: { width: 150, height: 150 },
    AnimPercentage: 25,
    AnimTime: 400,
    calcIndex: reCalcIndex,
  };
}
