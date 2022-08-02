import moveRoverDirection from "./directions";
import { checkBounds, checkCollisions } from "./helpers";
import { createRovers, establishBounds, listDirections } from "./string_parser";

const app = (input: string) => {
	const plateauBounds = establishBounds(input);
	const rovers = createRovers(input);
	const directions = listDirections(input);

	const movedRoversArr: Rover[] = [];

	for (let i = 0; i < directions.length; i++) {
		movedRoversArr.push(navigate(directions[i], rovers[i], movedRoversArr));
	}

	for (let j = 0; j < movedRoversArr.length; j++) {
		const inBounds = checkBounds(movedRoversArr[j], plateauBounds);
		if (!inBounds)
			throw new Error("rover at position " + j + " is out of bounds.");
	}

	return roversToString(movedRoversArr);
};

export const roversToString = (rovers: Rover[]) => {
	return rovers.reduce((acc, rover) => {
		return `${acc}${rover.position.x} ${rover.position.y} ${rover.orientation}\n`;
	}, "");
};

export const navigate = (
	directions: string,
	rover: Rover,
	movedRoversArr: Rover[]
) => {
	const movedRover: Rover = JSON.parse(JSON.stringify(rover));

	for (let i = 0; i < directions.length; i++) {
		const orientation = movedRover.orientation;
		const directionLetter = directions[i];

		if (directionLetter === "M") {
			movedRover.position = moveRoverDirection[orientation]["move"](
				movedRover.position.x,
				movedRover.position.y
			);
			checkCollisions(
				movedRover.position.x,
				movedRover.position.y,
				movedRoversArr
			);
		} else if (directionLetter === "L" || directionLetter === "R") {
			const directionOptions = moveRoverDirection[orientation];
			movedRover.orientation = directionOptions[directionLetter] as Orientation;
		} else {
			throw new Error("The possible direction letters are 'L', 'R' and 'M'.");
		}
	}
	return movedRover;
};

export default app;
