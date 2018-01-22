export function DefaultComponent(component) {
  return function(constructor) {
    constructor.prototype.component = component;
  }
}
