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

const elgrande: GamePresence = {
	logo: "https://i.imgur.com/nFJ4rXk.png",
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
				case "playPowerCards":
					data.state = "Playing a power card";
					break;
				case "chooseActionCard":
					data.state = "Choosing an action card";
					break;
				case "actionStep0Decide":
					data.state = "Deciding between placing caballeros and action";
					break;
				case "actionStep1PlaceCaballeros":
				case "actionStep2PlaceCaballeros":
					data.state = "Placing caballeros";
					break;
				case "actionStep1UseAction":
				case "actionStep2UseAction":
					data.state = "Using an action";
					break;
				case "angryKing":
					data.state = "Removing caballeros";
					break;
				case "chooseRegion":
					data.state = "Choosing a secret region";
					break;
				case "vetoAsk":
					data.state = "Vetoing against a special action";
					break;
				case "vetoSelectMove":
					data.state = "Choosing a move to veto";
					break;
				case "refillProvince":
					data.state = "Removing caballeros from regions to the province";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default elgrande;
