export type TemperatureUnit = "C" | "F" | "K" | "R";
export type PressureUnit = "bar" | "mbar" | "atm" | "psi" | "Pa" | "kPa";
export type HeatCapacityUnit = "J/mol·K";
export type EnthalpyUnit = "J/mol";
export type MassUnit = "kg" | "g" | "lb" | "MT" | "ton";
export type ConcentrationUnit = "g/L";

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
