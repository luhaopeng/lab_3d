"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var setValues = function setValues(parameters) {
  var _this = this;

  if (parameters === undefined) return;
  var keys = Object.keys(parameters);
  keys.map(function (key) {
    var value = parameters[key];

    if (value !== undefined) {
      _this[key] = value;
    }
  });
}; // 复合体 - 展板


var ShowBoard = function ShowBoard() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  THREE.Group.call(this);
  options = Object.assign({
    length: 30,
    height: 12,
    width: 1,
    boardColor: 0x4f4f4f,
    marginX: 1,
    marginY: 0.5,
    imageThickness: 0.05,
    boardImg: 'img/showBoard/show_board_default.jpg'
  }, options);
  this.setValues(options);
  this.init();
};

ShowBoard.prototype = Object.assign(Object.create(THREE.Group.prototype), {
  constructor: ShowBoard,
  init: function init() {
    var _this = this; // 展板


    var board = new THREE.Mesh(new THREE.BoxGeometry(this.length, this.height, this.width), new THREE.MeshPhongMaterial({
      color: this.boardColor
    }));
    board.castShadow = true;
    board.receiveShadow = true;
    this.add(board); // 展图

    this.boardImg === 'none' || new THREE.TextureLoader().load(this.boardImg, function (texture) {
      var imageMesh = new THREE.Mesh(new THREE.PlaneGeometry(_this.length - _this.marginX * 2, _this.height - _this.marginY * 2), new THREE.MeshBasicMaterial({
        map: texture
      }));
      imageMesh.position.z += _this.width / 2 + _this.imageThickness;

      _this.add(imageMesh);
    });
  },
  setValues: setValues
}); // 复合体 - 桌子

var Desk = function Desk() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  THREE.Group.call(this);
  options = Object.assign({
    length: 20,
    width: 8,
    height: 6,
    desktopColor: 0xeeeeee,
    desktopThickness: 1,
    legThickness: 1,
    legColor: 0x282c2d
  }, options);
  this.setValues(options);
  this.init();
};

Desk.prototype = Object.assign(Object.create(THREE.Group.prototype), {
  constructor: Desk,
  init: function init() {
    // 桌面
    var deskTop = new THREE.Mesh(new THREE.BoxGeometry(this.length, this.desktopThickness, this.width), new THREE.MeshPhongMaterial({
      color: this.desktopColor
    }));
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    deskTop.position.y += (this.height - this.desktopThickness) / 2;
    this.add(deskTop); // 桌腿

    var leg = new THREE.Group();
    var legGeometryHorizontal = new THREE.BoxGeometry(this.legThickness, this.legThickness, this.width - this.legThickness * 2);
    var legGeometryVertical = new THREE.BoxGeometry(this.legThickness, this.height - this.desktopThickness, this.legThickness);
    var legMaterial = new THREE.MeshPhongMaterial({
      color: this.legColor
    });
    var legPiece1 = new THREE.Mesh(legGeometryHorizontal, legMaterial);
    legPiece1.castShadow = true;
    legPiece1.receiveShadow = true;
    legPiece1.position.y += (this.height - this.desktopThickness - this.legThickness) / 2;
    leg.add(legPiece1);
    var legPiece2 = new THREE.Mesh(legGeometryVertical, legMaterial);
    legPiece2.castShadow = true;
    legPiece2.receiveShadow = true;
    legPiece2.position.z += (this.width - this.legThickness) / 2;
    leg.add(legPiece2);
    var legPiece3 = legPiece1.clone();
    legPiece3.position.y -= this.height - this.desktopThickness - this.legThickness;
    leg.add(legPiece3);
    var legPiece4 = legPiece2.clone();
    legPiece4.position.z -= this.width - this.legThickness;
    leg.add(legPiece4);
    leg.position.x -= (this.length - this.legThickness) / 2;
    leg.position.y -= this.desktopThickness / 2;
    this.add(leg);
    var leg2 = leg.clone();
    leg2.position.x += this.length - this.legThickness;
    this.add(leg2);
  },
  setValues: setValues
}); // 复合体 - 实验台

var WorkBench = function WorkBench() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  THREE.Group.call(this);
  options = Object.assign({
    length: 28,
    width: 8,
    height: 10,
    desktopColor: 0x282c2d,
    desktopThickness: 1,
    cabinetMarginSide: 1,
    cabinetThickness: 1,
    cabinetWidth: 6,
    cabinetColor: 0xeeeeee,
    cabinetDoorColor: 0x064f93,
    handleLength: 1,
    handleWidth: 0.5,
    handleThickness: 0.5,
    handleMarginHorizontal: 0.5,
    handleMarginVertical: 1,
    handleColor: 0x282c2d
  }, options);
  this.setValues(options);
  this.init();
};

