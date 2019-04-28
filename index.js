Air.module('touchPanel', function () {
  var _module = this,
    _swipePanel = Air.doc.querySelector('.js-swipe-element'),
    _swipePanelWrapper = Air.doc.querySelector('.map-expand'),
    _btnShowPanel = Air.doc.querySelector('.js-show-swipe-panel'),
    _vendors = ['ms', 'moz', 'webkit', 'o'],
    _requestID,
    _posY = 0,
    _minHeight = 30,
    _pixelsPerFrame = 3,
    _touchStart = 0,
    _touchCurrent = 0,
    _direction = 0,
    _lastTime = 0,
    _showSwipePanel = function () {
      _swipePanel.style.visibility = 'hidden';
      _btnShowPanel.style.visibility = 'visible';
    };



  this.on('init', function (params) {

    function animate() {
      _requestID = requestAnimationFrame(animate);
      _posY = _swipePanel.offsetHeight;


      if (_swipePanel.offsetHeight > 0) {

        (_direction) ? _posY -= _pixelsPerFrame : _posY += _pixelsPerFrame;
        document.querySelector('.js-swipe-element').setAttribute('style', max-height:${_posY}px);
        if (_posY < _minHeight) {
          _swipePanel.style.visibility = 'hidden';
          _btnShowPanel.style.visibility = 'visible';
        }
      }
      else {
        cancelAnimationFrame(_requestID);
      }
    };
    for (var x = 0; x < _vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[_vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[_vendors[x] + 'CancelAnimationFrame']
        || window[_vendors[x] + 'CancelRequestAnimationFrame'];
    }


    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - _lastTime));
        var id = window.setTimeout(function () { callback(currTime + timeToCall); },
          timeToCall);
        _lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };

    if (!Air.supports('touch')) return;
    Air.$doc.on('touchstart', function (e) {

      _touchStart = e.touches[0];
      _requestID = requestAnimationFrame(animate);

    }).on('touchmove', function (e) {

      _touchCurrent = e.touches[0];

      (_touchStart.clientY > _touchCurrent.clientY) ? _direction = false : _direction = true;

    }).on('touchend', function (e) {
      _touchStart = 0;
      _touchCurrent = 0;
      cancelAnimationFrame(_requestID);
    });
    Air.$doc.on('click', '.js-show-swipe-panel', _showSwipePanel);

  });

  this.setState('ready', true);
});