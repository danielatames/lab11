## Laboratorio 11 — Preguntas teóricas

### 1. ¿Por qué usar FormArray en vez de 10 campos fijos ocultos?

Con 10 campos fijos ocultos el formulario tiene un límite, carga campos que no se usan y obliga a repetir el mismo código 10 veces. Si se quiere agregar un campo nuevo, hay que cambiarlo en 10 lugares.

Con FormArray los paquetes se agregan o quitan según se necesiten, con un botón:
- Mejor experiencia para el usuario: solo ve los campos que de verdad está usando, sin límites ni espacios vacíos.
- Validación automática: cada paquete se valida solo, y el formulario completo sabe si todo está correcto.


### 2. ¿Cuál es la diferencia entre el validador de fechas y el de tracking?

JavaScript hace una sola cosa a la vez. Las tareas que tardan, como esperar una respuesta de internet, se dejan en espera para que la página no se congele mientras tanto.

- Validador de fechas (síncrono):solo compara dos fechas que ya están en el formulario. La respuesta es inmediata, así que el error aparece al instante.
- Validador de tracking (asíncrono): tiene que preguntarle al servidor si el número ya existe, y esa respuesta tarda. Mientras tanto, el campo queda en estado "pendiente" ("Verificando disponibilidad…"), el usuario puede seguir escribiendo y la página no se congela. Cuando llega la respuesta, el campo se marca como válido o con error.

¿Por qué Angular pide un Observable o una Promise? 
Porque la respuesta del servidor todavía no existe cuando la función termina. Un Observable es como una promesa de que la respuesta va a llegar, Angular espera ese resultado sin bloquear la página. 