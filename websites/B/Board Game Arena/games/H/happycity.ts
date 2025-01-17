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

const happycity: GamePresence = {
	logo: "https://i.imgur.com/Gg4IsPw.png",
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
				case "discardCard":
					data.state = "Discarding a building";
					break;
				case "drawCard":
					data.state = "Drawing a building";
					break;
				case "playerTurn":
					data.state = "Buying a structure or taking a coin";
					break;
				case "specialCard":
					data.state = "Taking a special building";
					break;
				case "marketDraft":
					data.state = "Drafting a market";
					break;
				case "endGameChoice":
					data.state = "Choosing a card to copy";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default happycity;
