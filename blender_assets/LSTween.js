// -----JS CODE-----
global.LSTween = {}
global.LSTween.interp = {
  LERP: 0,
  SLERP: 1,
}

/**
 * Changes the current alpha of the material to desired value over X seconds
 *
 * @method global.LSTween.alphaTo
 * @param {Material} obj:Material that you wish to change alpha
 * @param {float} to:Destination value you want your alpha to reach
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.alphaTo(material, 0.25, 1000.0).start();
 */
global.LSTween.alphaTo = alphaTo

/**
 * Changes the alpha of the material from a given value to desired value over X seconds
 *
 * @method global.LSTween.alphaFromTo
 * @param {Material} obj:Material that you wish to change alpha
 * @param {float} from:Inital value you want your alpha to begin from
 * @param {float} to:Destination value you want your alpha to reach
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.alphaFromTo(material, 0.0, 1.00, 1000.0).start();
 */
global.LSTween.alphaFromTo = alphaFromTo

global.LSTween.textAlphaTo = textAlphaTo
global.LSTween.textAlphaFromTo = textAlphaFromTo
/**
 * Changes the current baseColor of the material to desired value over X seconds
 *
 * @method global.LSTween.colorTo
 * @param {Material} obj:Material that you wish to change alpha
 * @param {float} to:Destination value you want your color to reach
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.colorTo(material, new vec4(0,1,0,1), 1000.0).start();
 */
global.LSTween.colorTo = colorTo

/**
 * Changes the baseColor of the material from a given value to desired value over X seconds
 *
 * @method global.LSTween.colorFromTo
 * @param {Material} obj:Material that you wish to change alpha
 * @param {float} from:Inital value you want your color to begin from
 * @param {float} to:Destination value you want your color to reach
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.colorFromTo(material, new vec4(0,0,0,1), new vec4(0,1,0,1), 1000.0).start();
 */
global.LSTween.colorFromTo = colorFromTo
global.LSTween.colorTextFromTo = colorTextFromTo
/**
 * Moves the position of the transform object by the offset amount in local space over X seconds
 *
 * @method global.LSTween.move
 * @param {Material} obj:Material that you wish to change alpha
 * @param {vec3} offset:This is an addition operation in local space. For example, passing new vec3(1,0,0) will make object move 1 unit in X from its start position
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.move(transform, new vec3(0,5,0), 1000.0).start();
 */
global.LSTween.move = move

/**
 * Moves the position of the transform object to destination in world space over X seconds
 *
 * @method global.LSTween.moveToWorld
 * @param {Transform} obj:The transform object you want to change position
 * @param {vec3} to:The destination position you want your object to go to
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.moveToWorld(transform, new vec3(0,5,0), 1000.0).start();
 */
global.LSTween.moveToWorld = moveToWorld

/**
 * Moves the position of the transform object from a given position to destination in world space over X seconds
 *
 * @method global.LSTween.moveFromToWorld
 * @param {Transform} obj:The transform object you want to change position
 * @param {vec3} from:The initial position you want your object to start from
 * @param {vec3} to:The destination position you want your object to go to
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.moveFromToWorld(transform, new vec3(0,0,0), new vec3(0,5,0), 1000.0).start();
 */
global.LSTween.moveFromToWorld = moveFromToWorld

/**
 * Moves the position of the transform object to destination in local space over X seconds
 *
 * @method global.LSTween.moveToLocal
 * @param {Transform} obj:The transform object you want to change position
 * @param {vec3} to:The destination position you want your object to go to
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.moveToLocal(transform, new vec3(0,5,0), 1000.0).start();
 */
global.LSTween.moveToLocal = moveToLocal

/**
 * Moves the position of the transform object from a given position to destination in local space over X seconds
 *
 * @method global.LSTween.moveFromToLocal
 * @param {Transform} obj:The transform object you want to change position
 * @param {vec3} from:The initial position you want your object to start from
 * @param {vec3} to:The destination position you want your object to go to
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.moveFromToLocal(transform, new vec3(0,0,0), new vec3(0,5,0), 1000.0).start();
 */
