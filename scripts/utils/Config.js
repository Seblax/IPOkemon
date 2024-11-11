/**
 * La clase `Config` actúa como un contenedor centralizado para almacenar variables de configuración
 * estáticas e inmutables que se utilizan a lo largo de la aplicación web.
 * Estas configuraciones proporcionan información como las dimensiones de la pantalla y las posiciones de la UI
 * tanto para los elementos enemigos como para los aliados.
 *
 * Las propiedades estáticas permiten que estos valores sean accesibles de manera global sin necesidad
 * de instanciar la clase.
 */
export class Config {
  // Configuración de la pantalla principal, utilizada para establecer el ancho y alto del área de juego.
  static screen = {
    width: 256, // Ancho de la pantalla en píxeles.
    height: 152, // Alto de la pantalla en píxeles.
  };

  // Configuración de la interfaz de usuario para elementos enemigos, especificando sus dimensiones.
  static EnemyUI = {
    width: 0, // Ancho de la UI enemiga (se puede modificar si se necesitan más propiedades en el futuro).
    height: 16, // Altura de la UI enemiga.
  };

  // Configuración de la interfaz de usuario para elementos aliados, calculada en función de la pantalla.
  static AllayUI = {
    width: Config.screen.width - 120, // Ancho de la UI aliada, restando un margen desde el borde derecho.
    height: Config.screen.height - 55, // Altura de la UI aliada, restando un margen desde el borde inferior.
  };

  static EnemyPokemonPosition = {
    x: Config.screen.width - 112,
    y: Config.screen.height - 164,
  };

  static AllayPokemonPosition = {
    x: Config.screen.width - 250,
    y: Config.screen.height - 70,
  };

  static MovesSetUI = {
    Move1: {
      x: 2,
      y: 5,
    },
    Move2: {
      x: 130,
      y: 5,
    },
    Move3: {
      x: 2,
      y: 5 + 55 + 7,
    },
    Move4: {
      x: 2 + 124 + 4,
      y: 5 + 55 + 7,
    },
    PP: {
      name: {
        x: 50,
      },
      x: 94,
      y: 20,
    },
    name: {
      x: 10,
      y: 4,
    },
  };

  // Configuración de los fondos y elementos de los campos de batalla, calculada en función de la pantalla.
  static Background = {
    numBackgrounds: 34,
    AllayBase: {
      x: -64,
      y: Config.screen.height - 32,
    },
    EnemyBase: {
      x: Config.screen.width - 126,
      y: 64,
    },
  };
}
