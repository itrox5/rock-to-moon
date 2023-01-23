class MoonGame {
  constructor(clouds, scoreBoard, moons) {
    this.clouds = clouds;
    this.scoreBoard = scoreBoard;
    this.moons = moons;
    this.lastCloud = null;
    this.timeUp = false;
    this.score = 0;
  }

  randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  randomCloud(clouds) {
    const idx = Math.floor(Math.random() * clouds.length);
    const cloud = clouds[idx];
    if (cloud === this.lastCloud) {
      return this.randomCloud(clouds);
    }
    this.lastCloud = cloud;
    return cloud;
  }

  peep() {
    const time = this.randomTime(200, 2000);
    const cloud = this.randomCloud(this.clouds);
    cloud.classList.add('up');
    setTimeout(() => {
      cloud.classList.remove('up');
      if (!this.timeUp) this.peep();
    }, time);
  }

  startGame() {
    const gameDuration = 15000;
    const hideOverlay = () => {
      return new Promise((resolve) => {
        overlay.style.display = 'none';
        body.classList.add('cursor-style');
        setTimeout(() => {
          resolve();
        }, gameDuration);
      });
    }
    
    const showOverlay = () => {
      overlay.style.display = 'block';
      body.classList.remove('cursor-style');
      console.log(this.scoreBoard.textContent + ' moon landings');
      document.querySelector('.overlay__final-score').innerHTML = this.scoreBoard.textContent;
    }
      
    hideOverlay().then(showOverlay);
    this.scoreBoard.textContent = 0;
    this.timeUp = false;
    this.score = 0;
    this.peep();
    setTimeout(() => this.timeUp = true, gameDuration)
  }

  bonk(e) {
    const cloud = e.currentTarget.parentNode;
    cloud.classList.remove('up');
    this.score++;
    this.scoreBoard.textContent = this.score;
  }
}

const start = document.querySelector('.overlay__play-button');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');
const clouds = document.querySelectorAll('.game__cloud');
const scoreBoard = document.querySelector('.score');
const moons = document.querySelectorAll('.game__moon');
const game = new MoonGame(clouds, scoreBoard, moons);
moons.forEach(mole => mole.addEventListener('click', (event) => game.bonk(event)));
start.addEventListener( 'click', () => game.startGame(game, scoreBoard, moons));