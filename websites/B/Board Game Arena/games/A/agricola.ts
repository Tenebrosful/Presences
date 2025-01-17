import { GamePresence } from "..";
import {
	getActivePlayerId,
	getCurrentGameState,
	getCurrentGameStateType,
	getPlayerAvatar,
	getPlayerData,
	getPlayerScore,
	getUserPlayerId,
} from "../../util";

const agricola: GamePresence = {
	logo: "https://i.imgur.com/mb09Dpv.png",
	async getData(presence: Presence) {
		const gameState = await getCurrentGameState(presence),
			activePlayer = await getActivePlayerId(presence),
			gameStateType = await getCurrentGameStateType(presence),
			userPlayer = await getUserPlayerId(presence),
			activePlayerData = await getPlayerData(presence, activePlayer),
			data: PresenceData = {
				smallImageKey: getPlayerAvatar(userPlayer),
				smallImageText: `Score: ${getPlayerScore(userPlayer)}`,
			};
		if (activePlayer === userPlayer || gameStateType !== "activeplayer") {
			switch (gameState) {
				case "draftPlayers":
					data.state = "Drafting";
					break;
				case "resolveChoice":
					data.state = "Choosing an action";
					break;
				case "placeFarmer":
					data.state = "Placing a farmer";
					break;
				case "fencing":
					data.state = "Building fences";
					break;
				case "payResources":
					data.state = "Paying resources";
					break;
				case "occupation":
					data.state = "Playing an occupation";
					break;
				case "plow":
					data.state = "Plowing a field";
					break;
				case "construct":
					data.state = "Constructing a room";
					break;
				case "sow":
					data.state = "Sowing a field";
					break;
				case "stables":
					data.state = "Building stables";
					break;
				case "renovation":
					data.state = "Renovating";
					break;
				case "improvement":
					data.state = "Playing an improvement";
					break;
				case "exchange":
					data.state = "Exchanging resources";
					break;
				case "reorganize":
					data.state = "Reorganizing animals";
					break;
				case "confirmTurn":
				case "confirmPartialTurn":
					data.state = "Confirming turn";
					break;
				case "loadSeed":
					data.state = "Entering a seed for the game";
					break;
				case "checkCombos":
					data.state = "Checking combos";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default agricola;
