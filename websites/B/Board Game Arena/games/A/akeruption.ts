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

const akeruption: GamePresence = {
	logo: "https://i.imgur.com/Sf4zsqV.png",
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
				case "playSourceTile":
				case "confirmSourceTile":
					data.state = "Playing a lava source tile";
					break;
				case "playTile":
				case "confirmTile":
					data.state = "Playing a lava tile";
					break;
				case "extraTileCheck":
					data.state = "Playing an extra lava tile";
					break;
				case "playActionCards":
					data.state = "Playing action cards";
					break;
				case "playWalls":
					data.state = "Building a wall";
					break;
				case "chooseWallMaterial":
					data.state = "Choosing the material to build with";
					break;
				case "volcanicBomb":
					data.state = "Destroying a wall";
					break;
				case "sinkhole":
					data.state = "Destroying a tile";
					break;
				case "aftershock":
				case "confirmRotateTile":
					data.state = "Rotating a tile";
					break;
				case "quake":
				case "confirmReplaceTile":
					data.state = "Replacing a tile";
					break;
				case "relocatePickWall":
				case "relocatePlaceWall":
					data.state = "Rearranging walls";
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default akeruption;
