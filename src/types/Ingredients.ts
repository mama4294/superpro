export type TemperatureUnit = "C" | "F" | "K" | "R";
export type PressureUnit = "bar" | "mbar" | "atm" | "psi" | "Pa" | "kPa";
export type HeatCapacityUnit = "J/mol·K";
export type EnthalpyUnit = "J/mol";
export type MassUnit = "kg" | "g" | "lb" | "MT" | "ton";
export type MassFlowUnit = "kg/h" | "g/min" | "lb/h" | "MT/h" | "ton/h";
export type ConcentrationUnit = "g/L";
export type SteamConnectionType = "Input" | "Output" | "Intermediate";
export type EquipmentType = "Fermenter" | "Mixing Tank";
export type TimeCalcMode =
  | "Set by User"
  | "Calculated by Equipment"
  | "Master-Slave Relationship"
  | "Mass Flowrate"
  | "Volumetric Flowrate"
  | "Sequence of other operations";
export type PowerCalcMode =
  | "Set by User"
  | "Set by Specific Power"
  | "Calculated"
  | "None";
export type ThermalMode = "Set Final Temp" | "Adiabatic" | "Set Duty";

//Procedure: Fermenter
//Operations: SIP, CIP, Fill, Ferment...
//Equipment: V-3300A (could be used in several procedures)

export type StreamComponent = {
  mass?: number;
  massUnit: MassUnit;
  massFlow?: number;
  massFlowUnit: MassFlowUnit;
  ingredient: Ingredient;
};

export type Stream = {
  temperature: number;
  pressure: number;
  streamPrice: number;
  comments: string;
  activity: number;
  massFlow: number;
  volFlow: number;
  mw: number;
  componentMassFlow: number;
  compMassFrac: number;
  componentMoleFlow: number;
  componentMoleFrac: number;
  compExtraCellFrac: number;
  compVaporFrac: number;
  compMassConc: number;
  compMolConc: number;
  enthalpy: number;
  specificEnthalpy: number;
  Cp: number;
  isInputStream: boolean;
  isOutputStream: boolean;
  isRawMaterial: boolean;
  isCleaningAgent: boolean;
  isMainRevenue: boolean;
  isRevenue: boolean;
  isWaste: boolean;
  isSolidWaste: boolean;
  isAqueousWaste: boolean;
  isOrganicWaste: boolean;
  isEmission: boolean;
  isNone: boolean;
  classification: string;
  wasteTreatCost: number;
  sourceProcedureName: string;
  destinationProcedureName: string;
};

export type Equipment = {
  noUnits: number;
  noHostedProcedures: number;
  isDesignMode: boolean;
  noStaggeredEquip: number;
  equipPC: number;
  equipPCEstimationOption: number;
  equipStandByNoUnits: number;
  equipPCDeprePortion: number;
  equipConstrMaterial: string;
  equipConstrMaterialF: number;
  equipInstallCostF: number;
  equipMaintcCostF: number;
  equipUsageRate: number;
  equipAvailabilityRate: number;
  busyTime: number;
  occupancyTime: number;
  maxFillRatio: number;
  equipmentName: string;
  description: string;
  comments: string;
  size: number;
  sizeUnits: string;
  sizeName: string;
  typeName: string;
  typeID: number;
};

export type Operation = {
  varID: string;
  startTime: number;
  endTime: number;
  setUpTime: number;
  processTime: number;
  holdupTime: number;
  turnaroundTime: number;
  processTimeCalcMode: number;
  timeShift: number;
  thermalMode: number;
  exitTemperature: number;
  operPress: number;
  heatingDuty: number;
  coolingDuty: number;
  primaryHxAgentName: string;
  primaryHxAgentRate: number;
  primaryHxAgentDuty: number;
  isPrimaryHxAgentHeating: boolean;
  auxHeatingHxAgentName: string;
  auxHeatingHxAgentRate: number;
  auxHeatingHxAgentDuty: number;
  auxCoolingHxAgentName: string;
  auxCoolingHxAgentRate: number;
  auxCoolingHxAgentDuty: number;
  auxPowerName: string;
  auxPowerRate: number;
  sizeUtilization: number;
  powerCalcMode: number;
  power: number;
  specPower: number;
  powerPerUnit: number;
  powerDissipationFrac: number;
  bIsVentOn: boolean;
  ventPress: number;
  condenserTemperature: number;
  opType: string;
  opDescr: string;
  isOpDescrSetByUser: boolean;
  auxEquipName: string;
  comments: string;
};

export type Utility = {
  name: string;
  price: number;
};

export type Procedure = {
  varID: string;
  numberOfOperations: number;
  numberOfCycles: number;
  startTime: number;
  endTime: number;
  cycleTime: number;
  holdupTime: number;
  totalTimePerBatch: number;
  isBatchMode: boolean;
  equipmentName: string;
  sizeUtilization: number;
  maxFillRatio: number;
  timeUtilization: number;
  comments: string;
  sectionName: string;
};

export type Ingredient = {
  //Identification
  name: string;
  CASNumber: string;
  localName: string;
  formula: string;
  tradeName: string;
  isBiomass: boolean;
  isSolid: boolean;

  //Contants
  molecularWeight: number; //g/mol
  boilingPoint: number;
  boilingPointUnit: TemperatureUnit; // C, K, F, R
  criticalTemp: number;
  criticalTempUnit: TemperatureUnit;
  criticalPressure: number;
  criticalPressureUnit: PressureUnit;
  compressabilityFactor: number;
  enthalpyOfFormationUnit: EnthalpyUnit;
  enthalpyOfFormation: number; //J/mol
  freezingTemp: number;
  freezingTempUnit: TemperatureUnit;
  henrysConstant: number; //atm m3 / mon
  particleSize: number; //micron
  volumetricConstant: number;

  //Temperature Dependant

  //Density = A + B*T where T is in [K]
  liquidDensityUnit: ConcentrationUnit;
  liquidDensityCoefA: number;
  liquidDensityCoefB: number;

  //heat capacity
  heatCapacityUnit: HeatCapacityUnit;
  //Solid/Liquid heat capacity = a + b*T + c*T**2 + d*T**3 + e*T**4 where T is in [K]
  liquidHeatCapacityCoefA: number;
  liquidHeatCapacityCoefB: number; //x10^-2
  liquidHeatCapacityCoefC: number; //x10^-4
  liquidHeatCapacityCoefD: number; //x10^-8
  liquidHeatCapacityCoefE: number; //x10^-16

  gasHeatCapacityCoefA: number;
  gasHeatCapacityCoefB: number;
  gasHeatCapacityCoefC: number;
  gasHeatCapacityCoefD: number;
  gasHeatCapacityCoefE: number;

  //Saturated Vapor Pressure
  //Log(Pi[mmHg]) = A - B / (C + T) where T in in [K]
  vaporPressureCeofA: number;
  vaporPressureCeofB: number;
  vaporPressureCeofC: number;

  //Heat of vaporization
  //Hv = a (1-Tr)**b
  heatOfVaporizationCoefA: number;
  heatOfVaporizationCoefB: number;
  heatOfVaporizationUnit: EnthalpyUnit;

  //Economics
  purchasePrice: number;
  purchasePriceUnit: MassUnit;
  sellingPrice: number;
  sellingPriceUnit: MassUnit;
};
