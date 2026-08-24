#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Regenera js/photos.js a partir de los archivos de la carpeta imagenes/.

Uso:
    python generate_photo_list.py

Orden natural (foto2 antes que foto10). Acepta .webp .jpg .jpeg .png .avif.
Se recomienda subir las fotos en .webp (~70% mas ligeras); ver
D:\\eventos\\HERRAMIENTAS_FOTOS.md para el convertidor JPEG -> WebP.
"""

import os
import re
import sys

AQUI      = os.path.dirname(os.path.abspath(__file__))
CARPETA   = os.path.join(AQUI, 'imagenes')
SALIDA    = os.path.join(AQUI, 'js', 'photos.js')
EXTS      = ('.webp', '.jpg', '.jpeg', '.png', '.avif')

CABECERA = """/* ============================================================
   LISTA DE FOTOS - XV Anos Evelin Diaz Mendez
   NO editar a mano: se regenera con  python generate_photo_list.py
   Fotos encontradas: %d
   ============================================================ */
window.PHOTOS = [
%s
];

// Nombre de archivo original de cada foto (mismo orden que PHOTOS).
// Se guarda en Supabase (datos.filename) para localizar el archivo maestro.
window.PHOTO_FILES = [
%s
];
"""


def clave_natural(nombre):
    partes = re.split(r'(\d+)', nombre.lower())
    return [int(p) if p.isdigit() else p for p in partes]


def main():
    if not os.path.isdir(CARPETA):
        print('No existe la carpeta: %s' % CARPETA)
        return 1

    archivos = [f for f in os.listdir(CARPETA)
                if f.lower().endswith(EXTS) and not f.startswith('.')]
    archivos.sort(key=clave_natural)

    if not archivos:
        print('Sin imagenes en %s (se genera lista vacia).' % CARPETA)

    rutas   = ',\n'.join('    "imagenes/%s"' % f for f in archivos)
    nombres = ',\n'.join('    "%s"' % f for f in archivos)

    with open(SALIDA, 'w', encoding='utf-8') as fh:
        fh.write(CABECERA % (len(archivos), rutas, nombres))

    print('OK  %d fotos -> %s' % (len(archivos), SALIDA))
    print('Recuerda subir la version del script en los HTML:  js/photos.js?v=N')
    return 0


if __name__ == '__main__':
    sys.exit(main())
