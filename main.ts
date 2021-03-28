input.onButtonPressed(Button.A, function () {
    player.change(LedSpriteProperty.X, -1)
    for (let car of cars) {
        if (player.get(LedSpriteProperty.X) == car.get(LedSpriteProperty.X) && player.get(LedSpriteProperty.Y) == car.get(LedSpriteProperty.Y)) {
            gameOn = false
        }
    }
})
input.onButtonPressed(Button.B, function () {
    player.change(LedSpriteProperty.X, 1)
    for (let car of cars) {
        if (player.get(LedSpriteProperty.X) == car.get(LedSpriteProperty.X) && player.get(LedSpriteProperty.Y) == car.get(LedSpriteProperty.Y)) {
            gameOn = false
        }
    }
})
let car: game.LedSprite = null
let carnum = 0
let deltaScore = 0
let gameOn = false
let cars: game.LedSprite[] = []
let player: game.LedSprite = null
let _ = "https://www.101computing.net/microbit-car-racing-game/"
player = game.createSprite(2, 4)
cars = [game.createSprite(0, 0), game.createSprite(1, 0), game.createSprite(2, 0), game.createSprite(3, 0), game.createSprite(4, 0)]
for (let car of cars) {
    car.set(LedSpriteProperty.Brightness, 60)
}
let delays = [randint(0, 500), randint(0, 500), randint(0, 500), randint(0, 500), randint(0, 500)]
let score = 0
game.setScore(0)
gameOn = true
while (gameOn) {
    deltaScore = 0
    carnum = cars.length
    while (gameOn && carnum > 0) {
        carnum += -1
        delays[carnum] = delays[carnum] - 1
        if (delays[carnum] <= 0) {
            car = cars[carnum]
            if (car.get(LedSpriteProperty.Y) == 3 && player.get(LedSpriteProperty.X) == car.get(LedSpriteProperty.X)) {
                deltaScore = 0
                gameOn = false
            } else if (car.get(LedSpriteProperty.Y) == 4) {
                deltaScore += 1
                car.set(LedSpriteProperty.Y, 0)
                delays[carnum] = randint(0, Math.max(1, 500 - score / 20))
            } else {
                car.change(LedSpriteProperty.Y, 1)
                delays[carnum] = randint(0, Math.max(1, 100 - score / 10))
            }
        }
    }
    score += deltaScore
    basic.pause(10)
}
game.setScore(score)
game.gameOver()
