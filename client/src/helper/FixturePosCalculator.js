
function getDistance(fixture, coords){
    return Math.sqrt((fixture.x - coords.x)**2 + (fixture.y - coords.y)**2 + (fixture.z - coords.z)**2)
}

export default function closestFixtures(fixtures, number, trackCoords){
    let closest = []
    for (let i = 0; i < number; i++){
        let closestFixture = fixtures.reduce((prev, curr) => getDistance(prev, trackCoords) < getDistance(curr, trackCoords) ? prev : curr)
        closest.push(closestFixture)
        fixtures.splice(fixtures.indexOf(closestFixture), 1)
    }
    return closest
}