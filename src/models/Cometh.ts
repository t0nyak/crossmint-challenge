import AstralObject from "./AstralObject";

export type Direction = "up" | "down" | "left" | "right";

interface ICometh {
  direction: Direction;
}

class Cometh extends AstralObject implements ICometh {
  direction: Direction;

  constructor(direction: Direction, row: number, column: number) {
    super(row, column);
    this.direction = direction;
  }

  toJson = () => {
    return {
      row: this.row,
      column: this.column,
      direction: this.direction,
    };
  };
}

export default Cometh;
