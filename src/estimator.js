
export const calcCurrentlyInfected = (reportedCases) => reportedCases * 10;

export const calcSevereCurrentlyInfected = (reportedCases) => reportedCases * 50;

export const calcInfectionsByRequestedTime = (currentlyInfected,factor) => currentlyInfected * factor;

export const calcFactor = (periodType,timeToElapse) => {
    switch(periodType){
        case "days":
            return Math.pow(2,Math.floor(timeToElapse/3));
        case "weeks":
            return Math.pow(2,Math.floor((timeToElapse*7)/3));
        case "months":
            return Math.pow(2, Math.floor((timeToElapse*30)/3));
        default :
        return Math.pow(2,Math.floor(timeToElapse/3));
    }
}

const covid19ImpactEstimator = (data) => {
  const currentlyInfected = calcCurrentlyInfected(data.reportedCases);
  const severeCurrentlyInfected = calcSevereCurrentlyInfected(data.reportedCases);
  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime: calcInfectionsByRequestedTime(currentlyInfected, calcFactor(data.periodType,data.timeToElapse))

    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: calcInfectionsByRequestedTime(severeCurrentlyInfected, calcFactor(data.periodType,data.timeToElapse))

    }
  };
};


export default covid19ImpactEstimator;
