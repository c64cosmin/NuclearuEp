export type Core = {
  temp: {
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
  state: number;
  stateCriticality: number;
  criticalMassReached: boolean;
  criticalMassReachedCounter: number;
  imminentFusion: boolean;
  readyForStart: boolean;
  steamPresent: boolean;
  highSteamPresent: boolean;
};

export type TimeInfo = {
  time: number;
  timestamp: number;
};

export type Coolant = {
  state: number;
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
};

export type Pump = {
  status: number;
  dryStatus: number;
  overloadStatus: number;
  orderedSpeed: number;
  speed: number;
};

export type Rods = {
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
};

export type Generator = {
  kw: number;
  v: number;
  a: number;
  hertz: number;
  breaker: number;
};

export type SteamTurbine = {
  rpm: number;
  temperature: number;
  pressure: number;
};

export type Reactor = {
  time: TimeInfo;
  core: Core;
  coolant: Coolant;
  rods: Rods;
  generators: Generator[];
  turbines: SteamTurbine[];
};

export function getReactor() {
  return {
    time: {
      time: Date.now(),
      timestamp: Date.now(),
    },
    core: {
      temp: {
        operative: 500, // example value in degrees
        max: 1000, // example max temp
        min: 100, // example min temp
        residual: 10, // example residual temp
      },
      pressure: {
        current: 100, // example current pressure
        max: 200, // example max pressure
        operative: 150, // example operative pressure
      },
      integrity: 100, // example integrity value (could be % or rating)
      wear: 5, // example wear value (could be percentage)
      state: 1, // example state (e.g., 1 = running)
      stateCriticality: 0, // example criticality level (e.g., 0 = normal)
      criticalMassReached: false, // example critical mass status
      criticalMassReachedCounter: 0, // initial counter
      imminentFusion: false, // whether fusion is imminent
      readyForStart: true, // reactor is ready for start
      steamPresent: true, // whether steam is present
      highSteamPresent: false, // whether high steam is present
    },
    coolant: {
      state: 1, // coolant state (1 = normal)
      pressure: 120, // current coolant pressure
      maxPressure: 180, // max allowable pressure
      vesselTemperature: 250, // temperature inside coolant vessel
      quantityInVessel: 1000, // amount of coolant in the vessel
      primaryLoopLevel: 80, // primary loop level percentage
      flowSpeed: 10, // flow speed of the coolant
      orderedFlowSpeed: 12, // ordered speed for the coolant flow
      reachedFlowSpeed: 10, // actual reached flow speed
      quantityCirculationPumpsPresent: 3, // number of circulation pumps
      quantityFreightPumpsPresent: 2, // number of freight pumps
    },
    rods: {
      status: 1, // rod status (1 = active)
      movementSpeed: 5, // speed at which rods move
      movementSpeedDecreasedHighTemp: false, // movement speed decreased due to high temperature
      deformed: false, // rods deformation status
      temperature: 500, // rod temperature
      maxTemperature: 600, // maximum allowable temperature
      posOrdered: 50, // ordered position of the rods
      posActual: 50, // actual position of the rods
      posReached: 50, // position reached by the rods
      quantity: 10, // number of rods
      aligned: true, // rods alignment status
    },
    generators: [
      {
        kw: 1000, // generator 0 power (in kW)
        v: 220, // generator 0 voltage (in V)
        a: 10, // generator 0 current (in A)
        hertz: 60, // generator 0 frequency (in Hz)
        breaker: 1, // generator 0 breaker status (1 = open)
      },
      {
        kw: 1500, // generator 1 power (in kW)
        v: 220, // generator 1 voltage (in V)
        a: 12, // generator 1 current (in A)
        hertz: 60, // generator 1 frequency (in Hz)
        breaker: 1, // generator 1 breaker status (1 = open)
      },
    ],
    turbines: [
      {
        rpm: 3000, // turbine 0 rpm
        temperature: 450, // turbine 0 temperature
        pressure: 200, // turbine 0 pressure
      },
      {
        rpm: 3100, // turbine 1 rpm
        temperature: 460, // turbine 1 temperature
        pressure: 220, // turbine 1 pressure
      },
    ],
  };
}