global.LSTween.moveFromToLocal = moveFromToLocal

/**
 * Rotates the transform object by the offset amount in local space over X seconds
 *
 * @method global.LSTween.rotate
 * @param {Transform} obj:The transform object you want to change rotation
 * @param {quat} offset:Multiplies the offset value from current rotation
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @param {global.LSTween.interp} interp:The interpolation type, lerp vs slerp. If no value is passed, it defaults to slerp
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.rotate(transform, quat.angleAxis(radians, axis), 1000.0).start();
 */
global.LSTween.rotate = rotate

/**
 * Rotates the transform object to destination in world space over X seconds
 *
 * @method global.LSTween.rotateToWorld
 * @param {Transform} obj:The transform object you want to change rotation
 * @param {quat} to:The destination quaterion you want your object to go to
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @param {global.LSTween.interp} interp:The interpolation type, lerp vs slerp. If no value is passed, it defaults to slerp
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.rotateToWorld(transform, quat.angleAxis(radians, axis), 1000.0).start();
 */
global.LSTween.rotateToWorld = rotateToWorld

/**
 * Rotates the transform object from a given rotation to destination in world space over X seconds
 *
 * @method global.LSTween.rotateFromToWorld
 * @param {Transform} obj:The transform object you want to change rotation
 * @param {quat} from:The initial quaternion you want your object to start from
 * @param {quat} to:The destination quaternion you want your object to go to
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @param {global.LSTween.interp} interp:The interpolation type, lerp vs slerp. If no value is passed, it defaults to slerp
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.rotateToWorld(transform, quat.angleAxis(startRadian, axis), quat.angleAxis(destRadian, axis), 1000.0).start();
 */
global.LSTween.rotateFromToWorld = rotateFromToWorld

/**
 * Rotates the transform object to destination in local space over X seconds
 *
 * @method global.LSTween.rotateToLocal
 * @param {Transform} obj:The transform object you want to change rotation
 * @param {quat} to:The destination quaterion you want your object to go to
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @param {global.LSTween.interp} interp:The interpolation type, lerp vs slerp. If no value is passed, it defaults to slerp
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.rotateToLocal(transform, quat.angleAxis(radians, axis), 1000.0).start();
 */
global.LSTween.rotateToLocal = rotateToLocal

/**
 * Rotates the transform object from a given rotation to destination in local space over X seconds
 *
 * @method global.LSTween.rotateFromToLocal
 * @param {Transform} obj:The transform object you want to change rotation
 * @param {quat} from:The initial quaternion you want your object to start from
 * @param {quat} to:The destination quaternion you want your object to go to
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @param {global.LSTween.interp} interp:The interpolation type, lerp vs slerp. If no value is passed, it defaults to slerp
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.rotateFromToLocal(transform, quat.angleAxis(startRadian, axis), quat.angleAxis(destRadian, axis), 1000.0).start();
 */
global.LSTween.rotateFromToLocal = rotateFromToLocal

/**
 * Scales the transform object by the offset amount in local space over X seconds
 *
 * @method global.LSTween.scale
 * @param {Transform} obj:The transform object you want to change scale
 * @param {vec3} offset:Multiplies the offset value from current scale
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.scale(transform, new vec3(2,2,2), 1000.0).start();
 */
global.LSTween.scale = scale
/**
 * Scales the transform object to destination in world space over X seconds
 *
 * @method global.LSTween.scaleToWorld
 * @param {Transform} obj:The transform object you want to change scale
 * @param {vec3} to:The destination scale you want your object to go to
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.scaleToWorld(transform, new vec3(2,2,2), 1000.0).start();
 */
global.LSTween.scaleToWorld = scaleToWorld

/**
 * Scales the transform object from a given scale to destination in world space over X seconds
 *
 * @method global.LSTween.scaleFromToWorld
 * @param {Transform} obj:The transform object you want to change scale
 * @param {vec3} from:The initial scale you want your object to start from
 * @param {vec3} to:The destination scale you want your object to go to
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.scaleFromToWorld(transform, new vec3(1,1,1), new vec3(2,2,2), 1000.0).start();
 */
