/* ============================================================
   CONFIG ÚNICA DEL EVENTO — XV Años Evelin Díaz Méndez
   Cambiar SOLO aquí. Todas las páginas leen de window.EVENT_CONFIG.
   ============================================================ */
window.EVENT_CONFIG = {
    // ── Identidad ─────────────────────────────────────────────
    slug:        'xv-evelin-diaz-mendez',
    nombre:      'Evelin Díaz Méndez',
    nombreCorto: 'Evelin',
    tipo:        'XV Años',

    // ── Fecha (mes en base 0: 7 = agosto) ─────────────────────
    fechaEvento: new Date(2026, 7, 29, 18, 0, 0),
    fechaTexto:  'Sábado 29 de agosto de 2026',

    // ── Contacto ──────────────────────────────────────────────
    telefono:      '524779203776',          // WhatsApp FORO 7
    contactoTitular: 'Juan de Dios Méndez',

    // ── Paquete contratado ────────────────────────────────────
    // Base remisión 10/abr/2026 ($5,000) + mejora de paquete.
    // Si la mejora NO se concreta, cambiar limiteImpresion a 50
    // y ampliacionMedida a '11x14 pulgadas'.
    paquete: {
        nombre:            'Paquete Foto y Video $6,500 (mejorado)',
        fotosImpresas:     100,
        medidaImpresion:   '5x7 pulgadas',
        ampliaciones:      1,
        ampliacionMedida:  '50x60 cm con marco',
        videoHoras:        '2 hrs + ½ hora extra',
        incluye: [
            '100 fotos del evento impresas en 5x7 pulgadas',
            '1 película USB editada, musicalizada y titulada',
            '1 videoclip para proyectar en el salón (sesión previa)',
            '1 caja impresa para la USB',
            '1 foto ampliada 50x60 cm con marco',
            '1 caja impresa para las fotografías',
            '1 sesión fotográfica previa al evento',
            '½ hora extra de video'
        ]
    },

    // ── Límites del selector ──────────────────────────────────
    limiteImpresion:    100,
    limiteAmpliacion:   1,
    limiteAlbum:        null,   // null = sin límite
    costoFotoAdicional: 15,     // MXN por foto impresa extra

    // ── Supabase ──────────────────────────────────────────────
    supabaseUrl:  'https://nzpujmlienzfetqcgsxz.supabase.co',
    supabaseAnon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56cHVqbWxpZW56ZmV0cWNnc3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2ODYzMzYsImV4cCI6MjA5MDI2MjMzNn0.xl3lsb-KYj5tVLKTnzpbsdEGoV9ySnswH4eyRuyEH1s'
};

/* ============================================================
   HERRAMIENTAS DEL SELECTOR
   Este arreglo define TODO: tarjetas de conteo, botones de
   filtro, botones del modal, colores, textos de ayuda y los
   filtros válidos de album.html?filtro=…
   Evelin NO lleva "Invitación web" (no contratada).
   ============================================================ */
(function (C) {
window.HERRAMIENTAS = [
    {
        id:      'impresion',
        icono:   '📸',
        nombre:  'Impresión',
        textoBtn:'Impresión (' + C.paquete.medidaImpresion.replace(' pulgadas', '') + ')',
        limite:  C.limiteImpresion,
        columna: 'impresion',      // columna booleana en Supabase
        ayuda:   'Marca las fotos que quieres <strong>impresas en papel tamaño ' + C.paquete.medidaImpresion +
                 '</strong>. Tu paquete incluye ' + C.limiteImpresion + '. Si marcas más, abajo aparece un aviso naranja ' +
                 'con el costo extra ($' + C.costoFotoAdicional + ' MXN por foto adicional). Estas son las fotos que ' +
                 'recibes físicas en tu caja impresa.'
    },
    {
        id:      'ampliacion',
        icono:   '🖼️',
        nombre:  'Ampliación',
        textoBtn:'Ampliación (' + C.paquete.ampliacionMedida.replace(' con marco', '') + ')',
        limite:  C.limiteAmpliacion,
        columna: 'ampliacion',
        ayuda:   'La foto <strong>grande de exhibición, ' + C.paquete.ampliacionMedida + '</strong>. Tu paquete incluye ' +
                 C.limiteAmpliacion + '. Elige la que quieras ver colgada en la pared: conviene una vertical, bien ' +
                 'enfocada y con buena luz. Si marcas más de una, te avisamos para cotizarlas aparte.'
    },
    {
        id:      'album',
        icono:   '📖',
        nombre:  'Álbum Digital',
        textoBtn:'Álbum Digital',
        limite:  null,
        columna: 'datos.album',    // se guarda dentro del jsonb "datos"
        ayuda:   'Las fotos que quieres en tu <strong>álbum digital</strong>: la galería en línea que puedes compartir por WhatsApp con familia y amigos, y de donde sale el videoclip que se proyecta en el salón. No tiene límite y no cuesta extra. Marca aquí tus favoritas aunque ya las hayas marcado para impresión.'
    },
    {
        id:      'descartada',
        icono:   '❌',
        nombre:  'Descartadas',
        textoBtn:'Descartar',
        limite:  null,
        columna: 'descartada',
        ayuda:   'Fotos que <strong>no quieres</strong> (saliste parpadeando, movida, repetida…). Al descartarlas <strong>desaparecen de la vista general</strong> para que no estorben mientras eliges. No se borran: siempre puedes verlas en el filtro «Descartadas» y quitarles la marca si te arrepientes.'
    }
];
})(window.EVENT_CONFIG);
