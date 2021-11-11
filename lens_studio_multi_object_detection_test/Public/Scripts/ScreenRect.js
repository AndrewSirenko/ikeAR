// ScreenRect.js
// Version: 0.0.1
// Event: OnAwake
// Description: Declares screen rectangle class.


var screenRect = function(parent, source) {
    this.x = 1;
    this.y = 1;
    this.w = 1;
    this.h = 1;
    this.parent = parent;
    this.source = source;
    this.transform = null;
    this.material = null;
    this.text = null;
};


screenRect.prototype.build = function() {
    this.so = this.parent.copyWholeHierarchy(this.source);
    this.comp = this.so.getComponent("Component.Image");
    this.transform = this.so.getComponent("Component.ScreenTransform");
    var matClone = this.comp.mainMaterial.clone();
    this.comp.clearMaterials();
    this.comp.addMaterial(matClone);
    this.so.enabled = true;
    this.text = this.so.getChild(0).getComponent("Component.Text");
    this.anchor = this.so.getChild(1);
};


screenRect.prototype.resize = function(w, h) {
    this.transform.anchors.setSize(new vec2(w * 2, h * 2));
};


screenRect.prototype.setCenter = function(x, y) {
    var sx = (x * 2 - 1);
    var sy = (y * 2 - 1);
    this.transform.anchors.setCenter(new vec2(sx, sy));
};


screenRect.prototype.setAnchorPosition = function(x, y) {
    var point = this.transform.localPointToWorldPoint(new vec2(x, y));
    this.anchor.getTransform().setWorldPosition(point);
};


screenRect.prototype.setTexture = function(texture) {
    this.comp.mainMaterial.mainPass.baseTex = texture;
};


screenRect.prototype.setMaterial = function(material) {
    this.comp.clearMaterials();
    this.comp.addMaterial(material);
};


screenRect.prototype.setRotation = function(value) {
    this.transform.rotation = quat.fromEulerAngles(0, 0, value);
};


screenRect.prototype.setText = function(text) {
    this.text.text = text;
};


screenRect.prototype.destroy = function() {
    if (this.so != null) {
        this.so.destroy();
    }
};


script.api.ScreenRect = screenRect;