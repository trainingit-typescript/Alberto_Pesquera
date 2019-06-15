/* Éste es el archivo de entrada y el que arrancará tu aplicación, desde aquí instanciarás el controlador de películas y el controlador de la vista */

import { ControladorPeliculas } from "./controlador-peliculas";
import { VistaPeliculas } from "./vista-peliculas";

const controladorPeliculas = new ControladorPeliculas();
controladorPeliculas.cargarPeliculas();

const vistaPeliculas = new VistaPeliculas(controladorPeliculas);
