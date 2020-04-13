import {calcSevereCases,calcHospitalBeds} from '../src/estimator'

test("should return 15",() => {
    expect(calcSevereCases(100)).toBe(15)
})

test("should returen 0", () => {
    expect(calcHospitalBeds(100,35)).toBe(0);
})

test("should return -15", () => {
    expect(calcHospitalBeds(678874,16877568)).toBe(-16639962);
})
