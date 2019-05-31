var obj = module.exports = {};

obj.map = {
    "data": {
        "service": [
            "core:Application",
            "core:Service"
        ],
        "property": [
            "adapters:ActualBatteryStateOfCharge",
            "adapters:ChildLock",
            "adapters:RefrigeratorDoorStatus",
            "adapters:PhotoVoltaicPanelServiceLevel",
            "adapters:ActualDCCurrent",
            "adapters:PVActualDCCurrent",
            "adapters:Stop",
            "adapters:DeviceTemperature",
            "adapters:ActualReactivePowerLoad",
            "adapters:AverageHumidityDeviation",
            "adapters:BakingStep",
            "adapters:BakingTime",
            "adapters:GPSAltitude",
            "adapters:ElapsedBakingTime",
            "adapters:RelativeHumidity",
            "adapters:BakingTemperature",
            "adapters:Start",
            "adapters:MeatProbeTemperature",
            "adapters:Baking",
            "adapters:CaloriesBurned",
            "adapters:AccumulatedEnergyConsumed",
            "adapters:BatteryActualDCCurrent",
            "adapters:PVOperationStatus",
            "adapters:InverterPVActualActivePower",
            "adapters:ConnectorDesiredMaxPower",
            "adapters:RefrigeratorTemperature",
            "adapters:AverageTemperature",
            "adapters:AverageCO2Concentration",
            "adapters:MinPowerConsumption",
            "adapters:BakingStartTimeMinute",
            "adapters:HeaterPreheatAllowed",
            "adapters:InverterActualActivePower",
            "adapters:HeaterMinTemperature",
            "adapters:LightColor",
            "adapters:MaxSound",
            "adapters:DeviceStatus",
            "adapters:PVActualDCPower",
            "adapters:AverageTemperatureDeviation",
            "adapters:GPSLatitude",
            "adapters:FreezerDoorStatus",
            "adapters:ActualDCPower",
            "adapters:BatteryConnectionStatus",
            "adapters:InverterConsumerActivePowerLoad",
            "adapters:AverageMovementTime",
            "adapters:HeaterMaxTemperature",
            "adapters:GridActivePowerLoad",
            "adapters:ActualChargingSessionDuration",
            "adapters:MinSound",
            "adapters:Steps",
            "adapters:InverterGridActivePowerLoad",
            "adapters:AmbientTemperature",
            "adapters:Motion",
            "adapters:ConnectorSmartChargingProfile",
            "adapters:MaximalPowerPerConnector",
            "adapters:FanSpeed",
            "adapters:AverageMovemenetShare",
            "adapters:HighestHumidityDeviation",
            "adapters:MinHumidity",
            "adapters:OvenEmergency",
            "adapters:ActualDCVoltage",
            "adapters:MinLightIntensity",
            "adapters:PVAccumulatedDCEnergy",
            "adapters:MaxTemperature",
            "adapters:SystolicBloodPressure",
            "adapters:InverterPVActualReactivePower",
            "adapters:BakingEndTimeMinute",
            "adapters:InverterNominalPower",
            "adapters:ActualReactivePowerGeneration",
            "adapters:ActivePowerAbsorbedFromGrid",
            "adapters:PowerFactorLowerBound",
            "adapters:MaxPowerConsumption",
            "adapters:FastFreeze",
            "adapters:SuperCool",
            "adapters:IndoorEnvironmentalQualityScore",
            "adapters:Weight",
            "adapters:BatteryOperationalStatus",
            "adapters:DeviceLightStatus",
            "adapters:AlarmTime",
            "adapters:InverterStatus",
            "adapters:ReactivePowerAbsorbedFromGrid",
            "adapters:MinCO2Concentration",
            "adapters:DirectSolarRadiation",
            "adapters:DistanceWalked",
            "adapters:ActualEnergyConsumedChargingSession",
            "adapters:ReactivePowerInjectedToGrid",
            "adapters:BatteryActualPowertSetPoint",
            "adapters:ValvePosition",
            "adapters:EnergySupplySystem",
            "adapters:MinBatteryStateOfCharge",
            "adapters:StoredEnergy",
            "adapters:BatteryActualDCVoltage",
            "adapters:Elevation",
            "adapters:AccumulatedEnergyProduced",
            "adapters:ConnectorCurrentChargingPower",
            "adapters:AverageSoundDeviation",
            "adapters:HighestCO2ConcentrationDeviation",
            "adapters:ActualReactivePowerProduction",
            "adapters:Sleep",
            "adapters:UpperStateOfChargeBoundary",
            "adapters:BakingEndTimeHour",
            "adapters:ActivePowerInjectedToGrid",
            "adapters:SimultaneousCharging",
            "adapters:ActualActivePowerInjectedToGrid",
            "adapters:MaxHumidity",
            "adapters:DimmingLevel",
            "adapters:MaxCO2Concentration",
            "adapters:ReactivePowerSetPoint",
            "adapters:ActualActivePowerLoad",
            "adapters:HeaterMeatProbeAllowed",
            "adapters:ConnectorStatus",
            "adapters:ActualActivePowerGeneration",
            "adapters:OvenDoorStatus",
            "adapters:InverterActualFrequency",
            "adapters:NominalProductionCapacity",
            "adapters:FreezerLightStatus",
            "adapters:NominalElectricVehicleCurrent",
            "adapters:GPSLongitude",
            "adapters:BakingRemainingTime",
            "adapters:BatteryChargeStatus",
            "adapters:ActualActivePowerProduction",
            "adapters:DiastolicBloodPressure",
            "adapters:HighestTemperatureDeviation",
            "adapters:MeanPowerConsumption",
            "adapters:Mode",
            "adapters:PVConnectionStatus",
            "adapters:AverageHumidity",
            "adapters:ActivePowerSetPoint",
            "adapters:InverterAccumulatedActiveEnergyProduction",
            "adapters:FreezerEmergency",
            "adapters:HeartRate",
            "adapters:NoiseLevel",
            "adapters:MaxBatteryStateOfCharge",
            "adapters:UVIndex",
            "adapters:AverageCO2ConcentrationDeviation",
            "adapters:GlobalSolarRadiation",
            "adapters:ChargingStationOperationalStatus",
            "adapters:PVActualDCVoltage",
            "adapters:MinTemperature",
            "adapters:LowerStateOfChargeBoundary",
            "adapters:ConsumerActivePowerLoad",
            "adapters:Luminance",
            "adapters:InverterTotalDCPower",
            "adapters:OpenClosed",
            "adapters:GPSPrecision",
            "adapters:AccumulatedEnergyInjectedToGrid",
            "adapters:ReactivePowerProduction",
            "adapters:CO2Concentration",
            "adapters:HeaterDefaultTemperature",
            "adapters:BatteryNominalCapacity",
            "adapters:HighestSoundDeviation",
            "adapters:DelayedBaking",
            "adapters:MaximalCurrentOfChargingCable",
            "adapters:AverageLightIntensity",
            "adapters:ActivePowerProduction",
            "adapters:BatteryActualDCPower",
            "adapters:InverterActualReactivePower",
            "adapters:PVInstalledCapacity",
            "adapters:AverageSound",
            "adapters:MaxLightIntensity",
            "adapters:OnOff",
            "adapters:CurrentBakingStepRemainingTime",
            "adapters:EntryExit",
            "adapters:RefrigeratorEmergency",
            "adapters:Location",
            "adapters:NumberOfConnectors",
            "adapters:ChargeStatus",
            "adapters:Azimuth",
            "adapters:BakingStartTimeHour",
            "adapters:FreezerTemperature",
            "adapters:ActualReactivePowerInjectedToGrid",
            "adapters:InverterAccumulatedActiveEnergyConsumptio",
            "adapters:BatteryActualControlMode",
            "adapters:HeaterSystem",
            "adapters:RefrigeratorLightStatus"
        ],
        "location": [
            "s4city:City",
            "s4bldg:BuildingSpace",
            "s4city:AdministrativeArea",
            "s4city:Country",
            "s4bldg:Building"
        ],
        "device": [
            "adapters:HumiditySensor",
            "adapters:WeightScale",
            "adapters:EBikeCharger",
            "adapters:WeatherStation",
            "adapters:DoorSensor",
            "adapters:OccupancySensor",
            "adapters:IndoorClimateQualitySensor",
            "adapters:BatteryStorageUnit",
            "adapters:SmartRefrigerator",
            "adapters:SmartOven",
            "adapters:PeopleCounter",
            "adapters:WaterFlowMeter",
            "adapters:HVACSensor",
            "adapters:PhotovoltaicPanel",
            "adapters:PressureMat",
            "adapters:Thermometer",
            "adapters:BeaconReader",
            "core:Actuator",
            "adapters:Thermostat",
            "adapters:Lightbulb",
            "adapters:LuminanceMeter",
            "core:Device",
            "adapters:ActivityTracker",
            "adapters:Charger",
            "adapters:NoiseSensor",
            "adapters:MotionSensor",
            "adapters:WaterEnergyMeter",
            "adapters:ElectricVehicle",
            "adapters:PowerMeter",
            "adapters:ComboBatteryPV",
            "adapters:PanicButton",
            "adapters:LightSwitch",
            "adapters:BloodPressureMonitor",
            "core:Sensor",
            "adapters:Battery",
            "adapters:EVCharger",
            "adapters:WindowSensor",
            "adapters:CO2Sensor"
        ]
    },
    "status": "success"
};

