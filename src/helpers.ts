export const checkCollisions = (
	x: number,
	y: number,
	movedRovers: Omit<Rover, "orientation">[]
) => {
	if (movedRovers.length > 0) {
		for (let i = 0; i < movedRovers.length; i++) {
			if (movedRovers[i].position.x === x && movedRovers[i].position.y === y) {
				throw "collision detected with rover at position " + i;
			}
		}
	}
};

export const checkBounds = (
	movedRover: Omit<Rover, "orientation">,
	plateauBounds: RoverPosition
) => {
	if (
		movedRover.position.x > plateauBounds.x ||
		movedRover.position.x < 0 ||
		movedRover.position.y > plateauBounds.y ||
		movedRover.position.x < 0
	) {
		return false;
	}
	return true;
};