WorkBench.prototype = Object.assign(Object.create(THREE.Group.prototype), {
  constructor: WorkBench,
  init: function init() {
    var desktop = new THREE.Mesh(new THREE.BoxGeometry(this.length, this.desktopThickness, this.width), new THREE.MeshPhongMaterial({
      color: this.desktopColor
    }));
    desktop.castShadow = true;
    desktop.receiveShadow = true;
    desktop.position.y += (this.height - this.desktopThickness) / 2;
    this.add(desktop);
    var cabinetMaterial = new THREE.MeshPhongMaterial({
      color: this.cabinetColor
    });
    var cabinetBack = new THREE.Mesh(new THREE.BoxGeometry(this.length - this.cabinetMarginSide * 2, this.height - this.desktopThickness, this.cabinetThickness), cabinetMaterial);
    cabinetBack.castShadow = true;
    cabinetBack.receiveShadow = true;
    cabinetBack.position.y -= this.desktopThickness / 2;
    cabinetBack.position.z -= (this.width - this.cabinetMarginSide * 2 - this.cabinetThickness) / 2;
    this.add(cabinetBack);
    var cabinet1 = new THREE.Group();
    var cabinetLeft = new THREE.Mesh(new THREE.BoxGeometry(this.cabinetThickness, this.height - this.desktopThickness, this.width - this.cabinetMarginSide * 2 - this.cabinetThickness), cabinetMaterial);
    cabinetLeft.castShadow = true;
    cabinetLeft.receiveShadow = true;
    cabinetLeft.position.x -= (this.cabinetWidth - this.cabinetThickness) / 2;
    cabinet1.add(cabinetLeft);
    var cabinetRight = cabinetLeft.clone();
    cabinetRight.position.x += this.cabinetWidth - this.cabinetThickness;
    cabinet1.add(cabinetRight);
    var cabinetBottom = new THREE.Mesh(new THREE.BoxGeometry(this.cabinetWidth - this.cabinetThickness * 2, this.cabinetThickness, this.width - this.cabinetMarginSide * 2 - this.cabinetThickness), cabinetMaterial);
    cabinetBottom.castShadow = true;
    cabinetBottom.receiveShadow = true;
    cabinetBottom.position.y -= (this.height - this.desktopThickness - this.cabinetThickness) / 2;
    cabinet1.add(cabinetBottom);
    var cabinetTop = cabinetBottom.clone();
    cabinetTop.position.y += this.height - this.desktopThickness - this.cabinetThickness;
    cabinet1.add(cabinetTop);
    var cabinetDoor = new THREE.Mesh(new THREE.BoxGeometry(this.cabinetWidth - this.cabinetThickness * 2, this.height - this.desktopThickness - this.cabinetThickness * 2, this.cabinetThickness), new THREE.MeshPhongMaterial({
      color: this.cabinetDoorColor
    }));
    cabinetDoor.castShadow = true;
    cabinetDoor.receiveShadow = true;
    cabinetDoor.position.z += this.width / 2 - this.cabinetMarginSide - this.cabinetThickness;
    cabinet1.add(cabinetDoor);
    cabinet1.position.x -= (this.length - this.cabinetMarginSide * 2 - this.cabinetWidth) / 2;
    cabinet1.position.y -= this.desktopThickness / 2;
    cabinet1.position.z += this.cabinetThickness / 2;
    this.add(cabinet1);
    var cabinet2 = cabinet1.clone();
    cabinet2.position.x += this.length - this.cabinetMarginSide * 2 - this.cabinetWidth;
    this.add(cabinet2); // 柜门把手

    var handle1 = new THREE.Mesh(new THREE.BoxGeometry(this.handleWidth, this.handleLength, this.handleThickness), new THREE.MeshPhongMaterial({
      color: this.handleColor
    }));
    handle1.castShadow = true;
    handle1.receiveShadow = true;
    handle1.position.x -= this.length / 2 - this.cabinetMarginSide - this.cabinetWidth + this.cabinetThickness + this.handleMarginHorizontal + this.handleWidth / 2;
    handle1.position.y += this.height / 2 - this.desktopThickness - this.cabinetThickness - this.handleMarginVertical - this.handleLength / 2;
    handle1.position.z += (this.width - this.cabinetMarginSide * 2 + this.handleThickness) / 2;
    this.add(handle1);
    var handle2 = handle1.clone();
    handle2.position.x += this.length + (this.cabinetThickness + this.handleMarginHorizontal - this.cabinetMarginSide - this.cabinetWidth) * 2 + this.handleWidth;
    this.add(handle2);
  },
  setValues: setValues
}); // 复合体 - 展柜

