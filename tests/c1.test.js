import covid19ImpactEstimator,{calcFactor, calcCurrentlyInfected,calcSevereCurrentlyInfected,calcInfections}
 from '../src/estimator'


test("should return 100",() => {
    expect(calcCurrentlyInfected(10)).toBe(100)
})

test("should return 500",() => {
    expect(calcSevereCurrentlyInfected(10)).toBe(500)
})

test("should return 51200", () => {
    expect(calcInfections(100,512)).toBe(51200)
})

test("should return 256000", () => {
    expect(calcInfections(500,512)).toBe(256000)
})


test("should return 512", () => {
    expect(calcFactor("days",28)).toBe(512)
})


test("should return 4", () => {
    expect(calcFactor("weeks",1)).toBe(4)
})

test("should return 1024", () => {
    expect(calcFactor("months",1)).toBe(1024)
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
        infectionsByRequestedTime :52428800 ,
    },
    severeImpact : {
        currentlyInfected : 500,
        infectionsByRequestedTime : 262144000,
    }
}   

test("should return output", () => {
    expect(covid19ImpactEstimator(data)).toEqual(output)
})