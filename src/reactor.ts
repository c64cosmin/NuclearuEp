export interface Core {
	temp: {
		current: number;
		operative: number;
		max: number;
		min: number;
		residual: number;
	};
	pressure: {
		current: number;
		max: number;
		operative: number;
	};
	integrity: number;
	wear: number;
	reactive: number;
	stateCriticality: number;
	criticalMassReached: boolean;
	criticalMassReachedCounter: number;
	imminentFusion: boolean;
	readyForStart: boolean;
	steamPresent: boolean;
	highSteamPresent: boolean;
}

export interface TimeInfo {
	time: number;
	timestamp: number;
}

export interface Coolant {
	circulating: number;
	pressure: number;
	maxPressure: number;
	vesselTemperature: number;
	quantityInVessel: number;
	primaryLoopLevel: number;
	flowSpeed: number;
	orderedFlowSpeed: number;
	reachedFlowSpeed: number;
	quantityCirculationPumpsPresent: number;
	quantityFreightPumpsPresent: number;
	pumps: Pump[];
}

export interface Pump {
	status: number;
	dryStatus: number;
	overloadStatus: number;
	orderedSpeed: number;
	speed: number;
}

export interface Rods {
	status: number;
	movementSpeed: number;
	movementSpeedDecreasedHighTemp: boolean;
	deformed: boolean;
	temperature: number;
	maxTemperature: number;
	posOrdered: number;
	posActual: number;
	posReached: number;
	quantity: number;
	aligned: boolean;
}

export interface Turbine {
	turbine: SteamTurbine;
	generator: Generator;
}

export interface Generator {
	kw: number;
	v: number;
	a: number;
	hertz: number;
	breaker: number;
}

export interface SteamTurbine {
	rpm: number;
	temperature: number;
	pressure: number;
}

export interface Reactor {
	online: boolean;
	time: TimeInfo;
	core: Core;
	coolant: Coolant;
	rods: Rods;
	turbines: Turbine[];
}

export function getReactor(): Reactor {
	return {
		online: false,
		time: {
			time: Date.now(),
			timestamp: Date.now(),
		},
		core: {
			temp: {
				current: 330,
				operative: 500,
				max: 1000,
				min: 100,
				residual: 10,
			},
			pressure: {
				current: 100,
				max: 200,
				operative: 150,
			},
			integrity: 100,
			wear: 5,
			reactive: 1,
			stateCriticality: 0,
			criticalMassReached: false,
			criticalMassReachedCounter: 0,
			imminentFusion: false,
			readyForStart: true,
			steamPresent: true,
			highSteamPresent: false,
		},
		coolant: {
			circulating: 1,
			pressure: 120,
			maxPressure: 180,
			vesselTemperature: 250,
			quantityInVessel: 1000,
			primaryLoopLevel: 80,
			flowSpeed: 10,
			orderedFlowSpeed: 12,
			reachedFlowSpeed: 10,
			quantityCirculationPumpsPresent: 3,
			quantityFreightPumpsPresent: 2,
			pumps: [
				{
					status: 1,
					dryStatus: 0,
					overloadStatus: 0,
					orderedSpeed: 0,
					speed: 50,
				},
				{
					status: 1,
					dryStatus: 0,
					overloadStatus: 0,
					orderedSpeed: 0,
					speed: 50,
				},
				{
					status: 1,
					dryStatus: 0,
					overloadStatus: 0,
					orderedSpeed: 0,
					speed: 50,
				},
			],
		},
		rods: {
			status: 1,
			movementSpeed: 5,
			movementSpeedDecreasedHighTemp: false,
			deformed: false,
			temperature: 500,
			maxTemperature: 600,
			posOrdered: 50,
			posActual: 50,
			posReached: 50,
			quantity: 10,
			aligned: true,
		},
		turbines: [
			{
				turbine: {
					rpm: 3000,
					temperature: 450,
					pressure: 200,
				},
				generator: {
					kw: 1500,
					v: 220,
					a: 12,
					hertz: 60,
					breaker: 1,
				},
			},
			{
				turbine: {
					rpm: 3000,
					temperature: 450,
					pressure: 200,
				},
				generator: {
					kw: 1500,
					v: 220,
					a: 12,
					hertz: 60,
					breaker: 1,
				},
			},
			{
				turbine: {
					rpm: 3000,
					temperature: 450,
					pressure: 200,
				},
				generator: {
					kw: 1500,
					v: 220,
					a: 12,
					hertz: 60,
					breaker: 1,
				},
			},
		],
	};
}
