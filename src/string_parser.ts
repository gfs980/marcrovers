export const establishBounds = (input: string) => {
	const roverPosition: RoverPosition = { x: 0, y: 0 };
	const coordinates = input.split("\n")[0].split(" ");
	roverPosition.x = parseInt(coordinates[0]);
	roverPosition.y = parseInt(coordinates[1]);
	return roverPosition;
};

export const createRover = (startPos: string) => {
	const rover = {
		position: {
			x: parseInt(startPos.split(" ")[0]),
			y: parseInt(startPos.split(" ")[1])
		},
		orientation: startPos.split(" ")[2] as "N" | "S" | "E" | "W"
	};
	return rover;
};

export const createRovers = (input: string) => {
	const rovers = [];
	const positions = input.split("\n");
	for (let i = 1; i < positions.length; i = i + 2) {
		rovers.push(createRover(positions[i]));
	}
	return rovers;
};

export const listDirections = (input: string) => {
	const directions: string[] = [];
	const listDirections = input.split("\n");
	for (let i = 1; i < listDirections.length; i = i + 2) {
		directions.push(listDirections[i + 1]);
	}
	return directions;
};