global.LSTween.scaleFromToWorld = scaleFromToWorld

/**
 * Scales the transform object to destination in local space over X seconds
 *
 * @method global.LSTween.scaleToLocal
 * @param {Transform} obj:The transform object you want to change scale
 * @param {vec3} to:The destination scale you want your object to go to
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.scaleToLocal(transform, new vec3(2,2,2), 1000.0).start();
 */
global.LSTween.scaleToLocal = scaleToLocal

/**
 * Scales the transform object from a given scale to destination in local space over X seconds
 *
 * @method global.LSTween.scaleFromToLocal
 * @param {Transform} obj:The transform object you want to change scale
 * @param {vec3} from:The initial scale you want your object to start from
 * @param {vec3} to:The destination scale you want your object to go to
 * @param {float} time:The time to complete the tween in. The unit is in miliseconds. 1000ms = 1s
 * @return {Tween} Tween object, you can configure the tween with different parameter with this object
 * @example
 * global.LSTween.scaleFromToLocal(transform, new vec3(1,1,1), new vec3(2,2,2), 1000.0).start();
 */
global.LSTween.scaleFromToLocal = scaleFromToLocal

global.LSTween.valueChange = valueChange
global.LSTween.rawTween = rawTween
global.LSTween.enableChange = enableChange

function ErrorCheckToPrint(obj, to, time) {
  if (obj == null) {
    print("[ERROR] - Empty Object pass as 'obj' parameter")
  } else if (to == null) {
    print("[ERROR] - Needs valid 'to' parameter")
  } else if (time == null) {
    print("[ERROR] - Needs valid 'time' parameter")
  }
}
function ErrorCheckFromToPrint(obj, from, to, time) {
  if (obj == null) {
    print("[ERROR] - Empty Object pass as 'obj' parameter")
  } else if (from == null) {
    print("[ERROR] - Needs valid 'from' parameter")
  } else if (to == null) {
    print("[ERROR] - Needs valid 'to' parameter")
  } else if (time == null) {
    print("[ERROR] - Needs valid 'time' parameter")
  }
}
function alphaTo(obj, to, time) {
  if (obj == null || to == null || time == null) {
    ErrorCheckToPrint(obj, to, time)
    return null
  }
  var mainPass = obj.mainPass
  //Is a Material
  if (mainPass != null) {
    if (mainPass.baseColor != null) {
      var initColor = mainPass.baseColor.a
      var toClamp = Clamp(to, 0.0, 1.0)
      var tween = new TWEEN.Tween({a: initColor})
        .to({a: toClamp}, time)
        .onUpdate(function (object) {
          var color = mainPass.baseColor
          color.a = object.a
          mainPass.baseColor = color
        })
      return tween
    }
  }
  print("[ERROR] - This Object has no capability of changing alpha")
  return null
}
function alphaFromTo(obj, from, to, time) {
  if (obj == null || from == null || to == null || time == null) {
    ErrorCheckFromToPrint(obj, from, to, time)
    return null
  }
  var mainPass = obj.mainPass
  //Is a Material
  if (mainPass != null) {
    if (mainPass.baseColor != null) {
      var fromClamp = Clamp(from, 0.0, 1.0)
      var toClamp = Clamp(to, 0.0, 1.0)
      var tween = new TWEEN.Tween({a: fromClamp})
        .to({a: toClamp}, time)
        .onUpdate(function (object) {
          var color = mainPass.baseColor
          color.a = object.a
          mainPass.baseColor = color
        })
      return tween
    }
  }
  print("[ERROR] - This Object has no capability of changing alpha")
  return null
}
//DropshadowSettings
function textAlphaTo(obj, to, time) {
  var initColor = obj.textFill.color.a
  var initShadowColor = obj.dropshadowSettings.fill.color.a;
  var toClamp = Clamp(to, 0.0, 1.0)
  var tween = new TWEEN.Tween({a: initColor})
    .to({a: toClamp}, time)
    .onUpdate(function (object) {
      var color = obj.textFill.color
      color.a = object.a
      obj.textFill.color = color
      var shadowColor = obj.dropshadowSettings.fill.color;
      shadowColor.a = object.a
      obj.dropshadowSettings.fill.color = shadowColor;
        
    })
  return tween
}
function textAlphaFromTo(obj, from, to, time) {
  var fromClamp = Clamp(from, 0.0, 1.0)
  var toClamp = Clamp(to, 0.0, 1.0)
  var tween = new TWEEN.Tween({a: fromClamp})
    .to({a: toClamp}, time)
    .onUpdate(function (object) {
      var color = obj.textFill.color
      color.a = object.a
      obj.textFill.color = color
        
      var shadowColor = obj.dropshadowSettings.fill.color;
      shadowColor.a = object.a
      obj.dropshadowSettings.fill.color = shadowColor;
    })
  return tween
}
function colorTo(obj, to, time) {
  if (obj == null || to == null || time == null) {
    ErrorCheckToPrint(obj, to, time)
    return null
  }
  var mainPass = obj.mainPass
  //Is a Material
  if (mainPass != null) {
    if (mainPass.baseColor != null) {
      var initColor = mainPass.baseColor
      var tween = new TWEEN.Tween({t: 0.0})
        .to({t: 1.0}, time)
        .onUpdate(function (object) {
          mainPass.baseColor = vec4.lerp(initColor, to, object.t)
        })
      return tween
    }
  }
  print("[ERROR] - This Object has no capability of changing color")
  return null
}

