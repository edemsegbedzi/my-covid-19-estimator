
export const calcCurrentlyInfected = (reportedCases) => reportedCases * 10;

export const calcSevereCurrentlyInfected = (reportedCases) => reportedCases * 50;

export const calcInfections = (currentlyInfected, factor) => currentlyInfected * factor;

export const calcSevereCases = (infections) => Math.trunc(0.15 * infections);

export const calcIcuCare = (infections) => Math.trunc(0.05 * infections);

export const calcVentilators = (infections) => Math.trunc(0.02 * infections);

export const calcDollarsInFlight = (...params) => params.reduce((i, e) => i * e).toFixed(2);

const calcDays = (periodType, timeToElapse) => {
  switch (periodType) {
    case 'days':
      return Math.trunc(timeToElapse);
    case 'weeks':
      return Math.trunc(timeToElapse * 7);
    case 'months':
      return Math.trunc(timeToElapse * 30);
    default:
      return Math.trunc(timeToElapse);
  }
};


export const calcFactor = (periodType, timeToElapse) => {
  switch (periodType) {
    case 'days':
      return 2 ** Math.trunc(timeToElapse / 3);
    case 'weeks':
      return 2 ** Math.trunc((timeToElapse * 7) / 3);
    case 'months':
      return 2 ** Math.trunc((timeToElapse * 30) / 3);
    default:
      return 2 ** Math.trunc(timeToElapse / 3);
  }
};

export const calcHospitalBeds = (totalHospitalBeds, severeCasesByRequestedTime) => {
  const availableBeds = Math.trunc(0.35 * totalHospitalBeds);

  if ((availableBeds - severeCasesByRequestedTime) >= 0) {
    return availableBeds;
  }
  return (availableBeds - severeCasesByRequestedTime + 1);
};

const covid19ImpactEstimator = (data) => {
  const currentlyInfected = calcCurrentlyInfected(data.reportedCases);
  const severeCurrentlyInfected = calcSevereCurrentlyInfected(data.reportedCases);
  const days = calcDays(data.periodType, data.timeToElapse);
  const factor = calcFactor(data.periodType, data.timeToElapse);
  const impactInfectionsByRequestedTime = calcInfections(currentlyInfected, factor);
  const impactSCaseRequest = calcSevereCases(impactInfectionsByRequestedTime);
  const severeImpactInfectionsByRequestedTime = calcInfections(severeCurrentlyInfected, factor);
  const severeSCaseRequest = calcSevereCases(severeImpactInfectionsByRequestedTime);

  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime: impactInfectionsByRequestedTime,
      severeCasesByRequestedTime: impactSCaseRequest,
      hospitalBedsByRequestedTime: calcHospitalBeds(data.totalHospitalBeds,
        impactSCaseRequest),
      casesForICUByRequestedTime: calcIcuCare(impactInfectionsByRequestedTime),
      casesForVentilatorsByRequestedTime: calcVentilators(impactInfectionsByRequestedTime),
      dollarsInFlight: calcDollarsInFlight(impactInfectionsByRequestedTime,
        data.region.avgDailyIncomePopulation, data.region.avgDailyIncomeInUSD,
        days)

    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeSCaseRequest,
      hospitalBedsByRequestedTime: calcHospitalBeds(data.totalHospitalBeds,
        severeSCaseRequest),
      casesForICUByRequestedTime: calcIcuCare(severeImpactInfectionsByRequestedTime),
      casesForVentilatorsByRequestedTime: calcVentilators(severeImpactInfectionsByRequestedTime),
      dollarsInFlight: calcDollarsInFlight(severeImpactInfectionsByRequestedTime,
        data.region.avgDailyIncomePopulation, data.region.avgDailyIncomeInUSD,
        days)


    }
  };
};


export default covid19ImpactEstimator;
