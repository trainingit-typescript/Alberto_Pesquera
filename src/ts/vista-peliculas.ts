/* Aquí deberás crear la clase para el controlador de la vista, que será el que se comunique directamente con el HTML */
import { ControladorPeliculas } from "./controlador-peliculas";
import { Formato } from "./enum-formato";
import { Pelicula } from "./datos/pelicula";

export class VistaPeliculas {
  private controlador: ControladorPeliculas;

  private listaPendientes: HTMLUListElement;
  private listaVistas: HTMLUListElement;

  private basePelicula: HTMLLIElement;
  private baseDirector: HTMLLIElement;
  private basePeliculaDirector: HTMLLIElement;

  constructor(controlador: ControladorPeliculas) {
    this.controlador = controlador;

    this.cargarDOM();

    this.pintarLista(true);
    this.pintarLista(false);

    this.actualizarCabecera(true);
    this.actualizarCabecera(false);

    this.pintarEstadisticas();

    this.pintarDirectores();
  }

  private cargarDOM(): void {
    this.listaPendientes = document.querySelector(".js-lista-pendientes");
    this.listaVistas = document.querySelector(".js-lista-vistas");

    this.basePelicula = document.querySelector(".js-pelicula-base");
    this.baseDirector = document.querySelector(".js-director-base").cloneNode(true) as HTMLLIElement;
    this.basePeliculaDirector = document.querySelector(".js-pelicula-director-base").cloneNode(true) as HTMLLIElement;
  }

  private limpiarLista(borrarVistas: boolean): void {
    const elemPadre = borrarVistas ? this.listaVistas : this.listaPendientes;
    const paraBorrar = elemPadre.querySelectorAll<HTMLLIElement>(".js-pelicula");
    paraBorrar.forEach(elem => elem.remove());
  }

  private pintarLista(lasVistas: boolean): void {
    this.limpiarLista(lasVistas);

    const elemPadre = lasVistas ? this.listaVistas : this.listaPendientes;
    this.controlador.getListado(lasVistas)
      .map(pelicula => {
        const nodo = this.basePelicula.cloneNode(true) as HTMLLIElement;
        elemPadre.appendChild(nodo);

        const imagen = nodo.querySelector(".js-cartel") as HTMLImageElement;
        imagen.src = pelicula.cartel;
        imagen.alt = `Cartel de la película ${pelicula.titulo}`;
        imagen.title = pelicula.titulo;

        // public id: number;
        nodo.querySelector(".js-titulo").textContent = pelicula.titulo;
        nodo.querySelector(".js-director").textContent = pelicula.director;
        nodo.querySelector(".js-anyo").textContent = pelicula.year();

        if (!pelicula.oscars) {
          nodo.querySelector(".js-oscars").remove();
        }

        nodo.querySelector(`.js-formato-${Formato[pelicula.formato].toLowerCase()}`).classList.remove('hide');

        const valoracion = nodo.querySelector(".js-valoracion") as HTMLUListElement;
        valoracion.dataset.puntos = lasVistas ? pelicula.valoracion.toString() : "";
        for (let i = 1; i <= 5; i++) {
          const estrella = nodo.querySelector(`.js-valoracion-${i}`);
          estrella.classList.remove("glyphicon-star", "glyphicon-star-empty");
          if (lasVistas && pelicula.valoracion !== null && i <= pelicula.valoracion) {
            estrella.classList.add("glyphicon-star");
          } else {
            estrella.classList.add("glyphicon-star-empty");
          }
        }
      });
  }

  private actualizarCabecera(lasVistas: boolean): void {
    const className: string = lasVistas ? ".js-n-peliculas-vistas" : ".js-n-peliculas-pendientes";
    document.querySelector(className).textContent = this.controlador.getListado(lasVistas).length.toString();
  }

  private pintarEstadisticas(): void {
    const mejorValorada = this.controlador.mejorValorada();
    const elemMejorValorada = document.querySelector(".js-mejor-valorada");
    (elemMejorValorada.querySelector(".js-cartel") as HTMLImageElement).src = mejorValorada.cartel;
    elemMejorValorada.querySelector(".js-titulo").textContent = mejorValorada.titulo;

    const masOscars = this.controlador.masOscars();
    const elemMasOscars = document.querySelector(".js-mas-oscars");
    (elemMasOscars.querySelector(".js-cartel") as HTMLImageElement).src = masOscars.cartel;
    elemMasOscars.querySelector(".js-titulo").textContent = masOscars.titulo;

    const masReciente = this.controlador.masReciente();
    const elemMasReciente = document.querySelector(".js-mas-reciente");
    (elemMasReciente.querySelector(".js-cartel") as HTMLImageElement).src = masReciente.cartel;
    elemMasReciente.querySelector(".js-titulo").textContent = masReciente.titulo;
  }

  private limpiarDirectores(): void {
    const nodoPadre = document.querySelector(".js-lista-directores");
    while (nodoPadre.firstChild) {
      nodoPadre.removeChild(nodoPadre.firstChild);
    }
  }

  private pintarDirectores(): void {
    this.limpiarDirectores();
    const listaDirectores = document.querySelector(".js-lista-directores");
    const directores: string[] = this.controlador.obtenerTodosLosDirectores();
    directores.map(director => {
      const elemDirector = this.baseDirector.cloneNode(true) as HTMLLIElement;
      listaDirectores.appendChild(elemDirector);

      elemDirector.querySelector(".js-director").textContent = director;

      elemDirector.querySelectorAll(".js-lista-peliculas-directores > li")
        .forEach(elem => elem.remove());

      const peliculas = this.controlador.obtenerPeliculas(director);
      const elemLista = elemDirector.querySelector(".js-lista-peliculas-directores") as HTMLUListElement;
      peliculas.map(pelicula => {
        const elemPelicula = this.basePeliculaDirector.cloneNode(true) as HTMLLIElement;
        elemLista.appendChild(elemPelicula);

        elemPelicula.querySelector(".js-titulo").textContent = pelicula.titulo;
        elemPelicula.querySelector(".js-anyo").textContent = pelicula.year();
      });
    });
  }
}