function colorFromTo(obj, from, to, time) {
  if (obj == null || from == null || to == null || time == null) {
    ErrorCheckFromToPrint(obj, from, to, time)
    return null
  }
  var mainPass = obj.mainPass
  //Is a Material
  if (mainPass != null) {
    if (mainPass.baseColor != null) {
      var fromClamp = Clamp(from, 0.0, 1.0)
      var toClamp = Clamp(to, 0.0, 1.0)
      var tween = new TWEEN.Tween({t: 0.0})
        .to({t: 1.0}, time)
        .onUpdate(function (object) {
          mainPass.baseColor = vec4.lerp(from, to, object.t)
        })
      return tween
    }
  }
  print("[ERROR] - This Object has no capability of changing color")
  return null
}
function colorTextFromTo(obj, from, to, time) {
  //    var fromClamp = Clamp(from, 0.0, 1.0);
  //    var toClamp = Clamp(to, 0.0, 1.0);
  var tween = new TWEEN.Tween({t: 0.0})
    .to({t: 1.0}, time)
    .onUpdate(function (object) {
      obj.textFill.color = vec4.lerp(from, to, object.t)
    })
  return tween
}
function move(obj, offset, time) {
  if (obj == null || offset == null || time == null) {
    ErrorCheckToPrint(obj, offset, time)
    return null
  }
  var initPos = obj.getLocalPosition()
  var toPos = obj.getLocalPosition().add(offset)
  var tween = new TWEEN.Tween({x: initPos.x, y: initPos.y, z: initPos.z})
    .to({x: toPos.x, y: toPos.y, z: toPos.z}, time)
    .onUpdate(function (object) {
      obj.setLocalPosition(new vec3(object.x, object.y, object.z))
    })
  return tween
}
function moveToWorld(obj, to, time) {
  if (obj == null || to == null || time == null) {
    ErrorCheckToPrint(obj, to, time)
    return null
  }
  var initPos = obj.getWorldPosition()
  var tween = new TWEEN.Tween({x: initPos.x, y: initPos.y, z: initPos.z})
    .to({x: to.x, y: to.y, z: to.z}, time)
    .onUpdate(function (object) {
      obj.setWorldPosition(new vec3(object.x, object.y, object.z))
    })
  return tween
}

function moveFromToWorld(obj, from, to, time) {
  if (obj == null || from == null || to == null || time == null) {
    ErrorCheckFromToPrint(obj, from, to, time)
    return null
  }
  var tween = new TWEEN.Tween({x: from.x, y: from.y, z: from.z})
    .to({x: to.x, y: to.y, z: to.z}, time)
    .onUpdate(function (object) {
      obj.setWorldPosition(new vec3(object.x, object.y, object.z))
    })
  return tween
}

