/* Aquí deberás crear la clase para instanciar cada una de las películas */
import * as moment from "moment";
import { Formato } from "../enum-formato";
import { Fecha } from "../tipo-fecha";
import { Valoracion } from "../tipo-valoracion";

export class Pelicula {
  private privateFecha: Fecha;
  public formato: Formato;
  public valoracion: Valoracion = null;

  constructor(
    public id: number,
    public titulo: string,
    public director: string,
    fecha: string,
    public cartel: string,
    public vista: boolean,
    formato: string,
    public oscars: number,
    valoracion: number,
  ) {
    this.privateFecha = moment(fecha, "DD-MM-YYYY");
    this.formato = Formato[formato];
    if (valoracion >= 1 && valoracion <= 5) {
      this.valoracion = valoracion as Valoracion;
    }
  }

  get fecha(): Fecha {
    return this.privateFecha;
  }

  set fecha(fecha: Fecha) {
    this.privateFecha = fecha;
  }

  public formatoString(): string {
    return Formato[this.formato];
  }

  public year(): string {
    return this.privateFecha.year().toString();
  }

  public esPosterior(otra: Pelicula): boolean {
    return this.privateFecha.isAfter(otra.privateFecha);
  }
}
