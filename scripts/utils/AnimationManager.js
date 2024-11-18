export class AnimationManager {
    constructor(fps = 60) {
      this.fps = fps;
      this.interval = 1000 / fps;
      this.lastTime = 0;
      this.callbacks = new Set(); // Usamos un Set para evitar duplicados y tener una lista de funciones a ejecutar
      this.animate = this.animate.bind(this);
      this.isRunning = false;
    }
  
    add(callback) {
      this.callbacks.add(callback);
    }
  
    remove(callback) {
      this.callbacks.delete(callback);
    }
  
    start() {
      if (!this.isRunning) {
        this.isRunning = true;
        requestAnimationFrame(this.animate);
      }
    }
  
    stop() {
      this.isRunning = false;
    }
  
    animate(currentTime) {
      if (!this.isRunning) return;
  
      requestAnimationFrame(this.animate);
  
      const deltaTime = currentTime - this.lastTime;
      if (deltaTime >= this.interval) {
        this.lastTime = currentTime - (deltaTime % this.interval);
  
        // Ejecutar todos los callbacks de actualización
        for (const callback of this.callbacks) {
          callback(deltaTime);
        }
      }
    }
  }