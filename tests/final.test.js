import covid19ImpactEstimator from '../src/estimator'

const data = {
    region: {
    name: "Africa",
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
    },
    periodType: "days",
    timeToElapse: 58,
    reportedCases: 10,
    population: 66622705,
    totalHospitalBeds: 1380614
   };

const output = {
    data,
    impact : {
        currentlyInfected :100 ,
        infectionsByRequestedTime :52428800 ,
        severeCasesByRequestedTime : 7864320,
        hospitalBedsByRequestedTime : -7381105
    },
    severeImpact : {
        currentlyInfected : 500,
        infectionsByRequestedTime : 262144000,
        severeCasesByRequestedTime : 39321600,
        hospitalBedsByRequestedTime : -38838385
    }
}   

test("should return output", () => {
    expect(covid19ImpactEstimator(data)).toEqual(output)
})