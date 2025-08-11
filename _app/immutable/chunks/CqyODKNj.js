const e=`page:
  title: Apóyanos
  monthly: Mensual
  oneTime: Una sola vez
  back: Volver a la lista
  supporters: Total de colaboradores
  intro: |
    Nuestra misión es crear **el mejor entorno de desarrollo científico de Python** que sea **potente y fácil de usar**.  
    Tus donaciones son vitales para mantener este esfuerzo y financiar las características que más te interesan. ¿Estarías dispuesto a donar hoy?

    * Todas las donaciones son administradas por [NumFOCUS](https://numfocus.org/), una organización benéfica sin ánimo de lucro.
    * Spyder es un proyecto desarrollado de forma comunitaria, sin afiliación con Anaconda u otras empresas comerciales.

  otherProjects:
    title: Otros Proyectos

projects:
  - id: 0
    title: Apoya a Spyder
    collected: Balance disponible
    separator: de
    intro: >-
      ¿Quieres apoyar el proyecto en su conjunto, con el dinero invertido en donde más se necesita? ¡Dona aquí!
    content: |
      El desarrollo y mantenimiento continuo de Spyder es posible gracias a ustedes, ¡nuestra comunidad de usuarios! Tus contribuciones a Spyder en conjunto nos han ayudado a financiar desarrolladores, estudiantes y pasantes que han contribuido mejoras críticas al proyecto, además de apoyar a miembros clave del equipo como nuestro diseñador de interfaces y web, pagar la infraestructura de nuestra página web, y financiar esfuerzos de divulgación y comunidad para asegurarnos de que estamos haciendo lo mejor posible para servirles a todos ustedes.
    button:
      text: Donar ahora
    secondaryButton:
      text: Leer más

  - id: 1
    title: Autocompletado de código más inteligente
    collected: Recaudado hasta ahora
    separator: de
    intro: >-
      El autocompletado de código en el Editor de Spyder tiene muchas posibilidades de mejora, y tenemos una idea muy clara para implementarlas. ¡Ayúdanos a realizarla!
    content: |
      El Editor de Spyder se beneficiaría enormemente de una muy necesaria revisión para proporcionar mejor autocompletado de código. Con tu apoyo podremos:

      * Actualizar nuestro [servidor de lenguaje](https://github.com/python-lsp/python-lsp-server/) y/o usar uno [más potente](https://github.com/DetachHead/basedpyright) (similar al usado por VSCode) para autocompletado.
      * Conectar el Editor a la terminal de IPython para obtener autocompletado y documentación en caso de que no estén disponibles a través del servidor de lenguaje.
    button:
      text: Donar ahora
    secondaryButton:
      text: Leer más

  - id: 2
    title: Nuevo panel de visualización
    collected: Recaudado hasta ahora
    separator: de
    intro: >-
      Actualmente librerías de visualización populares, tales como Bokeh, Plotly o Altair, solo funcionan en un entorno tipo notebook. Un nuevo panel de visualización permitiría interactuar con ellas directamente en Spyder, sin necesidad de notebooks.
    content: |
      Librerías de visualización como Bokeh, Plotly o Altair, e interfaces como IPywidgets, Panel o Dash, están diseñadas para funcionar únicamente en un entorno tipo notebook. Un nuevo panel de visualización solucionaría este problema al empaquetar las librerías de Javascript necesarias para mostrar e interactuar con ese tipo de contenido en Spyder.

      Esto mejoraría sustancialmente la experiencia de desarrollo y análisis de datos para los usuarios de Spyder, y también permitiría una adopción más amplia de esas herramientas de visualización por fuera de los límites de los notebooks de Jupyter.
    button:
      text: Donar ahora
    secondaryButton:
      text: Leer más

  - id: 3
    title: Potenciar el resaltado de sintaxis
    collected: Recaudado hasta ahora
    separator: de
    intro: >-
      Ayúdanos a implementar el resaltado de sintaxis semántico en el Editor, permitiendo que los argumentos de funciones, nombres de clases y funciones, y otros fragmentos especiales de código sean detectados y estilizados de forma diferente. Esto también llevaría a mejoras significativas en el Explorador de código de Spyder.
    content: |
      El resaltado de sintaxis semántico, es decir, la capacidad de colorear el código de acuerdo a su rol semántico, es una característica que ha sido solicitada durante largo tiempo. Agregar soporte para ello permitiría resaltar argumentos de funciones, nombres de clases y funciones, y otros constructos en colores diferentes, lo que mejoraría muchísimo la legibilidad del código.

      Además, permitiría que el Explorador de código pueda mostrar contenidos mucho más ricos y apropiados para cada archivo, facilitando así la navegación del código.

      Sin embargo, implementar esta funcionalidad no es sencillo, ya que las librerías que Spyder usa para detección y resaltado de sintaxis no se han mantenido al día con las utilizadas en otros editores. Tu apoyo nos permitiría migrar a un framework más moderno y en desarrollo activo, lo que nos llevaría a proporcionar las mismas características a las que estás acostumbrado en otros IDEs más populares.
    button:
      text: Donar ahora
    secondaryButton:
      text: Leer más

  - id: 4
    title: Elevar el nivel del Explorador de Variables
    collected: Recaudado hasta ahora
    separator: de
    intro: >-
      A través de este proyecto nos gustaría añadir soporte para visualizar objetos y tipos de datos personalizados en el Explorador de Variables sin necesidad de instalar las librerías de que dependen en el ambiente de Spyder, así como permitir que guardar y cargar sesiones sea mucho más robusto.
    content: |
      El Explorador de Variables es uno de los paneles más apreciados de Spyder. Sin embargo, para inspeccionar objetos de clases o tipos de datos personalizados, es necesario contar con las librerías que fueron usadas para crearlos en el ambiente en que Spyder está instalado. Sin embargo, esto es poco práctico, puede hacer que Spyder deje de funcionar correctamente, y está restringido por defecto en nuestros instaladores independientes.

      Nos gustaría solucionar este problema mediante el soporte de un método simplificado de representación de objetos que no esté limitado por tales restricciones. Junto a ello, también quisiéramos que guardar y cargar archivos spydata para restaurar la sesión actual sea más confiable y que funcione en una variedad más amplia de tipos de datos, al utilizar una librería más robusta para esa tarea.
    button:
      text: Donar ahora
    secondaryButton:
      text: Leer más 
`;export{e as default};
