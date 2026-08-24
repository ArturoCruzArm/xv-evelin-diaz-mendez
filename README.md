# XV Años · Evelin Díaz Méndez

Sitio del evento: portada, **selector de fotos** con Supabase y **álbum para compartir**.

- **Evento:** sábado 29 de agosto de 2026
- **Slug Supabase:** `xv-evelin-diaz-mendez`
- **Dominio:** `evelin-diaz.invitados.org` (ver `CNAME`)
- **Cliente:** Juan de Dios Méndez

---

## Páginas

| Archivo | Qué es |
|---|---|
| `index.html` | Portada: cuenta regresiva, sección **Álbum Digital**, explicación del selector y del paquete. |
| `selector.html` | Selector completo con las 4 herramientas + botón de ayuda. |
| `album.html` | Álbum para compartir. **Con `?filtro=` es solo álbum; sin `?filtro=` muestra las herramientas.** |

### Enlaces de álbum (solo lectura, sin herramientas)

```
album.html?filtro=album        → Álbum digital
album.html?filtro=impresion    → Fotos que van a impresión 5x7
album.html?filtro=ampliacion   → La ampliación 50x60
album.html?filtro=descartada   → Las descartadas
album.html?filtro=todas        → Todas las elegidas (sin descartadas)
album.html                     → Modo completo: filtros, conteos y herramientas
```

También se acepta `?f=` como abreviatura. Un valor desconocido cae al modo completo.

El botón **🔗 Compartir Álbum** del selector genera estos enlaces y los manda por WhatsApp.

---

## Las 4 herramientas del selector

Definidas en un solo lugar: `window.HERRAMIENTAS` dentro de `js/config.js`.
De ahí se generan solas las tarjetas de conteo, los botones de filtro, los botones
del modal, los radios de "compartir" y **los textos del botón de ayuda**.

| Herramienta | Guarda en Supabase | Límite |
|---|---|---|
| 📸 Impresión (5x7) | columna `impresion` | 100 · $15 MXN por extra |
| 🖼️ Ampliación (50x60 c/marco) | columna `ampliacion` | 1 |
| 📖 Álbum Digital | `datos->>album` (jsonb) | sin límite |
| ❌ Descartar | columna `descartada` | sin límite |

**Este evento NO lleva "Invitación web"** (no contratada): la columna `invitacion`
se manda siempre en `false`.

**Regla propia de este evento:** las fotos descartadas **desaparecen del filtro
«Todas»** para que la selección avance rápido, pero siguen visibles y editables
en el filtro «Descartadas».

---

## Fotos

1. Copia las fotos a `imagenes/` (de preferencia `.webp`; ver `D:\eventos\HERRAMIENTAS_FOTOS.md`).
2. Regenera la lista:

   ```bash
   python generate_photo_list.py
   ```

3. Sube la versión del script en los HTML (`js/photos.js?v=2`, `?v=3`…) —
   Cloudflare cachea agresivamente, incluidos los 404.

El orden del arreglo `window.PHOTOS` es el **índice** que se guarda en Supabase
(`foto_index`). **Si reordenas o borras fotos del arreglo, las selecciones ya
guardadas apuntarán a otra imagen.** Para agregar fotos nuevas, añádelas al final.
`window.PHOTO_FILES` guarda el nombre original de cada archivo y se sincroniza a
`datos.filename`, así que siempre se puede reconstruir la correspondencia.

---

## Supabase

Proyecto `nzpujmlienzfetqcgsxz` (foro7-events). Tablas usadas: `eventos`,
`selecciones`, `visitas`. Toda la lectura/escritura pasa por `js/supabase-api.js`.

- Las marcas se guardan **primero en `localStorage`** y luego se sincronizan.
- Cada 30 s se relee la nube: si varias personas eligen a la vez, todas ven lo mismo.
- Sin conexión el selector sigue funcionando y avisa con una banda gris.

---

## Estructura

```
├── index.html · selector.html · album.html
├── css/  base.css · index.css · selector.css · album.css
├── js/   config.js · photos.js · supabase-api.js
│         selector.js · album.js · ayuda.js · visitas.js · foro7-footer.js
├── imagenes/            ← aquí van las fotos
├── generate_photo_list.py
├── sw.js · favicon.svg · CNAME
```

Para cambiar cualquier dato del evento (nombre, fecha, límites, paquete, teléfono)
se edita **solo `js/config.js`**.
