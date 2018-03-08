import { SokobanLevels } from './sokoban-levels';

export class Map {
  public map = null;
  private goals = 0;
  public goalsAchieved = 0;
  public width = 0;
  public height = 0;
  public playerX = 0;
  public playerY = 0;
  public number = 0;
  public finished = false;
  public onScreenWidth = 0;
  private onScreenHeight = 0;
  private imageRepository: ImageRepository;
  private levelStatistics = new LevelStatistics(this);
  public loaded = false;

  getPlayer() {
    return this.map[this.playerX][this.playerY];
  }

  constructor(imageRepository: ImageRepository) {
    this.imageRepository = imageRepository;
  }

  loadMap(levelNumber) {
    this.map = null;
    this.goals = 0;
    this.goalsAchieved = 0;
    this.width = 0;
    this.height = 0;
    this.playerX = 0;
    this.playerY = 0;
    this.finished = false;
    this.loaded = false;
    this.parseMap(SokobanLevels.levels[levelNumber]);
  }

  update() {
    // check for end game conditions
    if (this.goals > 0 && this.goalsAchieved === this.goals) {
      this.finished = true;
    }
    this.levelStatistics.update();
  }

  draw(canvasContext) {
    let xCanvasPos = 20;
    let yCanvasPos = 20;
    const tileSize = 30;
    for (let y = 0; y < this.height; y++) {
      xCanvasPos = 20;
      for (let x = 0; x < this.width; x++) {

        const img = this.map[x][y].getImage();
        if (img != null) {
          // draw image
          canvasContext.drawImage(img, xCanvasPos, yCanvasPos);
        } else {
          // draw rectangle
          canvasContext.fillStyle = this.map[x][y].getFillStyle();
          canvasContext.fillRect(xCanvasPos, yCanvasPos, tileSize, tileSize);
        }

        xCanvasPos += tileSize;
      }
      yCanvasPos += tileSize;
    }
    // this is used to properly position level statistics according to the level
    this.onScreenWidth = xCanvasPos;
    this.onScreenHeight = yCanvasPos;
    this.levelStatistics.draw(canvasContext);
  }

  parseMap(map: { width, height, map, no }) {
    this.width = map.width;
    this.height = map.height;
    this.number = map.no;

    this.map = new Array(this.width);

    for (let x = 0; x < this.map.length; x++) {
      this.map[x] = new Array(this.height);
    }

    let y = 0;
    // find every Tutorial and print the author
    const mapRef = this.map;
    const mapObjectRef = this;
    const mapWidth = this.width;


    map.map.forEach(function (row) {
      let wall = false;
      for (let x = 0; x < mapWidth; x++) {
        // some rows are shorter than map width - fill rest with Empty elements
        if (x >= row.length) {
          mapRef[x][y] = new Empty();
        } else {
          switch (row[x]) {
            case ' ':
              // if we had wall already that means we need to insert Floor element,
              // for Empty elements that are between walls on some maps we are using '=' character
              if (wall) {
                mapRef[x][y] = new Floor();
              } else {
                mapRef[x][y] = new Empty();
              }
              break;
            case '#':
              mapRef[x][y] = new Wall();
              wall = true;
              break;
            case '$':
              mapRef[x][y] = new Box();
              break;
            case '.':
              mapRef[x][y] = new Goal();
              mapObjectRef.goals++;
              break;
            case '@':
              mapRef[x][y] = new Player(mapObjectRef);
              mapObjectRef.playerX = x;
              mapObjectRef.playerY = y;
              break;
            case '*':
              mapRef[x][y] = new BoxOnGoal();
              mapObjectRef.goalsAchieved++;
              mapObjectRef.goals++;
              break;
            case '+':
              const player = new Player(mapObjectRef);
              mapRef[x][y] = player;
              player.isOnGoal = true;
              mapObjectRef.playerX = x;
              mapObjectRef.playerY = y;
              break;
            case '=':
              mapRef[x][y] = new Empty();
              break;
          }
        }
        mapRef[x][y].imageRepository = mapObjectRef.imageRepository;
      }
      y++;
    });

    this.loaded = true;
  }
}

export class LevelStatistics {
  private map: Map;
  private pushes: number = 0;
  private moves: number = 0;

  constructor(map: Map) {
    this.map = map;
  }

  update() {
    const player = this.map.getPlayer();
    this.pushes = player.pushes;
    this.moves = player.moves;
  }

