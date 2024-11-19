export class AnimationManager {
  constructor(fps = 60) {
    this.fps = fps;
    this.interval = 1000 / fps;
    this.lastTime = 0;
    this.callbacks = new Set(); // Usamos un Set para evitar duplicados y tener una lista de funciones a ejecutar
    this.animate = this.animate.bind(this);
    this.isRunning = false;
  }

  /**
   * Añade la funcion callback al conjunto de animaciones que se reproduciran
   * en el Animation Manager.
   * @param {*} callback 
   */
  add(callback) {
    this.callbacks.add(callback);
  }

  /**
   * Elimina la funcion callback del conjunto de animaciones que se reproduciran
   * en el Animation Manager.
   * @param {*} callback 
   */
  remove(callback) {
    this.callbacks.delete(callback);
  }

  /** 
   * Inicia las animaciones, llamando al requestAnimationFrame por cada 
   */
  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      requestAnimationFrame(this.animate);
    }
  }

  /** 
   * Para las animaciones
   */
  stop() {
    this.isRunning = false;
  }

  /**
   * Función que gestiona las animaciones, ajustando la ejecución a un tiempo delta,
   * definidio por el intervalo de tiempo, si por ejemplo son 60fps, se ejecutarán
   * todas las animaciones 60 veces por segundo.
   * @param {*} currentTime 
   * @returns 
   */
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