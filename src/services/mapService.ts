import AstralObject from "../models/AstralObject";
import Cometh from "../models/Cometh";
import Soloon from "../models/Soloon";
import axios from "axios";

class MapService {
  baseUrl: string = "https://challenge.crossmint.io/api/";
  candidateId: string = "a6a74fd4-908c-470d-a86f-87031a857470";

  getCurrentMap = async () => {
    try {
      const res = await axios.get(`${this.baseUrl}map/${this.candidateId}`);

      if (res.status === 200) {
        return res.data.map.content;
      }

      throw new Error("Failed to get map");
    } catch (error) {
      console.log(error);
    }
  };

  getGoalMap = async () => {
    try {
      const res = await axios.get(
        `${this.baseUrl}map/${this.candidateId}/goal`
      );

      if (res.status === 200) {
        return res.data.goal;
      }

      throw new Error("Failed to get map");
    } catch (error) {
      console.log(error);
    }
  };

  createAstralObject = async (object: AstralObject) => {
    try {
      console.log(this.urlMapper(object));
      const res = await axios.post(`${this.baseUrl}${this.urlMapper(object)}`, {
        candidateId: this.candidateId,
        ...object.toJson(),
      });

      if (res.status === 200) {
        return res.data;
      }

      throw new Error("Failed to create astral object");
    } catch (error) {
      console.log(error);
    }
  };

  deleteAstralObject = async (object: AstralObject) => {
    try {
      const res = await axios.delete(
        `${this.baseUrl}${this.urlMapper(object)}`,
        {
          data: {
            candidateId: this.candidateId,
            row: object.row,
            column: object.column,
          },
        }
      );

      if (res.status === 200) {
        return res.data;
      }

      throw new Error("Failed to delete astral object");
    } catch (error) {
      console.log(error);
    }
  };

  private urlMapper = (object: AstralObject) => {
    console.log("toJson", object.toJson());
    if (object instanceof Soloon) return "soloons";
    if (object instanceof Cometh) return "comeths";

    return "polyanets";
  };
}

export default new MapService();