var Showcase = function Showcase() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  THREE.Group.call(this);
  options = Object.assign({
    length: 26,
    width: 6,
    height: 8,
    row: 2,
    column: 5,
    caseColor: 0xeeeeee,
    caseThickness: 1,
    meterLength: 1,
    meterThickness: 1,
    meterColor: 0x63B8FF
  }, options);
  this.setValues(options);
  this.init();
};

Showcase.prototype = Object.assign(Object.create(THREE.Group.prototype), {
  constructor: Showcase,
  init: function init() {
    // 展柜
    var casePieceMaterial = new THREE.MeshPhongMaterial({
      color: this.caseColor
    });
    var casePieceBack = new THREE.Mesh(new THREE.BoxGeometry(this.length, this.height, this.caseThickness), casePieceMaterial);
    casePieceBack.castShadow = true;
    casePieceBack.receiveShadow = true;
    casePieceBack.position.z -= (this.width - this.caseThickness) / 2;
    this.add(casePieceBack);
    var casePieceLeft = new THREE.Mesh(new THREE.BoxGeometry(this.caseThickness, this.height, this.width - this.caseThickness), casePieceMaterial);
    casePieceLeft.castShadow = true;
    casePieceLeft.receiveShadow = true;
    casePieceLeft.position.x -= (this.length - this.caseThickness) / 2;
    casePieceLeft.position.z += this.caseThickness / 2;
    this.add(casePieceLeft);
    var casePieceRight = casePieceLeft.clone();
    casePieceRight.position.x += this.length - this.caseThickness;
    this.add(casePieceRight);
    var casePieceTop = new THREE.Mesh(new THREE.BoxGeometry(this.length - this.caseThickness * 2, this.caseThickness, this.width - this.caseThickness), casePieceMaterial);
    casePieceTop.castShadow = true;
    casePieceTop.receiveShadow = true;
    casePieceTop.position.y += (this.height - this.caseThickness) / 2;
    casePieceTop.position.z += this.caseThickness / 2;
    this.add(casePieceTop); // 电表

    var meterAreaLength = this.length - this.caseThickness * 2;
    var meterAreaHeight = this.height - this.caseThickness;
    var meterMarginHorizontal = (meterAreaLength - this.column * this.meterLength) / this.column;
    var meterMarginVertical = (meterAreaHeight - this.row * this.meterLength) / this.row;
    var meter = new THREE.Mesh(new THREE.BoxGeometry(this.meterLength, this.meterLength, this.meterThickness), new THREE.MeshPhongMaterial({
      color: this.meterColor
    }));
    meter.castShadow = true;
    meter.receiveShadow = true;
    meter.position.x -= (this.length - meterMarginHorizontal - this.caseThickness * 2 - this.meterLength) / 2;
    meter.position.y += (this.height - meterMarginVertical - this.caseThickness * 2 - this.meterLength) / 2;
    meter.position.z -= (this.width - this.caseThickness * 2 - this.meterThickness) / 2;

    for (var r = 0; r < this.row; r++) {
      for (var c = 0; c < this.column; c++) {
        var meterCopy = meter.clone();
        meterCopy.position.x += c * (meterMarginHorizontal + this.meterLength);
        meterCopy.position.y -= r * (meterMarginVertical + this.meterLength);
        this.add(meterCopy);
      }
    }
  },
  setValues: setValues
}); // 复合体 - 提示文字

var Hint = function Hint() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  THREE.Group.call(this);
  options = Object.assign({
    text: 'hello hint',
    font: 'Microsoft YaHei',
    fontSize: 48,
    fontStyle: 'bold',
    fontColor: '#ffffff',
    strokeColor: '#ff4500',
    strokeWidth: 2,
    wordInOneLine: 5,
    lineHeight: 48,
    hintMargin: 3,
    axis: 'y',
    timeout: 3000
  }, options);
  options.marginBottom = options.fontSize / 4;
  options.scaleBasis = Math.ceil(options.text.length / options.wordInOneLine);
  this.setValues(options);
  this.visible = false;
  this.init();
};

