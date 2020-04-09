
export const calcCurrentlyInfected = (reportedCases) => reportedCases * 10;

export const calcSevereCurrentlyInfected = (reportedCases) => reportedCases * 50;

export const calcInfections = (currentlyInfected, factor) => currentlyInfected * factor;


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

const covid19ImpactEstimator = (data) => {
  const currentlyInfected = calcCurrentlyInfected(data.reportedCases);
  const severeCurrentlyInfected = calcSevereCurrentlyInfected(data.reportedCases);
  const factor = calcFactor(data.periodType, data.timeToElapse);
  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime: calcInfections(currentlyInfected, factor)

    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: calcInfections(severeCurrentlyInfected, factor)

    }
  };
};


export default covid19ImpactEstimator;
