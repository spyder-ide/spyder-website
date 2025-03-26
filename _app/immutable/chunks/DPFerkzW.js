const e=`- id: what-is-spyder-section
  title: La ventaja de Spyder
  extraContent:
    title: >-
      Obtenga la facilidad de uso de Jupyter, junto a muchas más características avanzadas
      que se encuentran en PyCharm y VSCode, en un solo entorno de programación

- id: interactive-section
  title: Programación interactiva integrada
  content:
    title: Trabaja como lo hacen los científicos
    text: >-
      <p>Los analistas de datos, científicos e ingenieros requieren mucha
      experimentación, retroalimentación rápida y ciclos de iteración
      cortos al programar. Spyder fue diseñado desde el inicio
      en torno a ese flujo de trabajo.</p>
  tabs:
    - title: Explorador de Variables
      content:
        videoCaption: Explora variables tras la ejecución
    - title: Ayuda
      content:
        videoCaption: Obtén ayuda para el código en el que estás trabajando con un solo clic
    - title: Editor
      content:
        videoCaption: Ejecuta código línea por línea o en secciones llamadas "celdas"

- id: pydata-section
  title: Perfecta integración con el ecosistema PyData
  content:
    title: Se integra muy bien con las librerías científicas más populares
    text: >-
      <p>Spyder incluye integración lista para usar con
      <a href="https://matplotlib.org/">Matplotlib</a>,
      <a href="https://pandas.pydata.org/">Pandas</a>
      y muchas otras librerías para ayudarte a trabajar más eficientemente con ellas.</p>
  tabs:
    - title: Matplotlib
      content:
        text: Examina todos tus gráficos en un solo lugar
        imgAlt: Panel de gráficos de Spyder mostrando una visualización 3D en el panel principal, con opciones en la parte superior para guardar, ampliar o eliminar imágenes, y un panel derecho con miniaturas de otros gráficos anteriores
    - title: Pandas
      content:
        text: Interactúa con el contenido de tus dataframes
        imgAlt: Explorador de Variables de Spyder mostrando un dataframe de pandas con observaciones meteorológicas, en un estilo de vista tipo "hoja de cálculo", con columnas de índice de múltiples niveles, mapas de calor por columna y opciones de barra de herramientas para mostrar y editar los datos
    - title: Numpy
      content:
        text: Explora y edita arreglos multidimensionales
        imgAlt: Explorador de Variables de Spyder mostrando un arreglo tridimensional de NumPy, en un estilo de vista tipo "hoja de cálculo", con colores de celda que forman un mapa de calor de valores y opciones para ajustar el eje y el índice del slicing del arreglo
    - title: Conda
      content:
        text: Trabaja con múltiples entornos a la vez
        imgAlt: Menú Terminales de Spyder con el submenú "Nueva terminal en entorno" seleccionado, mostrando una lista de entornos Conda por nombre, tipo y versión de Python
    - title: Sympy
      content:
        text: Visualiza expresiones simbólicas enriquecidas renderizadas con LaTeX
        imgAlt: Panel de Terminal de IPython de Spyder, mostrando líneas individuales de código construyendo expresiones de SymPy, y varias fórmulas simbólicas complejas renderizadas en línea con notación matemática enriquecida estilo publicación

- id: growth-section
  title: Preparado para llevarte al siguiente nivel
  content:
    title: Logra un mayor impacto con investigación reutilizable
    text: >-
      <p>El software que escribes es fundamental para nuevos descubrimientos científicos y soluciones de ingeniería. Spyder te ayuda a pasar de archivos individuales a módulos y paquetes estructurados y reutilizables sin perder interactividad. También incluye potentes herramientas de desarrollo de software cuando estés listo para usarlas.</p>
  tabs:
    - title: Herramientas para desarrolladores
      content:
        text: Aprovecha sugerencias y ayuda en tiempo real para mejorar tu código
        imgAlt: Panel del Editor de Spyder, con varias advertencias de análisis de código en tiempo real mostradas en diferentes líneas y el código afectado subrayado. Una advertencia seleccionada muestra su mensaje asociado, mientras que el menú Código fuente está abierto a la izquierda con la opción "Subrayar errores y advertencias" habilitada
    - title: Proyectos
      content:
        text: Cambia fácilmente entre proyectos y explora sus archivos
        imgAlt: Panel del Editor de Spyder mostrando a la izquierda el panel de Proyectos, que lista los archivos y directorios de un proyecto en un diseño tipo árbol
    - title: Análisis de código
      content:
        text: Obtén una visión más profunda sobre problemas y mejoras en tu código
        imgAlt: Panel de Análisis del Código de Spyder mostrando los resultados para un archivo, incluyendo un puntaje general y un listado de errores, advertencias, problemas de refactorización y convenciones; cada uno con un nombre, código, número de línea y mensaje
    - title: Búsqueda de código
      content:
        text: Encuentra rápidamente los usos de una variable o palabra en distintos archivos
        imgAlt: Panel de Búsqueda de Spyder, mostrando un ejemplo de búsqueda de un nombre de método, botones que activan opciones de búsqueda, un campo de exclusión con varias extensiones de archivo, un desplegable para localizar la búsqueda y un conteo/listado de resultados por archivo, incluyendo nombre, ruta, número de línea, columna y el contexto de cada resultado

- id: setup-section
  title: Sencillo proceso de instalación y actualización
  content:
    title: Instala Spyder con un solo clic y sé productivo de inmediato
    text: <p>Spyder ofrece instaladores independientes que hacen que sea lo más fácil y confiable posible iniciar con el programa y mantenerlo actualizado.</p>

- id: sponsors-section
  title: Patrocinadores
  content:
    title: Spyder es financiado gracias al generoso apoyo de
  extraContent:
    title: "y las donaciones que hemos recibido de nuestros usuarios en todo el mundo a través de Open Collective:"
  extraImageAlt: Dona a nuestro proyecto
  innerColumns:
    - imgAlt: Logo de Chan Zuckerberg Initiative
    - imgAlt: Logo de NumFocus

- id: learn-more-section
  innerColumns:
    - title: YouTube
      content: Aprende más
    - title: Documentación
      content: Lee la documentación
    - title: GitHub
      content: Explora el código fuente
    - title: Donaciones
      content: Muestra tu apoyo
`;export{e as default};
