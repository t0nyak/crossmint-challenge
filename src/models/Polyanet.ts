import AstralObject from "./AstralObject";

class Polyanet extends AstralObject {
  constructor(row: number, column: number) {
    super(row, column);
  }

  toJson = () => {
    return {
      row: this.row,
      column: this.column,
    };
  };
}

export default Polyanet;
