import app, { navigate } from "src/index";
import * as stringParser from "src/string_parser";
import * as helpers from "src/helpers";

describe("testing rover to move", () => {
	test("should pass with expected output", () => {
		expect(app("5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM")).toBe(
			"1 3 N\n5 1 E\n"
		);
	});

	test("should throw error message The possible direction letters are...", () => {
		expect(() => app("5 5\n1 2 N\nGGGGGG\n3 3 E\nGGG")).toThrowError(
			"The possible direction letters"
		);
	});
});

describe("functions to process string input", () => {
	test("establishes bounds with with keys x, y", () => {
		expect(stringParser.establishBounds("5 5\n1 2 N\nLMLMLMLMM")).toEqual({
			x: 5,
			y: 5
		});
	});

	test("outputs an array with the correct number of rovers", () => {
		expect(
			stringParser.createRovers("5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM")
		).toHaveLength(2);
	});

	test("outputs an array with the correct number of direction sets", () => {
		expect(
			stringParser.createRovers("5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM")
		).toHaveLength(2);
	});
});

describe("create rover object from input string", () => {
	test("creates rover object with nested position object and orientation", () => {
		expect(stringParser.createRover("1 2 N")).toEqual({
			position: { x: 1, y: 2 },
			orientation: "N"
		});
	});
});

describe("checks for failures like collisions and out of bounds", () => {
	test("checks for collisions", () => {
		const runCollision = () => {
			helpers.checkCollisions(1, 3, [{ position: { x: 1, y: 3 } }]);
		};
		expect(runCollision).toThrow();
	});

	test("check bounds returns false when out of bounds", () => {
		expect(
			helpers.checkBounds({ position: { x: 5, y: 6 } }, { x: 5, y: 5 })
		).toBe(false);
	});

	test("check bounds returns true when rover is in bounds", () => {
		expect(
			helpers.checkBounds({ position: { x: 3, y: 3 } }, { x: 5, y: 5 })
		).toBe(true);
	});
});

describe("execute directions and outputs the final position of the rover", () => {
	test("should not modify original rover", () => {
		const rover: Rover = { position: { x: 1, y: 2 }, orientation: "N" };
		expect(navigate("LMLMLMLM", rover, [])).toEqual(rover);
	});

	test("turns rover right and left", () => {
		const rover: Rover = { position: { x: 1, y: 2 }, orientation: "N" };
		expect(navigate("L", rover, [])).toEqual({
			position: { x: 1, y: 2 },
			orientation: "W"
		});
		expect(navigate("R", rover, [])).toEqual({
			position: { x: 1, y: 2 },
			orientation: "E"
		});
	});

	test("moves rover forward according to current orientation", () => {
		const rover: Rover = { position: { x: 1, y: 2 }, orientation: "N" };
		expect(navigate("M", rover, [])).toEqual({
			position: { x: 1, y: 3 },
			orientation: "N"
		});
	});
});
