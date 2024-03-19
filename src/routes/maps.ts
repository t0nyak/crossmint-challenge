import express from "express";
import mapService from "../services/mapService";
import Polyanet from "../models/Polyanet";
import AstralObject from "../models/AstralObject";
import { delay } from "../utils/helpers";
import Soloon, { Color } from "../models/Soloon";
import Cometh, { Direction } from "../models/Cometh";

const router = express.Router();

router.get("/", async (_, res) => {
  const map = await mapService.getGoalMap();

  res.status(200).json({ map });
});

router.post("/reset", async (_, res) => {
  try {
    const map = await mapService.getCurrentMap();

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j]) {
          await mapService.deleteAstralObject(new AstralObject(i, j));
          await delay(600);
        }
      }
    }

    res.status(200).json({ success: true, message: "Map reset" });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
      message: "An error occurred while resetting the map",
    });
  }
});

router.post("/run-phase-one", async (_, res) => {
  try {
    const map = await mapService.getGoalMap();

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === "POLYANET") {
          await mapService.createAstralObject(new Polyanet(i, j));
          await delay(600);
        }
      }
    }

    res.status(200).json({ success: true, message: "Map implemented" });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
      message: "An error occurred while implementing the map",
    });
  }
});

router.post("/run-phase-two", async (_, res) => {
  try {
    const map = await mapService.getGoalMap();
    const objects: AstralObject[] = [];

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === "POLYANET") {
          objects.push(new Polyanet(i, j));
        } else if (map[i][j].includes("COMETH")) {
          const parts = map[i][j].split("_");

          objects.push(new Cometh(parts[0].toLowerCase() as Direction, i, j));
        } else if (map[i][j].includes("SOLOON")) {
          const parts = map[i][j].split("_");

          objects.push(new Soloon(parts[0].toLowerCase() as Color, i, j));
        }
      }
    }

    for (let i = 0; i < objects.length; i++) {
      await mapService.createAstralObject(objects[i]);
      await delay(600);
    }

    res.status(200).json({ success: true, message: "Map implemented" });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
      message: "An error occurred while running phase 2 in the map",
    });
  }
});

export default router;