Hint.prototype = Object.assign(Object.create(THREE.Group.prototype), {
  constructor: Hint,
  init: function init() {
    var canvas = document.createElement('canvas');
    var rows = Math.ceil(this.text.length / this.wordInOneLine);
    canvas.width = this.fontSize * this.wordInOneLine;
    canvas.height = this.lineHeight * rows + this.marginBottom;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = this.fontColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.font = this.fontStyle + ' ' + this.fontSize + 'px ' + this.font;
    ctx.lineWidth = this.strokeWidth;
    ctx.wrapText(this.text, 0, this.lineHeight, this.fontSize * this.wordInOneLine, this.lineHeight);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    var sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false
    }));
    sprite.renderOrder = 1;
    var ratio = canvas.width / canvas.height;
    sprite.scale.set(this.scaleBasis * ratio, this.scaleBasis, 1);
    this.add(sprite);
  },
  setValues: setValues,
  bindTo: function bindTo(obj) {
    // 终端点击动作
    if (!Array.isArray(obj)) {
      obj = [obj];
    }

    var middleObj = obj[obj.length / 2 | 0];
    this.position.fromArray(middleObj.position.toArray());
    this.position[this.axis] += this.hintMargin;

    var _this = this;

    obj.map(function (target) {
      if (target.isObject3D) {
        target.on('click', function () {
          if (!_this.visible) {
            _this.visible = true;
            setTimeout(function () {
              _this.visible = false;
            }, _this.timeout);
          }
        });
      }
    });
  }
});

CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
  if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
    return;
  }

  var context = this;
  var canvas = context.canvas;

  if (typeof maxWidth == 'undefined') {
    maxWidth = canvas && canvas.width || 300;
  }

  if (typeof lineHeight == 'undefined') {
    lineHeight = canvas && parseInt(window.getComputedStyle(canvas).lineHeight) || parseInt(window.getComputedStyle(document.body).lineHeight);
  } // 字符分隔为数组


  var arrText = text.split('');
  var line = '';

  for (var n = 0; n < arrText.length; n++) {
    var testLine = line + arrText[n];
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      context.strokeText(line, x, y);
      line = arrText[n];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  context.fillText(line, x, y);
  context.strokeText(line, x, y);
}; // 复合体 - 电脑


var Computer = function Computer() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  THREE.Group.call(this);
  options = Object.assign({
    length: 5,
    width: 1.5,
    height: 4,
    screenHeight: 3,
    marginX: 0.2,
    marginY: 0.2,
    frameColor: 0x696969,
    image: 'none',
    imageColor: 0xcfcfcf,
    imageThickness: 0.05
  }, _objectSpread({}, options, {
    thickness: options.width / 3
  }));
  this.setValues(options);
  this.init();
};

Computer.prototype = Object.assign(Object.create(THREE.Group.prototype), {
  constructor: Computer,
  init: function init() {
    var frameMaterial = new THREE.MeshPhongMaterial({
      color: this.frameColor
    }); // 屏幕

    var screen = new THREE.Mesh(new THREE.BoxGeometry(this.length, this.screenHeight, this.thickness), frameMaterial);
    screen.castShadow = true;
    screen.receiveShadow = true;
    screen.position.y += (this.height - this.screenHeight) / 2;
    screen.position.z += (this.width - this.thickness) / 2;
    this.add(screen); // 显示图像

    var imageMaterial;

    if (this.image === 'none') {
      imageMaterial = new THREE.MeshBasicMaterial({
        color: this.imageColor
      });
    } else {
      var texture = new THREE.TextureLoader().load(this.image);
      imageMaterial = new THREE.MeshBasicMaterial({
        map: texture
      });
    }

    var displayImage = new THREE.Mesh(new THREE.PlaneGeometry(this.length - this.marginX * 2, this.screenHeight - this.marginY * 2), imageMaterial);
    displayImage.position.y += (this.height - this.screenHeight) / 2;
    displayImage.position.z += this.width / 2 + this.imageThickness;
    this.add(displayImage); // 支柱

    var support = new THREE.Mesh(new THREE.BoxGeometry(this.thickness, this.height / 2, this.thickness), frameMaterial);
    support.castShadow = true;
    support.receiveShadow = true;
    support.position.y += this.thickness - this.height / 4;
    this.add(support); // 底座

    var base = new THREE.Mesh(new THREE.BoxGeometry(this.thickness * 3, this.thickness, this.thickness * 3), frameMaterial);
    base.castShadow = true;
    base.receiveShadow = true;
    base.position.y += (this.thickness - this.height) / 2;
    this.add(base);
  },
  setValues: setValues
});
//# sourceMappingURL=complex.js.map