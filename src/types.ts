interface RoverPosition {
	x: number;
	y: number;
}

interface Rover {
	position: RoverPosition;
	orientation: Orientation;
}

type Orientation = "N" | "S" | "E" | "W";
type Directions = "R" | "L" | "M";
