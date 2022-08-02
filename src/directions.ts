const directions = {
	N: {
		R: "E",
		L: "W",
		move: (x: number, y: number) => {
			return { x: x, y: y + 1 };
		}
	},
	S: {
		R: "W",
		L: "E",
		move: (x: number, y: number) => {
			return { x: x, y: y - 1 };
		}
	},
	E: {
		R: "S",
		L: "N",
		move: (x: number, y: number) => {
			return { x: x + 1, y: y };
		}
	},
	W: {
		R: "N",
		L: "S",
		move: (x: number, y: number) => {
			return { x: x - 1, y: y };
		}
	}
};

export default directions;
