import covid19ImpactEstimator from '../src/estimator'

const data = {
    region: {
    name: "Africa",
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
    },
    periodType: "days",
    timeToElapse: 38,
    reportedCases: 2747,
    population: 92931687,
    totalHospitalBeds: 678874
   };

const output = {
    data,
    impact : {
        currentlyInfected :27470 ,
        infectionsByRequestedTime :112517120 ,
        severeCasesByRequestedTime : 16877568,
        hospitalBedsByRequestedTime : -16639962
    },
    severeImpact : {
        currentlyInfected : 137350,
        infectionsByRequestedTime : 562585600,
        severeCasesByRequestedTime : 84387840,
        hospitalBedsByRequestedTime : -84150234
    }
}   

test("should return output", () => {
    expect(covid19ImpactEstimator(data)).toEqual(output)
})