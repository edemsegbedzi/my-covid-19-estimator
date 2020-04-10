
export const calcCurrentlyInfected = (reportedCases) => reportedCases * 10;

export const calcSevereCurrentlyInfected = (reportedCases) => reportedCases * 50;

export const calcInfections = (currentlyInfected, factor) => currentlyInfected * factor;

export const calcSevereCases = (infections) => 0.15 * infections;

export const calcFactor = (periodType, timeToElapse) => {
  switch (periodType) {
    case 'days':
      return 2 ** Math.floor(timeToElapse / 3);
    case 'weeks':
      return 2 ** Math.floor((timeToElapse * 7) / 3);
    case 'months':
      return 2 ** Math.floor((timeToElapse * 30) / 3);
    default:
      return 2 ** Math.floor(timeToElapse / 3);
  }
};

export const calcHospitalBeds = (totalHospitalBeds, severeCasesByRequestedTime) => {
  const availableBeds = 0.35 * totalHospitalBeds;

  if ((availableBeds - severeCasesByRequestedTime) >= 0) {
    return Math.floor(availableBeds);
  }
  return Math.floor(availableBeds - severeCasesByRequestedTime + 1);
};

const covid19ImpactEstimator = (data) => {
  const currentlyInfected = calcCurrentlyInfected(data.reportedCases);
  const severeCurrentlyInfected = calcSevereCurrentlyInfected(data.reportedCases);
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
        impactSCaseRequest)

    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeSCaseRequest,
      hospitalBedsByRequestedTime: calcHospitalBeds(data.totalHospitalBeds,
        severeSCaseRequest)


    }
  };
};


export default covid19ImpactEstimator;