obj.hierarchy = {
  "data": {
      "device-hierarchy": {
          "path": [
              "core:Device"
          ],
          "sub-classes": [
              {
                  "path": [
                      "core:Device",
                      "core:Actuator"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "core:Device",
                              "core:Actuator",
                              "adapters:HVACSensor"
                          ],
                          "class": "adapters:HVACSensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Actuator",
                              "adapters:LightSwitch"
                          ],
                          "class": "adapters:LightSwitch"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Actuator",
                              "adapters:Thermostat"
                          ],
                          "class": "adapters:Thermostat"
                      }
                  ],
                  "class": "core:Actuator"
              },
              {
                  "path": [
                      "core:Device",
                      "core:Actuator"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "core:Device",
                              "core:Actuator",
                              "adapters:HVACSensor"
                          ],
                          "class": "adapters:HVACSensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Actuator",
                              "adapters:LightSwitch"
                          ],
                          "class": "adapters:LightSwitch"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Actuator",
                              "adapters:Thermostat"
                          ],
                          "class": "adapters:Thermostat"
                      }
                  ],
                  "class": "core:Actuator"
              },
              {
                  "path": [
                      "core:Device",
                      "core:Sensor"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:ActivityTracker"
                          ],
                          "class": "adapters:ActivityTracker"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:BloodPressureMonitor"
                          ],
                          "class": "adapters:BloodPressureMonitor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:CO2Sensor"
                          ],
                          "class": "adapters:CO2Sensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:DoorSensor"
                          ],
                          "class": "adapters:DoorSensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:HVACSensor"
                          ],
                          "class": "adapters:HVACSensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:HumiditySensor"
                          ],
                          "class": "adapters:HumiditySensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:IndoorClimateQualitySensor"
                          ],
                          "class": "adapters:IndoorClimateQualitySensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:LuminanceMeter"
                          ],
                          "class": "adapters:LuminanceMeter"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:MotionSensor"
                          ],
                          "class": "adapters:MotionSensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:NoiseSensor"
                          ],
                          "class": "adapters:NoiseSensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:OccupancySensor"
                          ],
                          "class": "adapters:OccupancySensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:PeopleCounter"
                          ],
                          "class": "adapters:PeopleCounter"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:PowerMeter"
                          ],
                          "class": "adapters:PowerMeter"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:PressureMat"
                          ],
                          "class": "adapters:PressureMat"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:Thermometer"
                          ],
                          "class": "adapters:Thermometer"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:Thermostat"
                          ],
                          "class": "adapters:Thermostat"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:WaterEnergyMeter"
                          ],
                          "class": "adapters:WaterEnergyMeter"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:WaterFlowMeter"
                          ],
                          "class": "adapters:WaterFlowMeter"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:WeightScale"
                          ],
                          "class": "adapters:WeightScale"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:WindowSensor"
                          ],
                          "class": "adapters:WindowSensor"
                      }
                  ],
                  "class": "core:Sensor"
              },
              {
                  "path": [
                      "core:Device",
                      "core:Sensor"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:ActivityTracker"
                          ],
                          "class": "adapters:ActivityTracker"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:BloodPressureMonitor"
                          ],
                          "class": "adapters:BloodPressureMonitor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:CO2Sensor"
                          ],
                          "class": "adapters:CO2Sensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:DoorSensor"
                          ],
                          "class": "adapters:DoorSensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:HVACSensor"
                          ],
                          "class": "adapters:HVACSensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:HumiditySensor"
                          ],
                          "class": "adapters:HumiditySensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:IndoorClimateQualitySensor"
                          ],
                          "class": "adapters:IndoorClimateQualitySensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:LuminanceMeter"
                          ],
                          "class": "adapters:LuminanceMeter"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:MotionSensor"
                          ],
                          "class": "adapters:MotionSensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:NoiseSensor"
                          ],
                          "class": "adapters:NoiseSensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:OccupancySensor"
                          ],
                          "class": "adapters:OccupancySensor"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:PeopleCounter"
                          ],
                          "class": "adapters:PeopleCounter"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:PowerMeter"
                          ],
                          "class": "adapters:PowerMeter"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:PressureMat"
                          ],
                          "class": "adapters:PressureMat"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:Thermometer"
                          ],
                          "class": "adapters:Thermometer"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:Thermostat"
                          ],
                          "class": "adapters:Thermostat"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:WaterEnergyMeter"
                          ],
                          "class": "adapters:WaterEnergyMeter"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:WaterFlowMeter"
                          ],
                          "class": "adapters:WaterFlowMeter"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:WeightScale"
                          ],
                          "class": "adapters:WeightScale"
                      },
                      {
                          "path": [
                              "core:Device",
                              "core:Sensor",
                              "adapters:WindowSensor"
                          ],
                          "class": "adapters:WindowSensor"
                      }
                  ],
                  "class": "core:Sensor"
              },
              {
                  "path": [
                      "core:Device",
                      "adapters:Battery"
                  ],
                  "class": "adapters:Battery"
              },
              {
                  "path": [
                      "core:Device",
                      "adapters:BatteryStorageUnit"
                  ],
                  "class": "adapters:BatteryStorageUnit"
              },
              {
                  "path": [
                      "core:Device",
                      "adapters:BeaconReader"
                  ],
                  "class": "adapters:BeaconReader"
              },
              {
                  "path": [
                      "core:Device",
                      "adapters:Charger"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "core:Device",
                              "adapters:Charger",
                              "adapters:EBikeCharger"
                          ],
                          "class": "adapters:EBikeCharger"
                      },
                      {
                          "path": [
                              "core:Device",
                              "adapters:Charger",
                              "adapters:EVCharger"
                          ],
                          "class": "adapters:EVCharger"
                      }
                  ],
                  "class": "adapters:Charger"
              },
              {
                  "path": [
                      "core:Device",
                      "adapters:ElectricVehicle"
                  ],
                  "class": "adapters:ElectricVehicle"
              },
              {
                  "path": [
                      "core:Device",
                      "adapters:Lightbulb"
                  ],
                  "class": "adapters:Lightbulb"
              },
              {
                  "path": [
                      "core:Device",
                      "adapters:PanicButton"
                  ],
                  "class": "adapters:PanicButton"
              },
              {
                  "path": [
                      "core:Device",
                      "adapters:PhotovoltaicPanel"
                  ],
                  "class": "adapters:PhotovoltaicPanel"
              },
              {
                  "path": [
                      "core:Device",
                      "adapters:SmartOven"
                  ],
                  "class": "adapters:SmartOven"
              },
              {
                  "path": [
                      "core:Device",
                      "adapters:SmartRefrigerator"
                  ],
                  "class": "adapters:SmartRefrigerator"
              },
              {
                  "path": [
                      "core:Device",
                      "adapters:ComboBatteryPV"
                  ],
                  "class": "adapters:ComboBatteryPV"
              },
              {
                  "path": [
                      "core:Device",
                      "adapters:WeatherStation"
                  ],
                  "class": "adapters:WeatherStation"
              }
          ],
          "class": "core:Device"
      },
      "property-hierarchy": {
          "path": [
              "ssn:Property"
          ],
          "sub-classes": [
              {
                  "path": [
                      "ssn:Property",
                      "sosa:ActuatableProperty"
                  ],
                  "individuals": [
                      "adapters:DeviceTemperature",
                      "adapters:LightColor",
                      "adapters:Luminance",
                      "adapters:ActivePowerSetPoint",
                      "adapters:ActualActivePowerGeneration",
                      "adapters:ActualActivePowerLoad",
                      "adapters:ActualReactivePowerGeneration",
                      "adapters:ActualReactivePowerLoad",
                      "adapters:ConnectorDesiredMaxPower",
                      "adapters:ConnectorSmartChargingProfile",
                      "adapters:ReactivePowerSetPoint"
                  ],
                  "class": "sosa:ActuatableProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "sosa:ActuatableProperty"
                  ],
                  "individuals": [
                      "adapters:DeviceTemperature",
                      "adapters:LightColor",
                      "adapters:Luminance",
                      "adapters:ActivePowerSetPoint",
                      "adapters:ActualActivePowerGeneration",
                      "adapters:ActualActivePowerLoad",
                      "adapters:ActualReactivePowerGeneration",
                      "adapters:ActualReactivePowerLoad",
                      "adapters:ConnectorDesiredMaxPower",
                      "adapters:ConnectorSmartChargingProfile",
                      "adapters:ReactivePowerSetPoint"
                  ],
                  "class": "sosa:ActuatableProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "sosa:ObservableProperty"
                  ],
                  "individuals": [
                      "adapters:AmbientTemperature",
                      "adapters:AverageCO2Concentration",
                      "adapters:AverageCO2ConcentrationDeviation",
                      "adapters:AverageHumidity",
                      "adapters:AverageHumidityDeviation",
                      "adapters:AverageLightIntensity",
                      "adapters:AverageMovemenetShare",
                      "adapters:AverageMovementTime",
                      "adapters:AverageSound",
                      "adapters:AverageSoundDeviation",
                      "adapters:AverageTemperature",
                      "adapters:AverageTemperatureDeviation",
                      "adapters:BakingStep",
                      "adapters:CO2Concentration",
                      "adapters:ChargeStatus",
                      "adapters:CurrentBakingStepRemainingTime",
                      "adapters:DeviceLightStatus",
                      "adapters:DeviceStatus",
                      "adapters:DeviceTemperature",
                      "adapters:DimmingLevel",
                      "adapters:ElapsedBakingTime",
                      "adapters:EntryExit",
                      "adapters:FanSpeed",
                      "adapters:HeaterDefaultTemperature",
                      "adapters:HeaterMaxTemperature",
                      "adapters:HeaterMeatProbeAllowed",
                      "adapters:HeaterMinTemperature",
                      "adapters:HeaterPreheatAllowed",
                      "adapters:HighestCO2ConcentrationDeviation",
                      "adapters:HighestHumidityDeviation",
                      "adapters:HighestSoundDeviation",
                      "adapters:HighestTemperatureDeviation",
                      "adapters:IndoorEnvironmentalQualityScore",
                      "adapters:LightColor",
                      "adapters:Luminance",
                      "adapters:MaxCO2Concentration",
                      "adapters:MaxHumidity",
                      "adapters:MaxLightIntensity",
                      "adapters:MaxPowerConsumption",
                      "adapters:MaxSound",
                      "adapters:MaxTemperature",
                      "adapters:MeanPowerConsumption",
                      "adapters:MeatProbeTemperature",
                      "adapters:MinCO2Concentration",
                      "adapters:MinHumidity",
                      "adapters:MinLightIntensity",
                      "adapters:MinPowerConsumption",
                      "adapters:MinSound",
                      "adapters:MinTemperature",
                      "adapters:Mode",
                      "adapters:Motion",
                      "adapters:NoiseLevel",
                      "adapters:OnOff",
                      "adapters:OpenClosed",
                      "adapters:RelativeHumidity",
                      "adapters:StoredEnergy",
                      "adapters:ValvePosition",
                      "adapters:AccumulatedEnergyConsumed",
                      "adapters:AccumulatedEnergyInjectedToGrid",
                      "adapters:ActivePowerAbsorbedFromGrid",
                      "adapters:ActivePowerInjectedToGrid",
                      "adapters:ActivePowerProduction",
                      "adapters:ActualActivePowerGeneration",
                      "adapters:ActualActivePowerInjectedToGrid",
                      "adapters:ActualActivePowerLoad",
                      "adapters:ActualChargingSessionDuration",
                      "adapters:ActualEnergyConsumedChargingSession",
                      "adapters:ActualReactivePowerGeneration",
                      "adapters:ActualReactivePowerInjectedToGrid",
                      "adapters:ActualReactivePowerLoad",
                      "adapters:Azimuth",
                      "adapters:BakingRemainingTime",
                      "adapters:BatteryNominalCapacity",
                      "adapters:ChargingStationOperationalStatus",
                      "adapters:ConnectorCurrentChargingPower",
                      "adapters:ConnectorDesiredMaxPower",
                      "adapters:ConnectorSmartChargingProfile",
                      "adapters:ConnectorStatus",
                      "adapters:Elevation",
                      "adapters:EnergySupplySystem",
                      "adapters:InverterNominalPower",
                      "adapters:Location",
                      "adapters:LowerStateOfChargeBoundary",
                      "adapters:MaximalPowerPerConnector",
                      "adapters:NominalProductionCapacity",
                      "adapters:NumberOfConnectors",
                      "adapters:PhotoVoltaicPanelServiceLevel",
                      "adapters:PowerFactorLowerBound",
                      "adapters:ReactivePowerAbsorbedFromGrid",
                      "adapters:ReactivePowerInjectedToGrid",
                      "adapters:ReactivePowerProduction",
                      "adapters:SimultaneousCharging",
                      "adapters:UpperStateOfChargeBoundary",
                      "adapters:MaximalCurrentOfChargingCable",
                      "adapters:GPSAltitude",
                      "adapters:GPSLatitude",
                      "adapters:GPSLongitude",
                      "adapters:GPSPrecision",
                      "adapters:AccumulatedEnergyProduced",
                      "adapters:ActualDCCurrent",
                      "adapters:ActualDCPower",
                      "adapters:ActualDCVoltage",
                      "adapters:BatteryActualDCCurrent",
                      "adapters:BatteryActualDCPower",
                      "adapters:BatteryActualDCVoltage",
                      "adapters:BatteryActualPowertSetPoint",
                      "adapters:BatteryChargeStatus",
                      "adapters:BatteryConnectionStatus",
                      "adapters:BatteryOperationalStatus",
                      "adapters:ConsumerActivePowerLoad",
                      "adapters:DirectSolarRadiation",
                      "adapters:GlobalSolarRadiation",
                      "adapters:GridActivePowerLoad",
                      "adapters:InverterAccumulatedActiveEnergyConsumptio",
                      "adapters:InverterAccumulatedActiveEnergyProduction",
                      "adapters:InverterActualActivePower",
                      "adapters:InverterActualFrequency",
                      "adapters:InverterActualReactivePower",
                      "adapters:InverterConsumerActivePowerLoad",
                      "adapters:InverterGridActivePowerLoad",
                      "adapters:InverterPVActualActivePower",
                      "adapters:InverterPVActualReactivePower",
                      "adapters:InverterStatus",
                      "adapters:InverterTotalDCPower",
                      "adapters:MaxBatteryStateOfCharge",
                      "adapters:MinBatteryStateOfCharge",
                      "adapters:PVAccumulatedDCEnergy",
                      "adapters:PVActualDCCurrent",
                      "adapters:PVActualDCPower",
                      "adapters:PVActualDCVoltage",
                      "adapters:PVConnectionStatus",
                      "adapters:PVInstalledCapacity",
                      "adapters:PVOperationStatus",
                      "adapters:UVIndex"
                  ],
                  "class": "sosa:ObservableProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "sosa:ObservableProperty"
                  ],
                  "individuals": [
                      "adapters:AmbientTemperature",
                      "adapters:AverageCO2Concentration",
                      "adapters:AverageCO2ConcentrationDeviation",
                      "adapters:AverageHumidity",
                      "adapters:AverageHumidityDeviation",
                      "adapters:AverageLightIntensity",
                      "adapters:AverageMovemenetShare",
                      "adapters:AverageMovementTime",
                      "adapters:AverageSound",
                      "adapters:AverageSoundDeviation",
                      "adapters:AverageTemperature",
                      "adapters:AverageTemperatureDeviation",
                      "adapters:BakingStep",
                      "adapters:CO2Concentration",
                      "adapters:ChargeStatus",
                      "adapters:CurrentBakingStepRemainingTime",
                      "adapters:DeviceLightStatus",
                      "adapters:DeviceStatus",
                      "adapters:DeviceTemperature",
                      "adapters:DimmingLevel",
                      "adapters:ElapsedBakingTime",
                      "adapters:EntryExit",
                      "adapters:FanSpeed",
                      "adapters:HeaterDefaultTemperature",
                      "adapters:HeaterMaxTemperature",
                      "adapters:HeaterMeatProbeAllowed",
                      "adapters:HeaterMinTemperature",
                      "adapters:HeaterPreheatAllowed",
                      "adapters:HighestCO2ConcentrationDeviation",
                      "adapters:HighestHumidityDeviation",
                      "adapters:HighestSoundDeviation",
                      "adapters:HighestTemperatureDeviation",
                      "adapters:IndoorEnvironmentalQualityScore",
                      "adapters:LightColor",
                      "adapters:Luminance",
                      "adapters:MaxCO2Concentration",
                      "adapters:MaxHumidity",
                      "adapters:MaxLightIntensity",
                      "adapters:MaxPowerConsumption",
                      "adapters:MaxSound",
                      "adapters:MaxTemperature",
                      "adapters:MeanPowerConsumption",
                      "adapters:MeatProbeTemperature",
                      "adapters:MinCO2Concentration",
                      "adapters:MinHumidity",
                      "adapters:MinLightIntensity",
                      "adapters:MinPowerConsumption",
                      "adapters:MinSound",
                      "adapters:MinTemperature",
                      "adapters:Mode",
                      "adapters:Motion",
                      "adapters:NoiseLevel",
                      "adapters:OnOff",
                      "adapters:OpenClosed",
                      "adapters:RelativeHumidity",
                      "adapters:StoredEnergy",
                      "adapters:ValvePosition",
                      "adapters:AccumulatedEnergyConsumed",
                      "adapters:AccumulatedEnergyInjectedToGrid",
                      "adapters:ActivePowerAbsorbedFromGrid",
                      "adapters:ActivePowerInjectedToGrid",
                      "adapters:ActivePowerProduction",
                      "adapters:ActualActivePowerGeneration",
                      "adapters:ActualActivePowerInjectedToGrid",
                      "adapters:ActualActivePowerLoad",
                      "adapters:ActualChargingSessionDuration",
                      "adapters:ActualEnergyConsumedChargingSession",
                      "adapters:ActualReactivePowerGeneration",
                      "adapters:ActualReactivePowerInjectedToGrid",
                      "adapters:ActualReactivePowerLoad",
                      "adapters:Azimuth",
                      "adapters:BakingRemainingTime",
                      "adapters:BatteryNominalCapacity",
                      "adapters:ChargingStationOperationalStatus",
                      "adapters:ConnectorCurrentChargingPower",
                      "adapters:ConnectorDesiredMaxPower",
                      "adapters:ConnectorSmartChargingProfile",
                      "adapters:ConnectorStatus",
                      "adapters:Elevation",
                      "adapters:EnergySupplySystem",
                      "adapters:InverterNominalPower",
                      "adapters:Location",
                      "adapters:LowerStateOfChargeBoundary",
                      "adapters:MaximalPowerPerConnector",
                      "adapters:NominalProductionCapacity",
                      "adapters:NumberOfConnectors",
                      "adapters:PhotoVoltaicPanelServiceLevel",
                      "adapters:PowerFactorLowerBound",
                      "adapters:ReactivePowerAbsorbedFromGrid",
                      "adapters:ReactivePowerInjectedToGrid",
                      "adapters:ReactivePowerProduction",
                      "adapters:SimultaneousCharging",
                      "adapters:UpperStateOfChargeBoundary",
                      "adapters:MaximalCurrentOfChargingCable",
                      "adapters:GPSAltitude",
                      "adapters:GPSLatitude",
                      "adapters:GPSLongitude",
                      "adapters:GPSPrecision",
                      "adapters:AccumulatedEnergyProduced",
                      "adapters:ActualDCCurrent",
                      "adapters:ActualDCPower",
                      "adapters:ActualDCVoltage",
                      "adapters:BatteryActualDCCurrent",
                      "adapters:BatteryActualDCPower",
                      "adapters:BatteryActualDCVoltage",
                      "adapters:BatteryActualPowertSetPoint",
                      "adapters:BatteryChargeStatus",
                      "adapters:BatteryConnectionStatus",
                      "adapters:BatteryOperationalStatus",
                      "adapters:ConsumerActivePowerLoad",
                      "adapters:DirectSolarRadiation",
                      "adapters:GlobalSolarRadiation",
                      "adapters:GridActivePowerLoad",
                      "adapters:InverterAccumulatedActiveEnergyConsumptio",
                      "adapters:InverterAccumulatedActiveEnergyProduction",
                      "adapters:InverterActualActivePower",
                      "adapters:InverterActualFrequency",
                      "adapters:InverterActualReactivePower",
                      "adapters:InverterConsumerActivePowerLoad",
                      "adapters:InverterGridActivePowerLoad",
                      "adapters:InverterPVActualActivePower",
                      "adapters:InverterPVActualReactivePower",
                      "adapters:InverterStatus",
                      "adapters:InverterTotalDCPower",
                      "adapters:MaxBatteryStateOfCharge",
                      "adapters:MinBatteryStateOfCharge",
                      "adapters:PVAccumulatedDCEnergy",
                      "adapters:PVActualDCCurrent",
                      "adapters:PVActualDCPower",
                      "adapters:PVActualDCVoltage",
                      "adapters:PVConnectionStatus",
                      "adapters:PVInstalledCapacity",
                      "adapters:PVOperationStatus",
                      "adapters:UVIndex"
                  ],
                  "class": "sosa:ObservableProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "systems:SystemProperty"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Accuracy"
                          ],
                          "individuals": [],
                          "class": "systems:Accuracy"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Accuracy"
                          ],
                          "individuals": [],
                          "class": "systems:Accuracy"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:DetectionLimit"
                          ],
                          "individuals": [],
                          "class": "systems:DetectionLimit"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:DetectionLimit"
                          ],
                          "individuals": [],
                          "class": "systems:DetectionLimit"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Drift"
                          ],
                          "individuals": [],
                          "class": "systems:Drift"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Drift"
                          ],
                          "individuals": [],
                          "class": "systems:Drift"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Frequency"
                          ],
                          "individuals": [],
                          "class": "systems:Frequency"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Frequency"
                          ],
                          "individuals": [],
                          "class": "systems:Frequency"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Latency"
                          ],
                          "individuals": [],
                          "class": "systems:Latency"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Latency"
                          ],
                          "individuals": [],
                          "class": "systems:Latency"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:MeasurementRange"
                          ],
                          "individuals": [],
                          "class": "systems:MeasurementRange"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:MeasurementRange"
                          ],
                          "individuals": [],
                          "class": "systems:MeasurementRange"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Precision"
                          ],
                          "individuals": [],
                          "class": "systems:Precision"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Precision"
                          ],
                          "individuals": [],
                          "class": "systems:Precision"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Resolution"
                          ],
                          "individuals": [],
                          "class": "systems:Resolution"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Resolution"
                          ],
                          "individuals": [],
                          "class": "systems:Resolution"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:ResponseTime"
                          ],
                          "individuals": [],
                          "class": "systems:ResponseTime"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:ResponseTime"
                          ],
                          "individuals": [],
                          "class": "systems:ResponseTime"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Selectivity"
                          ],
                          "individuals": [],
                          "class": "systems:Selectivity"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Selectivity"
                          ],
                          "individuals": [],
                          "class": "systems:Selectivity"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Sensitivity"
                          ],
                          "individuals": [],
                          "class": "systems:Sensitivity"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Sensitivity"
                          ],
                          "individuals": [],
                          "class": "systems:Sensitivity"
                      }
                  ],
                  "individuals": [],
                  "class": "systems:SystemProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "systems:SystemProperty"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Accuracy"
                          ],
                          "individuals": [],
                          "class": "systems:Accuracy"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Accuracy"
                          ],
                          "individuals": [],
                          "class": "systems:Accuracy"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:DetectionLimit"
                          ],
                          "individuals": [],
                          "class": "systems:DetectionLimit"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:DetectionLimit"
                          ],
                          "individuals": [],
                          "class": "systems:DetectionLimit"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Drift"
                          ],
                          "individuals": [],
                          "class": "systems:Drift"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Drift"
                          ],
                          "individuals": [],
                          "class": "systems:Drift"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Frequency"
                          ],
                          "individuals": [],
                          "class": "systems:Frequency"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Frequency"
                          ],
                          "individuals": [],
                          "class": "systems:Frequency"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Latency"
                          ],
                          "individuals": [],
                          "class": "systems:Latency"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Latency"
                          ],
                          "individuals": [],
                          "class": "systems:Latency"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:MeasurementRange"
                          ],
                          "individuals": [],
                          "class": "systems:MeasurementRange"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:MeasurementRange"
                          ],
                          "individuals": [],
                          "class": "systems:MeasurementRange"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Precision"
                          ],
                          "individuals": [],
                          "class": "systems:Precision"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Precision"
                          ],
                          "individuals": [],
                          "class": "systems:Precision"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Resolution"
                          ],
                          "individuals": [],
                          "class": "systems:Resolution"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Resolution"
                          ],
                          "individuals": [],
                          "class": "systems:Resolution"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:ResponseTime"
                          ],
                          "individuals": [],
                          "class": "systems:ResponseTime"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:ResponseTime"
                          ],
                          "individuals": [],
                          "class": "systems:ResponseTime"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Selectivity"
                          ],
                          "individuals": [],
                          "class": "systems:Selectivity"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Selectivity"
                          ],
                          "individuals": [],
                          "class": "systems:Selectivity"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Sensitivity"
                          ],
                          "individuals": [],
                          "class": "systems:Sensitivity"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SystemProperty",
                              "systems:Sensitivity"
                          ],
                          "individuals": [],
                          "class": "systems:Sensitivity"
                      }
                  ],
                  "individuals": [],
                  "class": "systems:SystemProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "systems:SurvivalProperty"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SurvivalProperty",
                              "systems:BatteryLifetime"
                          ],
                          "individuals": [
                              "adapters:StoredEnergy",
                              "adapters:BatteryNominalCapacity"
                          ],
                          "class": "systems:BatteryLifetime"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SurvivalProperty",
                              "systems:BatteryLifetime"
                          ],
                          "individuals": [
                              "adapters:StoredEnergy",
                              "adapters:BatteryNominalCapacity"
                          ],
                          "class": "systems:BatteryLifetime"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SurvivalProperty",
                              "systems:SystemLifetime"
                          ],
                          "individuals": [],
                          "class": "systems:SystemLifetime"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SurvivalProperty",
                              "systems:SystemLifetime"
                          ],
                          "individuals": [],
                          "class": "systems:SystemLifetime"
                      }
                  ],
                  "individuals": [],
                  "class": "systems:SurvivalProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "systems:SurvivalProperty"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SurvivalProperty",
                              "systems:BatteryLifetime"
                          ],
                          "individuals": [
                              "adapters:StoredEnergy",
                              "adapters:BatteryNominalCapacity"
                          ],
                          "class": "systems:BatteryLifetime"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SurvivalProperty",
                              "systems:BatteryLifetime"
                          ],
                          "individuals": [
                              "adapters:StoredEnergy",
                              "adapters:BatteryNominalCapacity"
                          ],
                          "class": "systems:BatteryLifetime"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SurvivalProperty",
                              "systems:SystemLifetime"
                          ],
                          "individuals": [],
                          "class": "systems:SystemLifetime"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:SurvivalProperty",
                              "systems:SystemLifetime"
                          ],
                          "individuals": [],
                          "class": "systems:SystemLifetime"
                      }
                  ],
                  "individuals": [],
                  "class": "systems:SurvivalProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "systems:Condition"
                  ],
                  "individuals": [],
                  "class": "systems:Condition"
              },
              {
                  "path": [
                      "ssn:Property",
                      "systems:Condition"
                  ],
                  "individuals": [],
                  "class": "systems:Condition"
              },
              {
                  "path": [
                      "ssn:Property",
                      "systems:OperatingProperty"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "ssn:Property",
                              "systems:OperatingProperty",
                              "systems:MaintenanceSchedule"
                          ],
                          "individuals": [],
                          "class": "systems:MaintenanceSchedule"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:OperatingProperty",
                              "systems:MaintenanceSchedule"
                          ],
                          "individuals": [],
                          "class": "systems:MaintenanceSchedule"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:OperatingProperty",
                              "systems:OperatingPowerRange"
                          ],
                          "individuals": [
                              "adapters:LowerStateOfChargeBoundary",
                              "adapters:UpperStateOfChargeBoundary"
                          ],
                          "class": "systems:OperatingPowerRange"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:OperatingProperty",
                              "systems:OperatingPowerRange"
                          ],
                          "individuals": [
                              "adapters:LowerStateOfChargeBoundary",
                              "adapters:UpperStateOfChargeBoundary"
                          ],
                          "class": "systems:OperatingPowerRange"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:OperatingProperty",
                              "adapters:PowerConsumption"
                          ],
                          "individuals": [
                              "adapters:MaxPowerConsumption",
                              "adapters:MeanPowerConsumption",
                              "adapters:MinPowerConsumption",
                              "adapters:ActualEnergyConsumedChargingSession"
                          ],
                          "class": "adapters:PowerConsumption"
                      }
                  ],
                  "individuals": [
                      "adapters:BakingStep",
                      "adapters:HeaterMeatProbeAllowed",
                      "adapters:HeaterPreheatAllowed",
                      "adapters:ChildLock",
                      "adapters:FastFreeze",
                      "adapters:HeaterSystem",
                      "adapters:SuperCool",
                      "adapters:BatteryActualControlMode"
                  ],
                  "class": "systems:OperatingProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "systems:OperatingProperty"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "ssn:Property",
                              "systems:OperatingProperty",
                              "systems:MaintenanceSchedule"
                          ],
                          "individuals": [],
                          "class": "systems:MaintenanceSchedule"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:OperatingProperty",
                              "systems:MaintenanceSchedule"
                          ],
                          "individuals": [],
                          "class": "systems:MaintenanceSchedule"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:OperatingProperty",
                              "systems:OperatingPowerRange"
                          ],
                          "individuals": [
                              "adapters:LowerStateOfChargeBoundary",
                              "adapters:UpperStateOfChargeBoundary"
                          ],
                          "class": "systems:OperatingPowerRange"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:OperatingProperty",
                              "systems:OperatingPowerRange"
                          ],
                          "individuals": [
                              "adapters:LowerStateOfChargeBoundary",
                              "adapters:UpperStateOfChargeBoundary"
                          ],
                          "class": "systems:OperatingPowerRange"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "systems:OperatingProperty",
                              "adapters:PowerConsumption"
                          ],
                          "individuals": [
                              "adapters:MaxPowerConsumption",
                              "adapters:MeanPowerConsumption",
                              "adapters:MinPowerConsumption",
                              "adapters:ActualEnergyConsumedChargingSession"
                          ],
                          "class": "adapters:PowerConsumption"
                      }
                  ],
                  "individuals": [
                      "adapters:BakingStep",
                      "adapters:HeaterMeatProbeAllowed",
                      "adapters:HeaterPreheatAllowed",
                      "adapters:ChildLock",
                      "adapters:FastFreeze",
                      "adapters:HeaterSystem",
                      "adapters:SuperCool",
                      "adapters:BatteryActualControlMode"
                  ],
                  "class": "systems:OperatingProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "systems:OperatingRange"
                  ],
                  "individuals": [],
                  "class": "systems:OperatingRange"
              },
              {
                  "path": [
                      "ssn:Property",
                      "systems:OperatingRange"
                  ],
                  "individuals": [],
                  "class": "systems:OperatingRange"
              },
              {
                  "path": [
                      "ssn:Property",
                      "systems:SurvivalRange"
                  ],
                  "individuals": [],
                  "class": "systems:SurvivalRange"
              },
              {
                  "path": [
                      "ssn:Property",
                      "systems:SurvivalRange"
                  ],
                  "individuals": [],
                  "class": "systems:SurvivalRange"
              },
              {
                  "path": [
                      "ssn:Property",
                      "systems:SystemCapability"
                  ],
                  "individuals": [],
                  "class": "systems:SystemCapability"
              },
              {
                  "path": [
                      "ssn:Property",
                      "systems:SystemCapability"
                  ],
                  "individuals": [],
                  "class": "systems:SystemCapability"
              },
              {
                  "path": [
                      "ssn:Property",
                      "adapters:AmbientProperty"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "ssn:Property",
                              "adapters:AmbientProperty",
                              "adapters:AmbientHumidityProperty"
                          ],
                          "individuals": [
                              "adapters:AverageHumidity",
                              "adapters:AverageHumidityDeviation",
                              "adapters:HighestHumidityDeviation",
                              "adapters:MaxHumidity",
                              "adapters:MinHumidity",
                              "adapters:RelativeHumidity"
                          ],
                          "class": "adapters:AmbientHumidityProperty"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "adapters:AmbientProperty",
                              "adapters:AmbientTemperatureProperty"
                          ],
                          "individuals": [
                              "adapters:AmbientTemperature",
                              "adapters:AverageTemperature",
                              "adapters:AverageTemperatureDeviation",
                              "adapters:DeviceTemperature",
                              "adapters:HighestTemperatureDeviation",
                              "adapters:MaxTemperature",
                              "adapters:MinTemperature"
                          ],
                          "class": "adapters:AmbientTemperatureProperty"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "adapters:AmbientProperty",
                              "adapters:SolarRadiationAmbientProperty"
                          ],
                          "individuals": [
                              "adapters:DirectSolarRadiation",
                              "adapters:GlobalSolarRadiation",
                              "adapters:UVIndex"
                          ],
                          "class": "adapters:SolarRadiationAmbientProperty"
                      }
                  ],
                  "individuals": [
                      "adapters:IndoorEnvironmentalQualityScore"
                  ],
                  "class": "adapters:AmbientProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "adapters:TemperatureProperty"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "ssn:Property",
                              "adapters:TemperatureProperty",
                              "adapters:AmbientTemperatureProperty"
                          ],
                          "individuals": [
                              "adapters:AmbientTemperature",
                              "adapters:AverageTemperature",
                              "adapters:AverageTemperatureDeviation",
                              "adapters:DeviceTemperature",
                              "adapters:HighestTemperatureDeviation",
                              "adapters:MaxTemperature",
                              "adapters:MinTemperature"
                          ],
                          "class": "adapters:AmbientTemperatureProperty"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "adapters:TemperatureProperty",
                              "adapters:DeviceTemperatureProperty"
                          ],
                          "individuals": [
                              "adapters:DeviceTemperature",
                              "adapters:BakingTemperature",
                              "adapters:FreezerTemperature",
                              "adapters:RefrigeratorTemperature"
                          ],
                          "class": "adapters:DeviceTemperatureProperty"
                      }
                  ],
                  "individuals": [
                      "adapters:HeaterDefaultTemperature",
                      "adapters:HeaterMaxTemperature",
                      "adapters:HeaterMinTemperature",
                      "adapters:MeatProbeTemperature"
                  ],
                  "class": "adapters:TemperatureProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "adapters:CarbonDioxide"
                  ],
                  "individuals": [
                      "adapters:AverageCO2Concentration",
                      "adapters:AverageCO2ConcentrationDeviation",
                      "adapters:CO2Concentration",
                      "adapters:HighestCO2ConcentrationDeviation",
                      "adapters:MaxCO2Concentration",
                      "adapters:MinCO2Concentration"
                  ],
                  "class": "adapters:CarbonDioxide"
              },
              {
                  "path": [
                      "ssn:Property",
                      "adapters:CarbonMonoxide"
                  ],
                  "individuals": [],
                  "class": "adapters:CarbonMonoxide"
              },
              {
                  "path": [
                      "ssn:Property",
                      "adapters:HealthProperty"
                  ],
                  "individuals": [
                      "adapters:CaloriesBurned",
                      "adapters:DiastolicBloodPressure",
                      "adapters:HeartRate",
                      "adapters:Sleep",
                      "adapters:SystolicBloodPressure",
                      "adapters:Weight"
                  ],
                  "class": "adapters:HealthProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "adapters:LightProperty"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "ssn:Property",
                              "adapters:LightProperty",
                              "adapters:Irradiance"
                          ],
                          "individuals": [],
                          "class": "adapters:Irradiance"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "adapters:LightProperty",
                              "adapters:LuminusFlux"
                          ],
                          "individuals": [],
                          "class": "adapters:LuminusFlux"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "adapters:LightProperty",
                              "adapters:LuminusIntensity"
                          ],
                          "individuals": [
                              "adapters:AverageLightIntensity",
                              "adapters:Luminance",
                              "adapters:MaxLightIntensity",
                              "adapters:MinLightIntensity"
                          ],
                          "class": "adapters:LuminusIntensity"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "adapters:LightProperty",
                              "adapters:Radiance"
                          ],
                          "individuals": [],
                          "class": "adapters:Radiance"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "adapters:LightProperty",
                              "adapters:RadiantIntensity"
                          ],
                          "individuals": [],
                          "class": "adapters:RadiantIntensity"
                      }
                  ],
                  "individuals": [
                      "adapters:LightColor"
                  ],
                  "class": "adapters:LightProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "adapters:MotionProperty"
                  ],
                  "individuals": [
                      "adapters:AverageMovemenetShare",
                      "adapters:AverageMovementTime",
                      "adapters:DistanceWalked",
                      "adapters:Motion",
                      "adapters:Steps"
                  ],
                  "class": "adapters:MotionProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "adapters:OperationalStatus"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "ssn:Property",
                              "adapters:OperationalStatus",
                              "adapters:DeviceLightStatusProperty"
                          ],
                          "individuals": [
                              "adapters:DeviceLightStatus",
                              "adapters:FreezerLightStatus",
                              "adapters:RefrigeratorLightStatus"
                          ],
                          "class": "adapters:DeviceLightStatusProperty"
                      },
                      {
                          "path": [
                              "ssn:Property",
                              "adapters:OperationalStatus",
                              "adapters:DeviceDoorStatusProperty"
                          ],
                          "individuals": [
                              "adapters:FreezerDoorStatus",
                              "adapters:RefrigeratorDoorStatus",
                              "adapters:OvenDoorStatus"
                          ],
                          "class": "adapters:DeviceDoorStatusProperty"
                      }
                  ],
                  "individuals": [
                      "adapters:ChargeStatus",
                      "adapters:DeviceStatus",
                      "adapters:DimmingLevel",
                      "adapters:FanSpeed",
                      "adapters:Mode",
                      "adapters:OnOff",
                      "adapters:OpenClosed",
                      "adapters:ValvePosition",
                      "adapters:Baking",
                      "adapters:ChargingStationOperationalStatus",
                      "adapters:ConnectorStatus",
                      "adapters:Start",
                      "adapters:Stop",
                      "adapters:FreezerEmergency",
                      "adapters:OvenEmergency",
                      "adapters:RefrigeratorEmergency",
                      "adapters:BatteryConnectionStatus",
                      "adapters:BatteryOperationalStatus",
                      "adapters:InverterStatus",
                      "adapters:PVConnectionStatus",
                      "adapters:PVOperationStatus"
                  ],
                  "class": "adapters:OperationalStatus"
              },
              {
                  "path": [
                      "ssn:Property",
                      "adapters:Presence"
                  ],
                  "individuals": [
                      "adapters:EntryExit"
                  ],
                  "class": "adapters:Presence"
              },
              {
                  "path": [
                      "ssn:Property",
                      "adapters:Sound"
                  ],
                  "individuals": [
                      "adapters:AverageSound",
                      "adapters:AverageSoundDeviation",
                      "adapters:HighestSoundDeviation",
                      "adapters:MaxSound",
                      "adapters:MinSound",
                      "adapters:NoiseLevel"
                  ],
                  "class": "adapters:Sound"
              },
              {
                  "path": [
                      "ssn:Property",
                      "adapters:TimeProperty"
                  ],
                  "individuals": [
                      "adapters:CurrentBakingStepRemainingTime",
                      "adapters:ElapsedBakingTime",
                      "adapters:ActualChargingSessionDuration",
                      "adapters:AlarmTime",
                      "adapters:BakingEndTimeHour",
                      "adapters:BakingEndTimeMinute",
                      "adapters:BakingRemainingTime",
                      "adapters:BakingStartTimeHour",
                      "adapters:BakingStartTimeMinute",
                      "adapters:BakingTime",
                      "adapters:DelayedBaking"
                  ],
                  "class": "adapters:TimeProperty"
              },
              {
                  "path": [
                      "ssn:Property",
                      "adapters:Power"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "ssn:Property",
                              "adapters:Power",
                              "adapters:PowerConsumption"
                          ],
                          "individuals": [
                              "adapters:MaxPowerConsumption",
                              "adapters:MeanPowerConsumption",
                              "adapters:MinPowerConsumption",
                              "adapters:ActualEnergyConsumedChargingSession"
                          ],
                          "class": "adapters:PowerConsumption"
                      }
                  ],
                  "individuals": [
                      "adapters:AccumulatedEnergyConsumed",
                      "adapters:AccumulatedEnergyInjectedToGrid",
                      "adapters:ActivePowerAbsorbedFromGrid",
                      "adapters:ActivePowerInjectedToGrid",
                      "adapters:ActivePowerProduction",
                      "adapters:ActivePowerSetPoint",
                      "adapters:ActualActivePowerGeneration",
                      "adapters:ActualActivePowerInjectedToGrid",
                      "adapters:ActualActivePowerLoad",
                      "adapters:ActualReactivePowerGeneration",
                      "adapters:ActualReactivePowerInjectedToGrid",
                      "adapters:ActualReactivePowerLoad",
                      "adapters:ConnectorCurrentChargingPower",
                      "adapters:ConnectorDesiredMaxPower",
                      "adapters:ConnectorSmartChargingProfile",
                      "adapters:EnergySupplySystem",
                      "adapters:InverterNominalPower",
                      "adapters:MaximalPowerPerConnector",
                      "adapters:NominalProductionCapacity",
                      "adapters:NumberOfConnectors",
                      "adapters:PhotoVoltaicPanelServiceLevel",
                      "adapters:PowerFactorLowerBound",
                      "adapters:ReactivePowerAbsorbedFromGrid",
                      "adapters:ReactivePowerInjectedToGrid",
                      "adapters:ReactivePowerProduction",
                      "adapters:ReactivePowerSetPoint",
                      "adapters:SimultaneousCharging",
                      "adapters:ActualActivePowerProduction",
                      "adapters:ActualReactivePowerProduction",
                      "adapters:MaximalCurrentOfChargingCable",
                      "adapters:NominalElectricVehicleCurrent",
                      "adapters:AccumulatedEnergyProduced",
                      "adapters:ActualBatteryStateOfCharge",
                      "adapters:ActualDCCurrent",
                      "adapters:ActualDCPower",
                      "adapters:ActualDCVoltage",
                      "adapters:BatteryActualDCCurrent",
                      "adapters:BatteryActualDCPower",
                      "adapters:BatteryActualDCVoltage",
                      "adapters:BatteryActualPowertSetPoint",
                      "adapters:BatteryChargeStatus",
                      "adapters:ConsumerActivePowerLoad",
                      "adapters:GridActivePowerLoad",
                      "adapters:InverterAccumulatedActiveEnergyConsumptio",
                      "adapters:InverterAccumulatedActiveEnergyProduction",
                      "adapters:InverterActualActivePower",
                      "adapters:InverterActualFrequency",
                      "adapters:InverterActualReactivePower",
                      "adapters:InverterConsumerActivePowerLoad",
                      "adapters:InverterGridActivePowerLoad",
                      "adapters:InverterPVActualActivePower",
                      "adapters:InverterPVActualReactivePower",
                      "adapters:InverterTotalDCPower",
                      "adapters:MaxBatteryStateOfCharge",
                      "adapters:MinBatteryStateOfCharge",
                      "adapters:PVAccumulatedDCEnergy",
                      "adapters:PVActualDCCurrent",
                      "adapters:PVActualDCPower",
                      "adapters:PVActualDCVoltage",
                      "adapters:PVInstalledCapacity"
                  ],
                  "class": "adapters:Power"
              },
              {
                  "path": [
                      "ssn:Property",
                      "adapters:SpaceProperty"
                  ],
                  "individuals": [
                      "adapters:Azimuth",
                      "adapters:Elevation",
                      "adapters:Location",
                      "adapters:GPSAltitude",
                      "adapters:GPSLatitude",
                      "adapters:GPSLongitude",
                      "adapters:GPSPrecision"
                  ],
                  "class": "adapters:SpaceProperty"
              }
          ],
          "individuals": [],
          "class": "ssn:Property"
      },
      "service-hierarchy": {
          "path": [
              "core:Service"
          ],
          "sub-classes": [
              {
                  "path": [
                      "core:Service",
                      "core:Application"
                  ],
                  "class": "core:Application"
              }
          ],
          "class": "core:Service"
      },
      "location-hierarchy": {
          "path": [
              "geosp:Feature"
          ],
          "sub-classes": [
              {
                  "path": [
                      "geosp:Feature",
                      "s4bldg:BuildingSpace"
                  ],
                  "class": "s4bldg:BuildingSpace"
              },
              {
                  "path": [
                      "geosp:Feature",
                      "s4bldg:Building"
                  ],
                  "class": "s4bldg:Building"
              },
              {
                  "path": [
                      "geosp:Feature",
                      "s4city:AdministrativeArea"
                  ],
                  "sub-classes": [
                      {
                          "path": [
                              "geosp:Feature",
                              "s4city:AdministrativeArea",
                              "s4city:City"
                          ],
                          "class": "s4city:City"
                      },
                      {
                          "path": [
                              "geosp:Feature",
                              "s4city:AdministrativeArea",
                              "s4city:Country"
                          ],
                          "class": "s4city:Country"
                      }
                  ],
                  "class": "s4city:AdministrativeArea"
              }
          ],
          "class": "geosp:Feature"
      }
  },
  "status": "success"
};