  draw(context) {
    let x = this.map.onScreenWidth + 10;
    let y = 20;

    context.fillStyle = 'rgb(127,0,0)';
    context.strokeStyle = 'rgb(0,0,0)';
    x += 20;
    context.strokeRect(x, y, 100, 85);
    x += 5;
    y += 20;
    context.font = 'bold 12px sans-serif';
    context.fillText('Level ' + this.map.number + ' / ' + SokobanLevels.levels.length, x, y);
    y += 25;
    context.fillText('Pushes : ' + this.pushes, x, y);
    y += 25;
    context.fillText('Moves : ' + this.moves, x, y);
  }
}

export class ImageRepository {
  public floor = new Image();
  public wall = new Image();
  public empty = null; // we don't need image for empty space
  public box = new Image();
  public goal = new Image();
  public player = new Image();
  public boxOnGoal = new Image();

  public imgLoaded = 0;

  loaded() {
    // we have 7 types of element, but only 6 are being rendered as images
    return this.imgLoaded === 6;
  }

  loadContent() {
    this.imgLoaded = 0;
    const repository = this;
    // go through all properties and load images['floor', 'wall', 'box', 'goal', 'player', 'boxOnGoal']
    Object.keys(this).forEach(function (property, key) {
      if (repository[property] instanceof Image) {
        repository[property].onload = function () {
          repository.imgLoaded++;
        };
      }
    });

    // this is workaround to load cached image in Chrome,
    // assigning string.empty and later true value will force onload event to fire
    this.wall.src = '';
    this.box.src = '';
    this.goal.src = '';
    this.player.src = '';
    this.boxOnGoal.src = '';
    this.floor.src = '';

    this.wall.src = '/assets/wall.gif';
    this.box.src = '/assets/box.gif';
    this.goal.src = '/assets/goal.gif';
    this.player.src = '/assets/player.gif';
    this.boxOnGoal.src = '/assets/boxOnGoal.gif';
    this.floor.src = '/assets/floor.gif';
  }
}

export class DrawableElement {
  imageRepository: ImageRepository = null;

  getImage() {
    // implement this method in your sub-class if your element is represented by image
    // this should return Image object
    return null;
  }

  getFillStyle() {
    // implement this method in your sub-class if your element is represented by filled rectangle
    // this should return canvas "fillStyle" string.
    return null;
  }
}

export class Floor extends DrawableElement {
  getImage() {
    return this.imageRepository.floor;
  }
}

export class Empty extends DrawableElement {
  getImage() {
    return this.imageRepository.empty;
  }

  getFillStyle() {
    return 'rgba(255, 255, 255, 1)'; // white
  }
}

export class BoxOnGoal extends DrawableElement {
  getImage() {
    return this.imageRepository.boxOnGoal;
  }
}

export class Wall extends DrawableElement {
  getImage() {
    return this.imageRepository.wall;
  }
}

export class Box extends DrawableElement {
  getImage() {
    return this.imageRepository.box;
  }
}

export class Goal extends DrawableElement {
  getImage() {
    return this.imageRepository.goal;
  }
}

export class Player extends DrawableElement {

  // possible player movement enumeration
  private moveDirection = { 'up': 0, 'down': 1, 'left': 3, 'right': 4 };

  private moves = 0;
  private pushes = 0;

  // player stand on goal
  public isOnGoal = false;

  private map: Map;

  constructor(map: Map) {
    super();
    this.map = map;
  }

  // DrawableElement implementation
  getImage() {
    return this.imageRepository.player;
  }

  keyCheck(event) {
    const KeyID = event.keyCode;

    switch (KeyID) {
      case 87: // W
        this.move(this.moveDirection.up);
        break;
      case 65: // A
        this.move(this.moveDirection.left);
        break;
      case 68: // D
        this.move(this.moveDirection.right);
        break;
      case 83: // S
        this.move(this.moveDirection.down);
        break;
    }
  }

  validateMove(targetCell, nextCell) {
    const posToMove = targetCell.constructor;

    if (posToMove === Wall) {
      // wall is next, player cannot move there
      return false;
    }

    const nextObject = nextCell.constructor;
    if ((posToMove === Box || posToMove === BoxOnGoal) &&
      (nextObject === Wall || nextObject === Box || nextObject === BoxOnGoal)
    ) {
      // player attempts to push box, next element after the box is wall or another box – player cannot move
      return false;
    }

    return true;
  }

  moveBox(boxCell, moveBoxToCell, moveToX, moveToY) {
    // we need to move the box too
    this.pushes++;

    const posToMove = boxCell.constructor;
    const nextObject = moveBoxToCell.constructor;

    if (nextObject === Goal) {
      this.map.map[moveToX][moveToY] = new BoxOnGoal();
      if (posToMove === Box) {
        // we just moved Box on goal
        this.map.goalsAchieved++;
      }
    } else {
      this.map.map[moveToX][moveToY] = new Box();
      if (posToMove === BoxOnGoal) {
        // box was on goal but now it's not
        this.map.goalsAchieved--;
      }
    }
    this.map.map[moveToX][moveToY].imageRepository = this.imageRepository;
  }

