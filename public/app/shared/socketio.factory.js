'use strict';
const SOCKETIO = new WeakMap();
const ROOTSCOPE = new WeakMap();

class Socketio {
  constructor($rootScope) {
    ROOTSCOPE.set(this, $rootScope);
    SOCKETIO.set(this, io.connect());
  }

  on(eventName, callback) {
    if (SOCKETIO.get(this).hasListeners(eventName)) {
      SOCKETIO.get(this).removeEventListener(eventName);
    }
    SOCKETIO.get(this).on(eventName, (...args) => {
      ROOTSCOPE.get(this).$apply(() => {
        callback.apply(SOCKETIO.get(this), args);
      });
    });
  }

  emit(eventName, data, callback) {
    SOCKETIO.get(this).emit(eventName, data, (...args) => {
      ROOTSCOPE.get(this).$apply(() => {
        if (callback) callback.apply(SOCKETIO.get(this), args);
      });
    });
  }

  static factoryFn($rootScope) {
    return new Socketio($rootScope);
  }
}

Socketio.factoryFn.$inject = ['$rootScope'];

export default Socketio.factoryFn;

