import { GAME_OBJECTS, GAME_OBJECT_STATE } from "../../constants";
import Factory from "../../factory";
import { IROBaseElementCfg } from "../../interfaces";
import BaseScene from "../../scenes/BaseScene";
import GameScene from "../../scenes/GameScene";
import GameStateManager from "../GameStateManager";
import GridCell from "../gridManager/GridCell";
import GridManager from "../gridManager/GridManager";
import { IMoveCfg } from "./interfaces";

export default class AiManager
{
    private readonly sceneGame: GameScene;

    constructor(scene: BaseScene) {
        this.sceneGame = scene as GameScene;
    }

    startAi() {
        this.sceneGame.gridManager.incrementGameOverCounter();
        
        const gridManager: GridManager = this.sceneGame.gridManager;
        const boardArray: Array<number | string> = this.sceneGame.gridManager.getOrigBoard();
        console.log(boardArray);
        const bestMove: IMoveCfg =  this.miniMax(boardArray, GAME_OBJECT_STATE.AI);

        const zeroCfg: IROBaseElementCfg =
            this.sceneGame.jsonObjectManager.getJsonObjectById(GAME_OBJECTS.Zero);
        const sprite = Factory.CreateSprite(this.sceneGame, zeroCfg);
        const gridCellCfg: GridCell = gridManager.getCellFromIndex(bestMove);

        if(!gridCellCfg) {
            return;
        }
    
        gridCellCfg.container.add(sprite);
        gridCellCfg.type = GAME_OBJECT_STATE.AI;
    }

    private miniMax(boardArray: Array<number | string>, type: number){       
        const gameStateManager: GameStateManager = this.sceneGame.gameStateManager;
        const gridManager: GridManager = this.sceneGame.gridManager;  
        const availSpots: Array<number> = gridManager.getEmptyIndices(boardArray);

        if(gameStateManager.checkVictoryPLayer(
            gridManager.convertBoardToScreenArray(boardArray),
        ))
        {
            return {
                score: -10,
            };
        }
        else if(gameStateManager.checkVictoryAi(
            gridManager.convertBoardToScreenArray(boardArray),
        ))
        {
            return {
                score: 10,
            };
        }
        else if(availSpots.length === 0)
        {
            return {
                score: 0,
            };
        }

        const moveArray: Array<IMoveCfg> = [];

        for (let i: number = 0; i < availSpots.length; i++)
        {
            const move: IMoveCfg = {
                index: 0,
                score: 0,
            };
            move.index = Number(boardArray[availSpots[i]]);
            boardArray[availSpots[i]] = String(type);

            if(type === GAME_OBJECT_STATE.AI)
            {
                const result: IMoveCfg = this.miniMax(boardArray, GAME_OBJECT_STATE.Player);
                move.score = result.score;
            } else {
                const result: IMoveCfg = this.miniMax(boardArray, GAME_OBJECT_STATE.AI);
                move.score = result.score;
            }

            boardArray[availSpots[i]] = move.index;
            moveArray.push(move);
        }

        let bestMove: number;
        
        if(type === GAME_OBJECT_STATE.Player)
        {
            let bestScore: number = -10000;

            for(let i: number = 0; i < moveArray.length; i++)
            {
                if(moveArray[i].score > bestScore)
                {
                    bestScore = moveArray[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore: number = 10000;

            for(let i: number = 0; i < moveArray.length; i++)
            {
                if(moveArray[i].score < bestScore)
                {
                    bestScore = moveArray[i].score;
                    bestMove = i;
                }
            }
        }

        return moveArray[bestMove];
    }
}