  move(direction) {
    const oldX = this.map.playerX;
    const oldY = this.map.playerY;

    let newX = this.map.playerX;
    let newY = this.map.playerY;

    let nextOneX = this.map.playerX;
    let nextOneY = this.map.playerY;
    switch (direction) {
      case this.moveDirection.down:
        newY++;
        nextOneY += 2;
        break;
      case this.moveDirection.up:
        newY--;
        nextOneY -= 2;
        break;
      case this.moveDirection.left:
        newX--;
        nextOneX -= 2;
        break;
      case this.moveDirection.right:
        newX++;
        nextOneX += 2;
        break;
      default:
    }
    const attemptedCell = this.map.map[newX][newY];
    let nextCell;
    if (nextOneX >= 0 && nextOneY >= 0 && nextOneX < this.map.width && nextOneY < this.map.height) {
      nextCell = this.map.map[nextOneX][nextOneY];
    }

    const posToMove = attemptedCell.constructor;

    // next cell is Goal = player will be standing on goal
    let isGoal = (attemptedCell.constructor === Goal);

    if (!this.validateMove(attemptedCell, nextCell)) {
      return;
    }

    if (nextCell && (posToMove === Box || posToMove === BoxOnGoal)) {
      this.moveBox(attemptedCell, nextCell, nextOneX, nextOneY);
      if (posToMove === BoxOnGoal) {
        isGoal = true;
      }
    }

    // update player position
    this.map.playerY = newY;
    this.map.playerX = newX;
    this.map.map[this.map.playerX][this.map.playerY] = this.map.map[oldX][oldY];

    this.moves++;

    if (this.isOnGoal) {
      this.map.map[oldX][oldY] = new Goal();
    } else {
      this.map.map[oldX][oldY] = new Floor();
    }
    this.isOnGoal = isGoal;

    this.map.map[oldX][oldY].imageRepository = this.imageRepository;
  }
}

export class Game {

  private checkInterval = 50;

  private map: Map;
  private imageRepository: ImageRepository;
  private canvas;
  private canvasContext;
  private canvasBuffer;
  private canvasBufferContext;

  private player = null;
  private initialUpdateDraw = null;

  getPlayer() {
    return this.player;
  }

  initialize(canvas) {
    this.imageRepository = new ImageRepository();
    this.map = new Map(this.imageRepository);

    this.canvas = canvas.nativeElement;

    if (this.canvas) {
      this.canvasContext = this.canvas.getContext('2d');

      this.canvasBuffer = document.createElement('canvas');
      this.canvasBuffer.width = this.canvas.width;
      this.canvasBuffer.height = this.canvas.height;
      this.canvasBufferContext = this.canvasBuffer.getContext('2d');
      return true;
    }

    return false;
  }

  loadContent() {
    let level = localStorage.getItem('sokoban');
    if (!level) {
      level = '1';
    }

    this.imageRepository.loadContent();
    this.map.loadMap(level);
    const doc = <any>document;
    doc.sokoban = this;
    document.addEventListener('keyup', this.keyUpHandler);

    this.initialUpdateDraw = setInterval(this.initialUpdateRun, this.checkInterval);
  }

  run(canvas) {
    if (this.initialize(canvas)) {
      // if initialization was successful, load content
      this.loadContent();
    }
  }

  keyUpHandler(event) {
    const doc = <any>document;
    const sokoban = doc.sokoban;
    sokoban.update(event);
    sokoban.draw();
  }

  initialUpdateRun(ev) {
    const doc = <any>document;
    const game = doc.sokoban;
    if (game.map.loaded && game.imageRepository.loaded()) {
      game.update(ev);
      game.draw();
      // we don't need timer anymore
      clearInterval(game.initialUpdateDraw);
    }
  }

  update(event) {
    this.player = this.map.getPlayer();
    if (event) {
      this.getPlayer().keyCheck(event);
    }
    this.map.update();

    if (this.map.finished) {
      document.removeEventListener('keyup', this.keyUpHandler);
      if (+this.map.number === SokobanLevels.levels.length) {
        // this is last map
        // TODO: show finished
        console.log('no more levels');
        return;
      }
      // TODO: show success
      console.log('success, move to next level');
      localStorage.setItem('sokoban', String(this.map.number + 1));
      this.loadContent();
    }
  }

  draw() {
    // clear canvas
    this.canvasBufferContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw map to buffer
    this.map.draw(this.canvasBufferContext);

    // draw buffer on screen
    this.canvasContext.drawImage(this.canvasBuffer, 0, 0);
  }
}
