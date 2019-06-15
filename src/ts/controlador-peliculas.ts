/* Aquí deberás crear la clase para el controlador de películas, que se encargará de extraer datos y realizar operaciones sobre el conjunto de las películas */
import { Pelicula } from "./datos/pelicula";
import { PeliculaJSON } from "./interfaz-peliculajson";
import * as datosJSON from "./peliculas.json";

export class ControladorPeliculas {
  private peliculas: Pelicula[] = [];
  private pendientes: Pelicula[];
  private vistas: Pelicula[];

  public cargarPeliculas(): void {
    for (const data of datosJSON.peliculas) {
      const peliculaJSON: PeliculaJSON = data;
      const pelicula = new Pelicula(
        peliculaJSON.id,
        peliculaJSON.titulo,
        peliculaJSON.director,
        peliculaJSON.fecha,
        peliculaJSON.cartel,
        peliculaJSON.vista,
        peliculaJSON.formato,
        peliculaJSON.oscars,
        peliculaJSON.valoracion,
      );
      this.peliculas.push(pelicula);
    }

    this.dividirPeliculas();
  }

  private dividirPeliculas(): void {
    this.pendientes = this.peliculas.filter(pelicula => !pelicula.vista);
    this.vistas = this.peliculas.filter(pelicula => pelicula.vista);
  }

  public getListado(lasVistas: boolean): Pelicula[] {
    return lasVistas ? this.vistas : this.pendientes;
  }

  public mejorValorada(): Pelicula {
    return this.peliculas.reduce((a, b) => a.valoracion > b.valoracion ? a : b);
  }

  public masOscars(): Pelicula {
    return this.peliculas.reduce((a, b) => a.oscars > b.oscars ? a : b);
  }

  public masReciente(): Pelicula {
    return this.peliculas.reduce((a, b) => a.esPosterior(b) ? a : b);
  }

  public obtenerTodosLosDirectores(): string[] {
    return this.peliculas
      .map(pelicula => pelicula.director)
      .filter((elem, index, list) => list.indexOf(elem) === index);
  }

  public obtenerPeliculas(director: string): Pelicula[] {
    return this.peliculas.filter(pelicula => pelicula.director === director);
  }
}
