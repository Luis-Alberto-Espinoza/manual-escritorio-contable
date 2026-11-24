// Tutoriales visuales: tareas puntuales contadas paso a paso con capturas.
//
// - Botón "🎬 Tutoriales" arriba a la derecha (al lado de 💡 Tips): abre una lista.
// - Al elegir uno se abre el visor a pantalla completa: ◀ ▶ (o flechas del teclado),
//   Esc cierra. El texto de cada paso se anuncia al lector de pantalla.
// - Cada paso = una captura + marcas (anillos) encima + una frase corta.
//   Las marcas se dibujan con CSS sobre la imagen: la captura no se retoca.
//   x / y = centro de la marca; w / h = ancho y alto del recuadro. Todo en % del
//   ancho y alto de la imagen (así sirve aunque la imagen se achique).
//   Sin w / h la marca es un anillo redondo.
// - Las capturas salen de la reserva compartida capturas/ (las mismas del manual).
//
// Para agregar un tutorial: sumar un objeto a TUTORIALES. Nada más.

const TUTORIALES = [
    {
        id: 'crear-cliente',
        titulo: 'Crear un cliente',
        pasos: [
            {
                img: 'capturas/app/inicio_ventana_chica.png',
                alt: 'Pantalla de inicio de la aplicación con el menú de arriba.',
                texto: 'En la pantalla de inicio, hacé clic en <strong>Clientes</strong>, en el menú de arriba.',
                marcas: [{ x: 36.1, y: 6.6, w: 13, h: 9.5 }]
            },
            {
                img: 'capturas/app/clientes_lista_vacia.png',
                alt: 'Pantalla Gestión de Clientes con la lista vacía.',
                texto: 'Se abre la lista de clientes. Hacé clic en el botón verde <strong>➕ Nuevo Cliente</strong>.',
                marcas: [{ x: 20.8, y: 53.6, w: 18.5, h: 7.5 }]
            },
            {
                img: 'capturas/app/clientes_formulario_arriba.png',
                alt: 'Formulario de alta: bloques Datos necesarios, Datos funcionales y Datos opcionales.',
                texto: 'Escribí el <strong>CUIT / CUIL</strong> (11 números, sin guiones) y la ' +
                       '<strong>Clave AFIP - ARCA</strong>. Si vas a usar Rentas Mendoza, también la ' +
                       '<strong>Clave ATM</strong>. Lo demás lo podés dejar como está: el nombre se completa solo.',
                marcas: [{ x: 24.5, y: 32.9, w: 25, h: 9.5 }, { x: 49.8, y: 32.9, w: 25, h: 9.5 }, { x: 75.1, y: 32.9, w: 25, h: 9.5 }]
            },
            {
                img: 'capturas/app/clientes_formulario_abajo.png',
                alt: 'Final del formulario con los botones Guardar Cliente y Cancelar.',
                texto: 'Bajá hasta el final del formulario y hacé clic en <strong>💾 Guardar Cliente</strong>.',
                marcas: [{ x: 23.6, y: 87.5, w: 25.5, h: 9 }]
            },
            {
                img: 'capturas/app/clientes_fila_verificando.png',
                alt: 'Fila del cliente nuevo en la lista, con la etiqueta Verificando.',
                texto: 'El formulario se cierra y el cliente aparece en la lista. Como cargaste clave, la ' +
                       'aplicación la prueba sola: mientras tanto la fila dice <strong>🔄 Verificando...</strong>. ' +
                       'Tarda un poco, porque entra de verdad a AFIP y ATM.',
                marcas: [{ x: 46.8, y: 25.6, w: 15.5, h: 28 }]
            },
            {
                img: 'capturas/ventanas/clientes_prueba_ok.png',
                alt: 'Cartel verde arriba de la lista: Prueba de Rivadavia, Bernardino: 2 OK, 0 con fallo.',
                texto: 'Al terminar aparece arriba el resultado. <strong>2 OK</strong> quiere decir que ' +
                       'anduvieron las dos claves, AFIP y ATM (si cargaste una sola, dice 1). El cartel no se ' +
                       'va solo: cerralo con la ✖. Si dice <strong>con fallo</strong>, mirá la ' +
                       '<a href="#validar">sección 4, Validar las credenciales</a>.',
                marcas: [{ x: 49.8, y: 15.3, w: 64, h: 26 }]
            }
        ]
    },
    {
        id: 'lanzador-atm-cliente',
        titulo: 'Abrir ATM con un cliente guardado',
        pasos: [
            {
                img: 'capturas/app/inicio_menu_atm.png',
                alt: 'Menú ATM desplegado, con la opción Lanzador.',
                texto: 'Hacé clic en <strong>ATM ▾</strong>, en el menú de arriba, y después en <strong>Lanzador</strong>.',
                marcas: [{ x: 20.7, y: 5.1, w: 10, h: 8 }, { x: 29.3, y: 21.7, w: 25, h: 7.5 }]
            },
            {
                img: 'capturas/app/lanzador_atm_lista.png',
                alt: 'Ventana Abrir sesión ATM con el buscador y la lista de clientes.',
                texto: 'Se abre la ventana <strong>🚀 Abrir sesión ATM</strong>. Buscá al cliente y hacele ' +
                       '<strong>clic: con eso alcanza</strong>, no hay que apretar ningún otro botón. Mientras ' +
                       'entra, la lista queda apagada. Esperá.',
                marcas: [{ x: 50, y: 51.4, w: 91.5, h: 10.5 }]
            },
            {
                img: 'capturas/atm/mis_tramites.png',
                alt: 'Página Mis Trámites de ATM, con el nombre y el CUIT del cliente arriba.',
                texto: 'Se abre el navegador, la aplicación pone el CUIT y la clave, y quedás adentro de ' +
                       '<strong>Mis Trámites</strong> de ATM. Fijate arriba que sea el cliente que querías. ' +
                       'Desde acá trabajás a mano, y al terminar cerrás el navegador.',
                marcas: [{ x: 23.5, y: 25.5, w: 46, h: 18 }]
            },
            {
                img: 'capturas/app/lanzador_atm_sesion_abierta.png',
                alt: 'Lista del lanzador: la fila de Rivadavia, Bernardino dice Sesión abierta.',
                texto: 'En la aplicación, la fila del cliente dice <strong>Sesión abierta</strong>. La lista ' +
                       'queda lista para abrir otro cliente. Si no pudo entrar, en la fila aparece el motivo ' +
                       'y el botón <strong>🔑 Clave</strong> para corregirla ahí mismo.',
                marcas: [{ x: 33.4, y: 49.9, w: 13, h: 5.5 }]
            }
        ]
    },
    {
        id: 'apremios',
        titulo: 'Consultar apremios en ATM',
        pasos: [
            {
                img: 'capturas/app/inicio_menu_atm.png',
                alt: 'Menú ATM desplegado, con la opción Apremios al final.',
                texto: 'Hacé clic en <strong>ATM ▾</strong>, en el menú de arriba, y después en <strong>Apremios</strong>.',
                marcas: [{ x: 20.7, y: 5.1, w: 10, h: 8 }, { x: 29.3, y: 58.9, w: 25, h: 7.5 }]
            },
            {
                img: 'capturas/app/apremios_paso_clientes.png',
                alt: 'Lista de clientes con Rivadavia y Urquiza elegidos, con un tilde a la izquierda.',
                texto: 'Se abre <strong>Servicios de ATM</strong>. Bajá hasta la lista de clientes y hacé clic en ' +
                       'los que quieras consultar: uno o varios. Los elegidos quedan con un tilde.',
                marcas: [{ x: 50, y: 50.6, w: 92.5, h: 19.4 }]
            },
            {
                img: 'capturas/app/apremios_paso_sin_impuestos.png',
                alt: 'Tabla Impuestos a consultar por cliente sin ninguna casilla tildada y los nombres en rojo.',
                texto: 'Más abajo está <strong>Impuestos a consultar por cliente</strong>. Cada cliente arranca ' +
                       'sin ninguno marcado, y <strong>su nombre se ve en rojo</strong> hasta que le marques uno.',
                marcas: [{ x: 17, y: 59, w: 23, h: 10 }]
            },
            {
                img: 'capturas/app/apremios_paso_impuestos.png',
                alt: 'La misma tabla con impuestos tildados para los dos clientes y el botón Procesar Apremios (2).',
                texto: 'Marcá los impuestos de cada cliente (<strong>Todos</strong> marca los cinco). Después hacé ' +
                       'clic en <strong>Procesar Apremios</strong>; el número es la cantidad de clientes.',
                marcas: [{ x: 61.5, y: 59, w: 65, h: 10 }, { x: 82.6, y: 83, w: 23, h: 9 }]
            },
            {
                img: 'capturas/ventanas/apremios_paso_confirmacion.png',
                alt: 'Ventana Apremios con los dos clientes, sus impuestos y los botones Cancelar e Iniciar.',
                texto: 'Antes de arrancar te muestra cada cliente con sus impuestos. Si está bien, hacé clic en ' +
                       '<strong>Iniciar</strong>.',
                marcas: [{ x: 69.5, y: 71.1, w: 13.5, h: 9 }]
            },
            {
                img: 'capturas/ventanas/apremios_paso_trabajando.png',
                alt: 'Cartel ATM Apremios, 1 de 2, con el cliente y el mensaje Consultando Ingresos Brutos.',
                texto: 'La aplicación entra sola a ATM. El cartel de abajo dice qué cliente está haciendo y ' +
                       'cuántos van. <strong>Esperá</strong>: no hay que hacer nada. Solo consulta, no paga ni ' +
                       'cambia nada.',
                marcas: [{ x: 50, y: 86.8, w: 55, h: 22 }]
            },
            {
                img: 'capturas/app/apremios_paso_resultado.png',
                alt: 'Finalizados: Rivadavia con Éxito, una línea por impuesto, el Excel y el botón Abrir.',
                texto: 'Cada cliente pasa a <strong>Finalizados</strong>, con una línea por impuesto: en naranja, ' +
                       'los que tienen saldo. Con <strong>Abrir</strong> ves el Excel con el detalle. ' +
                       'Si algo falló, mirá la <a href="#apremios">sección 10, ATM: Apremios</a>.',
                marcas: [{ x: 24.5, y: 35.8, w: 38, h: 9 }, { x: 88.2, y: 46.8, w: 9, h: 7.5 }]
            }
        ]
    }
];

