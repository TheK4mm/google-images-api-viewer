Título: Informe breve del proyecto de Consumo de API de imágenes de Google con React

Autores:
Juan Camilo Vásquez Romero
Luis David Puentes González

1.	Introducción
En este proyecto desarrollamos una aplicación que permite buscar imágenes desde internet utilizando SerpAPI (Search Engine Results Page API). La idea principal fue aprender cómo conectar una aplicación hecha con React con un servidor y, a su vez, cómo ese servidor puede comunicarse con un servicio externo para traer información.
El resultado final fue una pequeña aplicación donde el usuario escribe una palabra en un buscador y automáticamente aparecen imágenes relacionadas con esa búsqueda.

2.	¿Cómo elaboramos el proyecto?
Primero preparamos el entorno de trabajo creando el proyecto en React. A partir de esa base comenzamos a organizar las carpetas y los archivos para separar bien las partes de la aplicación. Por ejemplo, se crearon componentes para la barra de búsqueda, para mostrar las imágenes y para organizar la galería.
Después trabajamos en el servidor. Este servidor funciona como un intermediario entre la aplicación y la API que permite buscar imágenes. La aplicación envía una palabra de búsqueda al servidor y el servidor se encarga de consultar la API y devolver los resultados.
Para poder utilizar la API fue necesario obtener una API Key, que es una especie de clave que permite acceder al servicio y que se obtiene desde la página oficial se SerpAPI después de registrarnos.

3.	Uso de Postman
Durante el desarrollo también utilizamos la herramienta Postman para probar si el servidor estaba funcionando correctamente. Con esta herramienta enviamos solicitudes de prueba al servidor para verificar que la API estaba respondiendo y que los datos llegaban correctamente.
Esto ayudó bastante porque permitió detectar errores antes de conectar todo con React. Por ejemplo, en un momento tuvimos un problema con la API Key y el servidor devolvía un error, pero gracias a estas pruebas fue más fácil identificar qué estaba pasando.

4.	¿Qué entendimos del proceso?
A lo largo del proyecto entendimos mejor cómo funciona la comunicación entre una aplicación web, un servidor y una API externa. Antes de este trabajo no estaba tan claro cómo una aplicación puede obtener información desde internet en tiempo real.
También se comprendió mejor la idea de dividir una aplicación en componentes dentro de React, lo cual ayuda a mantener el código más organizado y estructurado.

5.	Partes que realizamos con mayor seguridad
Una de las partes que resultó más clara fue la creación de la interfaz o proyecto en React y la organización de los componentes. Una vez entendida la estructura, fue relativamente sencillo agregar nuevos elementos.
También fue claro el proceso de mostrar los datos que llegan desde el servidor dentro de la página.

6.	Dificultades durante el proyecto
Una de las principales dificultades fue entender bien cómo conectar el servidor con la API externa. En algunos momentos aparecieron errores, por ejemplo, cuando la API Key no estaba configurada correctamente o cuando el servidor no devolvía los datos como esperábamos.
Otra dificultad fue organizar correctamente las carpetas del proyecto, ya que, si la ubicación de los archivos no coincide con las rutas que se usan en el código, la aplicación genera errores.

7.	Conclusión
Este proyecto permitió comprender mejor cómo funciona la estructura de una aplicación web moderna que utiliza React junto con un servidor. Aunque en algunos momentos surgieron dificultades, el proceso ayudó a entender cómo se conectan diferentes tecnologías para lograr que una aplicación obtenga información desde una API externa y la muestre al usuario. En general, fue una experiencia bastante útil sobre como trabajar con aplicaciones web utilizando una API.

Bibliografía
•	Documentación oficial de React. https://react.dev
•	Documentación de Node.js. https://nodejs.org
•	Documentación de Express. https://expressjs.com
•	Documentación de SerpApi. https://serpapi.com


