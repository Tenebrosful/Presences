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

const tokaido: GamePresence = {
	logo: "https://i.imgur.com/JRxRukR.png",
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
				case "playerTravel":
					data.state = "Traveling";
					break;
				case "stopManagement":
					data.state = "Taking an action";
					break;
				case "villageStop":
					data.state = "Purchasing souvenirs";
					break;
				case "templeStop":
					data.state = "Donating to the temple";
					break;
				case "innStopSatsuki":
				case "innStop":
					data.state = "Purchasing a meal";
					break;
				case "multiplayerChooseTraveler":
					data.state = "Choosing a traveler";
					break;
				case "neutralTravel":
					data.state = "Moving the neutral traveler";
					break;
				case "legendaryObjectStop":
					data.state = "Purchasing a legendary object";
					break;
				case "innStopJirocho":
				case "gamingRoomStop":
					data.state = "Gambling";
					break;
				case "amuletStop":
					data.state = "Purchasing an amulet";
					break;
				case "encounterStopPrepare":
					data.state = "Choosing an encounter";
					break;
				case "innStopChuubeiPay":
				case "encounterStopPay":
					data.state = "Paying for an encounter";
					break;
				case "encounterStopKitoushi":
				case "innStopHiroshige":
				case "encounterStopPanoramaChoice":
					data.state = "Choosing a free panorama";
					break;
				case "calligraphyStop":
					data.state = "Purchasing a calligraphy";
					break;
				case "innStopChuubei":
					data.state = "Making an encounter";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default tokaido;