(() => {
    const btn = document.getElementById('btnTutoriales');
    const lista = document.getElementById('listaTutoriales');
    if (!btn || !lista) return;

    // 1. La lista desplegable.
    lista.innerHTML = '<ul>' + TUTORIALES.map(t =>
        `<li><button type="button" data-tuto="${t.id}">${t.titulo}` +
        `<span class="tuto-cuantos">${t.pasos.length} pasos</span></button></li>`
    ).join('') + '</ul>';

    const abrirLista = (abrir) => {
        lista.hidden = !abrir;
        btn.setAttribute('aria-expanded', String(abrir));
    };
    btn.addEventListener('click', (e) => { e.stopPropagation(); abrirLista(lista.hidden); });
    document.addEventListener('click', (e) => {
        if (!lista.hidden && !lista.contains(e.target)) abrirLista(false);
    });
    lista.addEventListener('click', (e) => {
        const b = e.target.closest('[data-tuto]');
        if (!b) return;
        abrirLista(false);
        abrirVisor(TUTORIALES.find(t => t.id === b.dataset.tuto));
    });

    // 2. El visor (se arma una sola vez y se reusa).
    const visor = document.createElement('div');
    visor.className = 'visor';
    visor.hidden = true;
    visor.setAttribute('role', 'dialog');
    visor.setAttribute('aria-modal', 'true');
    visor.setAttribute('aria-labelledby', 'visorTitulo');
    visor.innerHTML = `
        <div class="visor-cabecera">
            <h2 id="visorTitulo" class="visor-titulo"></h2>
            <span class="visor-cuenta" id="visorCuenta"></span>
            <button type="button" class="visor-cerrar" id="visorCerrar">✕ Cerrar</button>
        </div>
        <div class="visor-marco">
            <div class="visor-imagen" id="visorImagen"></div>
        </div>
        <p class="visor-texto" id="visorTexto" aria-live="polite"></p>
        <div class="visor-pie">
            <button type="button" class="visor-btn" id="visorAnterior">◀ Anterior</button>
            <div class="visor-puntos" id="visorPuntos"></div>
            <button type="button" class="visor-btn visor-btn-principal" id="visorSiguiente">Siguiente ▶</button>
        </div>`;
    document.body.appendChild(visor);

    const $ = (id) => document.getElementById(id);
    let tuto = null;
    let paso = 0;

    // La imagen no puede pasar el alto del marco (lo que queda entre la cabecera y
    // el texto). Con CSS solo no se puede: el envoltorio mide lo que la imagen.
    const ajustarAlto = () => {
        const img = visor.querySelector('.visor-imagen img');
        const marco = visor.querySelector('.visor-marco');
        if (img && marco) img.style.maxHeight = (marco.clientHeight - 4) + 'px';
    };
    window.addEventListener('resize', () => { if (!visor.hidden) ajustarAlto(); });

    function mostrarPaso(n) {
        paso = Math.max(0, Math.min(n, tuto.pasos.length - 1));
        const p = tuto.pasos[paso];
        const total = tuto.pasos.length;
        $('visorImagen').innerHTML =
            `<img src="${p.img}" alt="${p.alt}">` +
            (p.marcas || []).map(m =>
                `<span class="visor-marca${m.w ? ' recuadro' : ''}" style="` +
                (m.w ? `left:${m.x - m.w / 2}%;top:${m.y - m.h / 2}%;width:${m.w}%;height:${m.h}%`
                     : `left:${m.x}%;top:${m.y}%`) + `" aria-hidden="true"></span>`
            ).join('');
        $('visorCuenta').textContent = `Paso ${paso + 1} de ${total}`;
        $('visorTexto').innerHTML = `<strong class="visor-num">${paso + 1}.</strong> ${p.texto}`;
        ajustarAlto();
        $('visorAnterior').disabled = paso === 0;
        $('visorSiguiente').textContent = paso === total - 1 ? '✔ Terminar' : 'Siguiente ▶';
        $('visorPuntos').innerHTML = tuto.pasos.map((_, i) =>
            `<button type="button" class="visor-punto${i === paso ? ' actual' : ''}" data-paso="${i}" ` +
            `aria-label="Ir al paso ${i + 1}"${i === paso ? ' aria-current="step"' : ''}></button>`
        ).join('');
    }

    function abrirVisor(t) {
        if (!t) return;
        tuto = t;
        $('visorTitulo').textContent = `🎬 ${t.titulo}`;
        visor.hidden = false;
        document.body.classList.add('con-visor');
        mostrarPaso(0);
        $('visorSiguiente').focus();
    }

    function cerrarVisor() {
        visor.hidden = true;
        document.body.classList.remove('con-visor');
        btn.focus();
    }

    $('visorCerrar').addEventListener('click', cerrarVisor);
    $('visorAnterior').addEventListener('click', () => mostrarPaso(paso - 1));
    $('visorSiguiente').addEventListener('click', () => {
        if (paso === tuto.pasos.length - 1) cerrarVisor();
        else mostrarPaso(paso + 1);
    });
    $('visorPuntos').addEventListener('click', (e) => {
        const b = e.target.closest('[data-paso]');
        if (b) mostrarPaso(Number(b.dataset.paso));
    });
    // Un link dentro del texto (ej. "sección 4") cierra el visor y lleva ahí.
    $('visorTexto').addEventListener('click', (e) => {
        if (e.target.closest('a')) cerrarVisor();
    });

    document.addEventListener('keydown', (e) => {
        if (visor.hidden) {
            if (e.key === 'Escape' && !lista.hidden) abrirLista(false);
            return;
        }
        if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); cerrarVisor(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); mostrarPaso(paso + 1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); mostrarPaso(paso - 1); }
    }, true);
})();
