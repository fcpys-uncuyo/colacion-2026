# 53ª Colación · FCPyS · UNCUYO

Sitio estático de la promoción 2025–2026, listo para GitHub Pages. No requiere instalación, compilación ni servicios externos. Los nombres se buscan en el navegador y no se envían a ningún servidor.

## Estructura

- `index.html`: portada, guía y cierre.
- `styles.css`: identidad, diseño adaptable, accesibilidad e impresión.
- `app.js`: búsqueda y desplegables.
- `contenido.json`: autoridades, programación y nóminas editables.
- `identidad-colacion-53.jpeg`: imagen original suministrada, sin modificar.
- `nomina-egresades.txt`: nómina descargable con notas de extracción.

## Vista local

Ejecutar `python3 -m http.server 8765` en esta carpeta y abrir `http://localhost:8765`. La carga del JSON requiere un servidor HTTP; no abrir el HTML directamente con doble clic.

## GitHub Pages

Subir el contenido de esta carpeta a la raíz del repositorio. En **Settings → Pages**, elegir **Deploy from a branch**, rama **main**, carpeta **/ (root)**. Todas las rutas son relativas: funciona tanto en un dominio propio como bajo una ruta de proyecto. `.nojekyll` evita procesamiento adicional.

## Edición de contenidos

Modificar `contenido.json` para actualizar las nóminas o el programa. Los bloques siguen el recorrido del sitio anterior: autoridades de UNCUYO, autoridades FCPyS, programación, himno, doctorado, maestrías, especializaciones, licenciaturas, tecnicaturas y profesorados. Se agregó la Licenciatura en Producción de Medios de Comunicación, presente en el expediente actual pero ausente del índice anterior, a continuación de Gestión y Administración Universitaria. La búsqueda ignora tildes y mayúsculas. Los nombres se conservan como aparecen en el expediente, ordenados alfabéticamente dentro de cada carrera.

Actualizar también `nomina-egresades.txt` si se modifica la nómina. La fecha y el lugar se editan en `index.html` (el bloque informativo de `contenido.json` los documenta para futuras adaptaciones).

## Fuentes y revisión editorial

- Egresades: expediente **EXP-LIII COLACIÓN 2025-2026.pdf**, anexos I–V, cotejados con VI. 263 registros por carrera en 21 carreras después de eliminar una repetición de Fernandez, José Ricardo, egreso 2286. El documento declara 264 porque incluye esa repetición. No se publica el expediente completo ni notas, promedios o números de egreso.
- Nombre completo de Eduardo Javier Funes Montenegro: página 35, porque el anexo VI lo omite parcialmente.
- Navarro Robledo, Camila Erika: grafía del anexo VI, sin el espacio interno de la extracción de la tabla del anexo I.
- Identidad: JPEG original suministrado por el usuario. Fondo marfil, azul, naranja y celeste tomados como base visual. La imagen no se recorta ni se transforma.
- Estructura de referencia: https://colacionfcpys.myportfolio.com/home
- Programa: secuencia de la edición anterior, marcada visiblemente como referencia pendiente de confirmación para 2026. Se actualizaron las menciones al decanato. No se inventaron horarios.
- Fecha y sede: 27 de noviembre de 2026, Auditorio Bustelo, según la nota de elevación del expediente. Confirmar antes de difusión definitiva, ya que el expediente las eleva para aprobación.
- Autoridades UNCUYO: https://www.uncuyo.edu.ar/autoridades (consulta del 5/11/2026).
- Autoridades FCPyS: https://fcp.uncuyo.edu.ar/autoridades5091 (consulta del 5/11/2026).
- Himno: enlace a la página correspondiente del sitio anterior. No se reproduce su letra en el repositorio.

Las autoridades se actualizaron con los sitios institucionales de la gestión 2026–2030, en lugar de arrastrar la nómina 2022–2026 del sitio de referencia. Antes de difusión final, revisar títulos, integración de la mesa académica, programa y grafías dudosas del expediente (por ejemplo «GarcIa» y «Betiiana»).

## Ajuste de portada (5/11/2026)

Encabezado con el membrete institucional original, con el bloque del año oculto mediante el encuadre CSS. El archivo original se conserva intacto. Portada centrada en la identidad del 53; se retiraron el texto promocional adicional, botón, fecha y sede de la antigua columna izquierda y el símbolo junto a Promoción. La sección El acto aparece inmediatamente después de la identidad, seguida de la búsqueda y las carreras.

## Oferta de posgrado en el cierre

Se retiró el pie claro y se reemplazó el contenido del bloque azul por la oferta de posgrado, agrupada en doctorados, maestrías y especializaciones, con enlaces a las nueve fichas del sitio institucional. Fuente verificada el 5/11/2026: https://fcp.uncuyo.edu.ar/estudios/posgrados. No se anuncian inscripciones abiertas ni condiciones no verificadas.
