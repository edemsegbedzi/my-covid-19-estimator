import covid19ImpactEstimator,{calcCurrentlyInfected,calcSevereCurrentlyInfected,calcInfectionsByRequestedTime} from '../src/estimator'


test("should return 100",() => {
    expect(calcCurrentlyInfected(10)).toBe(100)
})

test("should return 500",() => {
    expect(calcSevereCurrentlyInfected(10)).toBe(500)
})

test("should return 51200", () => {
    expect(calcInfectionsByRequestedTime(100)).toBe(51200)
})

test("should return 256000", () => {
    expect(calcInfectionsByRequestedTime(500)).toBe(256000)
})

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
        infectionsByRequestedTime :51200 ,
    },
    severeImpact : {
        currentlyInfected : 500,
        infectionsByRequestedTime : 256000,
    }
}   

test("should return output", () => {
    expect(covid19ImpactEstimator(data)).toEqual(output)
})