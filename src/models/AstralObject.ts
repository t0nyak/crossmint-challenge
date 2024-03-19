interface IAstralObject {
  row: number;
  column: number;

  toJson: () => object;
}

class AstralObject implements IAstralObject {
  row: number;
  column: number;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  toJson = () => {
    return {
      row: this.row,
      column: this.column,
    };
  };
}

export default AstralObject;
