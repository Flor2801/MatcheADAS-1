Chicas, 

En primer lugar, quiero felicitarlas por su trabajo. Se nota que pusieron muchisimo esfuerzo y que trabajaron un monton para esta entrega. Su TP esta muy bien; el codigo es prolijo y comprensible, lleno de comentarios utiles. El diseño esta perfecto y las funcionalidades correctas. 

Su HTML está muy bien, aunque olvidaron por completo la importancia de las etiquetas semánticas en esta ocasión. Su CSS está muy completo, pero les recomiendo mejorarlo, sacandole los comentarios y esforzandose para que quede mas prolijo. Su README es correcto, aunque podria mejorar bastante para ser mas atractivo y dar mas ganas de ver su producto. 

Con respecto al producto entregado, ya dije que me encanta el diseño? Ademas de eso, como mencioné, me gusta mucho la atencion al detalle que pusieron. Que las piezas tengan una animacion al desaparecer, que el foco cambie una vez que desaperece la pieza seleccionada al hacer match, cosas asi ayudan a demostrar compromiso y hacen un producto muchisimo mas atractivo.

Con respecto al código, lo veo muy bien en general. Algo de orden vendria bien: primero poner la lista de elementos seleccionados del DOM y luego las variables es una buena idea, pero en ese caso quiero consistencia: hay muchas variables definidas en cualquier lugar. Falta algo de prolijidad en el JS, hay un console log olvidado y bastante codigo comentado tambien olvidado por ahi. Los nombres de sus variables tambien requieren mas atencion. Por ejemplo aqui, a primera vista, no tengo idea de lo que esta pasando:

```js
let items = ["🐷", "🐹", "🦊", "🐶", "🐴", "🐔", "🐷"];
let listaDeAnimales = [];
let animales = "";
```

Por que hay tres variables que parecen ser lo mismo? Solo tras sumergirme en el codigo puedo entender la necesidad de listaDeAnimales (la variable animales no se usa). Nombres claros ayudan a que el codigo sea mas legible.

Se agradecen mucho los comentarios a lo largo del codigo que ayudan a entender lo que esta pasando, y en general el codigo esta correctamente funcionalizado por lo que es facil seguir el comportamiento. El mayor problema, por supuesto, es el funcionamiento en si del juego: tal como esta no lo puedo jugar, ya que a cada rato tengo errores en la consola y elementos vacios dentro de la grilla. Los problemas tienen que ver siempre con lo mismo: la funcion de descender los elementos, que a veces no sabe bien que hacer y se traba, no reemplaza bien los elementos de la primera fila o no desciende los de filas superiores. 

Estuve pensando si dejarles la solucion pero lo cierto es que esta es la parte mas dificil del trabajo - si ven los trabajos de sus compañeras veran que muchas optaron por no incluir esta funcionalidad por los problemas que trajo - y siento que no aprenderan mucho si les dejo el codigo sin mas. Mi propuesta es, para las que quieran hacerlo, tratar de modificar el codigo para que sea jugable: no es necesario que las piezas "bajen" al encontrar un match, sino que alcanza con reemplazar las faltantes por cualquier item al azar. Esto va a simplificar bastante las funciones y les va a permitir concentrarse en un producto terminado. Solo una vez que tengan eso, podemos pensar en agregar una fucionalidad mas compleja, como lo es que las casillas "bajen". 

Lo dejo como propuesta, porque entiendo que estan con muchas cosas. Si desean que les explique mas en profundidad que es lo que falla de su codigo actualmente y como solucionarlo, feliz de hacerlo! El alma docente me obliga a proponerles la alternativa que, creo, les sera mas provechosa para aprender. 

Lo que me interesa es que dejen este codigo como un producto terminado: que quien vea esta pagina quiera jugar, y a traves de eso descubra su talento. Yo personalmente no lo necesito, ni para mi ni para juzgar su trabajo: se trabaron en una parte muy dificil, y por lo que veo no estan tan lejos de solucionar correctamente el problema. Mi pregunta ante este trabajo es "aplicaron los conocimientos vistos? aprendieron cosas nuevas?": en ambos casos la respuesta de este TP es "si". Obviamente quiero que ademas puedan mostrarle a todos este trabajo y estar orgullosas de haber hecho un juego, pero eso, en esta etapa, es un extra. 

No tengo muchisimo mas que comentar. Lo que se nota que faltó aqui es tiempo, pero me alegra ver que mas alla de eso aprendieron y lograron aplicar lo aprendido para encarar funcionalidades complejas. 

Nota final: 7

