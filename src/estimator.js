
export const calcCurrentlyInfected = (reportedCases) => reportedCases * 10;

export const calcSevereCurrentlyInfected = (reportedCases) => reportedCases * 50;

export const calcInfectionsByRequestedTime = (currentlyInfected) => currentlyInfected * 512;

const covid19ImpactEstimator = (data) => {
  const currentlyInfected = calcCurrentlyInfected(data.reportedCases);
  const severeCurrentlyInfected = calcSevereCurrentlyInfected(data.reportedCases);
  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime: calcInfectionsByRequestedTime(currentlyInfected)

    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: calcInfectionsByRequestedTime(severeCurrentlyInfected)

    }
  };
};


export default covid19ImpactEstimator;
