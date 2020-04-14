import {calcSevereCases,calcHospitalBeds} from '../src/estimator'

test("should return 15",() => {
    expect(calcSevereCases(100)).toBe(15)
})

test("should returen 35", () => {
    expect(calcHospitalBeds(100,35)).toBe(35);
})

test("should return -15", () => {
    expect(calcHospitalBeds(150141,39552)).toBe(12997);
})