function moveToLocal(obj, to, time) {
  if (obj == null || to == null || time == null) {
    ErrorCheckToPrint(obj, to, time)
    return null
  }
  var initPos = obj.getLocalPosition()
  var tween = new TWEEN.Tween({x: initPos.x, y: initPos.y, z: initPos.z})
    .to({x: to.x, y: to.y, z: to.z}, time)
    .onUpdate(function (object) {
      obj.setLocalPosition(new vec3(object.x, object.y, object.z))
    })
  return tween
}
function moveFromToLocal(obj, from, to, time) {
  if (obj == null || from == null || to == null || time == null) {
    ErrorCheckFromToPrint(obj, from, to, time)
    return null
  }
  var tween = new TWEEN.Tween({x: from.x, y: from.y, z: from.z})
    .to({x: to.x, y: to.y, z: to.z}, time)
    .onUpdate(function (object) {
      obj.setLocalPosition(new vec3(object.x, object.y, object.z))
    })
  return tween
}
function rotate(obj, offset, time, interp) {
  if (obj == null || offset == null || time == null) {
    ErrorCheckToPrint(obj, offset, time)
    return null
  }
  if (interp === undefined) {
    interp = global.LSTween.interp.SLERP
  }
  var initRot = obj.getWorldRotation()
  var toRot = offset.multiply(initRot)

  var tween = new TWEEN.Tween({t: 0})
    .to({t: 1}, time)
    .onUpdate(function (object) {
      switch (interp) {
        case global.LSTween.interp.LERP:
          obj.setLocalRotation(quat.lerp(initRot, toRot, object.t))
          break
        case global.LSTween.interp.SLERP:
          obj.setLocalRotation(quat.slerp(initRot, toRot, object.t))
          break
        default:
          obj.setLocalRotation(quat.slerp(initRot, toRot, object.t))
          break
      }
    })
  return tween
}
function rotateToWorld(obj, to, time, interp) {
  if (obj == null || to == null || time == null) {
    ErrorCheckToPrint(obj, to, time)
    return null
  }
  if (interp === undefined) {
    interp = global.LSTween.interp.SLERP
  }
  var initRot = obj.getWorldRotation()
  var tween = new TWEEN.Tween({t: 0})
    .to({t: 1}, time)
    .onUpdate(function (object) {
      switch (interp) {
        case global.LSTween.interp.LERP:
          obj.setWorldRotation(quat.lerp(initRot, to, object.t))
          break
        case global.LSTween.interp.SLERP:
          obj.setWorldRotation(quat.slerp(initRot, to, object.t))
          break
        default:
          obj.setWorldRotation(quat.slerp(initRot, to, object.t))
          break
      }
    })
  return tween
}
function rotateFromToWorld(obj, from, to, time, interp) {
  if (obj == null || from == null || to == null || time == null) {
    ErrorCheckFromToPrint(obj, from, to, time)
    return null
  }
  if (interp === undefined) {
    interp = global.LSTween.interp.SLERP
  }
  var tween = new TWEEN.Tween({t: 0})
    .to({t: 1}, time)
    .onUpdate(function (object) {
      switch (interp) {
        case global.LSTween.interp.LERP:
          obj.setWorldRotation(quat.lerp(from, to, object.t))
          break
        case global.LSTween.interp.SLERP:
          obj.setWorldRotation(quat.slerp(from, to, object.t))
          break
        default:
          obj.setWorldRotation(quat.slerp(from, to, object.t))
          break
      }
    })
  return tween
}
function rotateToLocal(obj, to, time, interp) {
  if (obj == null || to == null || time == null) {
    ErrorCheckToPrint(obj, to, time)
    return null
  }
  var initRot = obj.getLocalRotation()
  if (interp === undefined) {
    interp = global.LSTween.interp.SLERP
  }
  var tween = new TWEEN.Tween({t: 0})
    .to({t: 1}, time)
    .onUpdate(function (object) {
      switch (interp) {
        case global.LSTween.interp.LERP:
          obj.setLocalRotation(quat.lerp(initRot, to, object.t))
          break
        case global.LSTween.interp.SLERP:
          obj.setLocalRotation(quat.slerp(initRot, to, object.t))
          break
        default:
          obj.setLocalRotation(quat.slerp(initRot, to, object.t))
          break
      }
    })
  return tween
}
function rotateFromToLocal(obj, from, to, time, interp) {
  if (obj == null || from == null || to == null || time == null) {
    ErrorCheckFromToPrint(obj, from, to, time)
    return null
  }
  if (interp === undefined) {
    interp = global.LSTween.interp.SLERP
  }
  var tween = new TWEEN.Tween({t: 0})
    .to({t: 1}, time)
    .onUpdate(function (object) {
      switch (interp) {
        case global.LSTween.interp.LERP:
          obj.setLocalRotation(quat.lerp(from, to, object.t))
          break
        case global.LSTween.interp.SLERP:
          obj.setLocalRotation(quat.slerp(from, to, object.t))
          break
        default:
          obj.setLocalRotation(quat.slerp(from, to, object.t))
          break
      }
    })
  return tween
}
function scale(obj, offset, time) {
  if (obj == null || offset == null || time == null) {
    ErrorCheckToPrint(obj, offset, time)
    return null
  }
  var initScale = obj.getLocalScale()
  var toScale = initScale.mult(offset)
  var tween = new TWEEN.Tween({x: initScale.x, y: initScale.y, z: initScale.z})
    .to({x: toScale.x, y: toScale.y, z: toScale.z}, time)
    .onUpdate(function (object) {
      obj.setLocalScale(new vec3(object.x, object.y, object.z))
    })
  return tween
}
function scaleToWorld(obj, to, time) {
  if (obj == null || to == null || time == null) {
    ErrorCheckToPrint(obj, to, time)
    return null
  }
  var initScale = obj.getWorldScale()
  var tween = new TWEEN.Tween({x: initScale.x, y: initScale.y, z: initScale.z})
    .to({x: to.x, y: to.y, z: to.z}, time)
    .onUpdate(function (object) {
      obj.setWorldScale(new vec3(object.x, object.y, object.z))
    })
  return tween
}
function scaleFromToWorld(obj, from, to, time) {
  if (obj == null || from == null || to == null || time == null) {
    ErrorCheckFromToPrint(obj, from, to, time)
    return null
  }
  var tween = new TWEEN.Tween({x: from.x, y: from.y, z: from.z})
    .to({x: to.x, y: to.y, z: to.z}, time)
    .onUpdate(function (object) {
      obj.setWorldScale(new vec3(object.x, object.y, object.z))
    })
  return tween
}
function scaleToLocal(obj, to, time) {
  if (obj == null || to == null || time == null) {
    ErrorCheckToPrint(obj, to, time)
    return null
  }
  var initScale = obj.getLocalScale()
  var tween = new TWEEN.Tween({x: initScale.x, y: initScale.y, z: initScale.z})
    .to({x: to.x, y: to.y, z: to.z}, time)
    .onUpdate(function (object) {
      obj.setLocalScale(new vec3(object.x, object.y, object.z))
    })
  return tween
}
function scaleFromToLocal(obj, from, to, time) {
  if (obj == null || from == null || to == null || time == null) {
    ErrorCheckFromToPrint(obj, from, to, time)
    return null
  }
  var tween = new TWEEN.Tween({x: from.x, y: from.y, z: from.z})
    .to({x: to.x, y: to.y, z: to.z}, time)
    .onUpdate(function (object) {
      obj.setLocalScale(new vec3(object.x, object.y, object.z))
    })
  return tween
}

function enableChange(obj, endValue, time) {
  var tween = new TWEEN.Tween().to(null, time).onComplete(function (object) {
    obj.enabled = endValue
  })
  return tween
}

function valueChange(obj, endValue, time) {
  var tween = new TWEEN.Tween().to(null, time).onComplete(function (object) {
    obj = endValue
  })
  return tween
}
function rawTween(time) {
  var tween = new TWEEN.Tween({t: 0}).to({t: 1}, time)
  return tween
}
function Clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}
