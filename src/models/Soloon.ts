import AstralObject from "./AstralObject";

export type Color = "red" | "blue" | "purple" | "white";

interface ISoloon {
  color: Color;
}

class Soloon extends AstralObject implements ISoloon {
  color: Color;

  constructor(color: Color, row: number, column: number) {
    super(row, column);
    this.color = color;
  }

  toJson = () => {
    return {
      row: this.row,
      column: this.column,
      color: this.color,
    };
  };
}

export default Soloon;
