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

const zooloretto: GamePresence = {
	logo: "https://i.imgur.com/dkpPQm2.png",
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
				case "playerTurn":
					data.state = "Taking an action";
					break;
				case "PlaceTile":
					data.state = "Placing a tile on a Wagon";
					break;
				case "ArrangeZoo":
					data.state = "Arranging tiles in their Zoo";
					break;
				case "Move":
					data.state = "Moving an animal or stall tile";
					break;
				case "Swap":
					data.state = "Swapping two sets on animals";
					break;
				case "Buy":
					data.state = "Buying a tile from an opponent's Barn";
					break;
				case "Discard":
					data.state = "Discarding a tile from their Barn";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default zooloretto;
