import {calcIcuCare,calcVentilators,calcDollarsInFlight} from '../src/estimator'


test("should return 5625856 ",() => {
    expect(calcIcuCare(112517120)).toBe(5625856)
})

test("should return 2250342",() => {
    expect(calcVentilators(112517120)).toBe(2250342)
})

test("should return 12484899635.20",() => {
    expect(calcDollarsInFlight(112517120,0.73,4,38)).toBe("12484899635.20")
})