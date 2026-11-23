// Comportamiento del manual. Sin librerías: se abre con doble clic, sin servidor.
//
// Índice lateral:
//   - Las secciones (h2) están escritas a mano en el <nav> del HTML.
//   - Los subtemas (h3) de cada sección se agregan solos, así no hay que
//     mantenerlos en dos lugares.
//   - Al bajar, se marca la sección y el subtema que estás leyendo; lo leído
//     queda en otro tono para que se vea qué viene después.
//
// Barra de tips (derecha):
//   - Se arma sola con los <div class="tip"> del texto (cada tip se escribe una vez).
//   - Se ven todos desde el principio; se resaltan los de la sección actual.
//   - Clic en un tip → baja hasta él y el recuadro titila.
//
// Buscador (arriba del índice):
//   - Busca en títulos, en el texto y en las palabras clave escritas a mano en
//     cada <section data-claves="...">. Sin mayúsculas ni acentos.
//   - Con varias palabras, muestra lo que tenga todas.
//   - Vive en una barra fija arriba, aparte del índice y los tips. Los resultados se
//     abren como lista desplegable debajo de la caja; se cierra al elegir uno, al
//     hacer clic afuera o con Esc.

(() => {
    const indice = document.getElementById('indice');
    const lateral = document.getElementById('lateralIzq');
    const btnIndice = document.getElementById('btnIndice');
    const tipsBox = document.getElementById('tips');
    const lateralDer = document.getElementById('lateralDer');
    const btnTips = document.getElementById('btnTips');
    if (!indice) return;

    // Arma un id legible a partir del texto ("Paso 1. Entrar a Clientes" → "paso-1-entrar-a-clientes").
    const slug = (texto) => texto
        .toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    const secciones = [...document.querySelectorAll('main section[id]')];

    // 1. Agregar los subtemas (h3) debajo de cada sección del índice.
    for (const seccion of secciones) {
        const link = indice.querySelector(`a[href="#${seccion.id}"]`);
        const h3s = [...seccion.querySelectorAll('h3')];
        if (!link || h3s.length === 0) continue;

        const sub = document.createElement('ul');
        sub.className = 'indice-sub';
        for (const h3 of h3s) {
            if (!h3.id) h3.id = `${seccion.id}--${slug(h3.textContent)}`;
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${h3.id}`;
            a.textContent = h3.textContent;
            li.appendChild(a);
            sub.appendChild(li);
        }
        link.parentElement.appendChild(sub);
    }

    // 1b. Armar la barra de tips, agrupados por sección.
    const grupoDe = new Map(); // sección → grupo de la barra
    if (tipsBox) {
        let n = 0;
        for (const seccion of secciones) {
            const tips = [...seccion.querySelectorAll('.tip')];
            if (tips.length === 0) continue;

            const grupo = document.createElement('div');
            grupo.className = 'tips-grupo';
            const titulo = document.createElement('p');
            titulo.className = 'tips-seccion';
            titulo.textContent = seccion.querySelector('h2')?.textContent || '';
            grupo.appendChild(titulo);

            const lista = document.createElement('ul');
            for (const tip of tips) {
                if (!tip.id) tip.id = `tip-${++n}`;
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `#${tip.id}`;
                a.textContent = tip.textContent.replace(/\s+/g, ' ').trim();
                if (tip.classList.contains('importante')) a.classList.add('importante');
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    irA(tip);
                });
                li.appendChild(a);
                lista.appendChild(li);
            }
            grupo.appendChild(lista);
            tipsBox.appendChild(grupo);
            grupoDe.set(seccion, grupo);
        }
    }

    // Bajar hasta un elemento y hacerlo titilar para encontrarlo.
    function irA(el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (el.id) history.replaceState(null, '', `#${el.id}`);
        el.classList.remove('titila');
        void el.offsetWidth; // reinicia la animación si se hace clic dos veces
        el.classList.add('titila');
        cerrarPaneles();
    }

    // Que el elemento activo se vea dentro de su columna, si la columna tiene scroll propio.
    // Se mueve solo el scroll de la columna: scrollIntoView movería también la página.
    function mostrarEnColumna(activo, columna) {
        if (!activo || !columna || activo.offsetParent === null) return; // oculto (ej.: buscando)
        const r = activo.getBoundingClientRect();
        const rc = columna.getBoundingClientRect();
        if (r.top < rc.top + 40 || r.bottom > rc.bottom - 40) {
            columna.scrollTop += (r.top - rc.top) - rc.height / 2;
        }
    }

    // 2. Marcar dónde estás. Se toma como "actual" el último título que ya pasó
    //    la parte de arriba de la pantalla.
    const titulos = [...document.querySelectorAll('main section[id], main section h3[id]')];
    const linkDe = new Map(titulos.map(t => [t, indice.querySelector(`a[href="#${t.id}"]`)]));
    const MARGEN = 120; // px desde arriba en que un título cuenta como "llegaste"

    let pendiente = false;
    function actualizar() {
        pendiente = false;
        let actualSeccion = null;
        let actualSub = null;
        for (const t of titulos) {
            if (t.getBoundingClientRect().top - MARGEN > 0) break;
            if (t.tagName === 'SECTION') { actualSeccion = t; actualSub = null; }
            else actualSub = t;
        }
        // Al llegar al final de la página, la última sección es la actual aunque sea corta.
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
            actualSeccion = secciones[secciones.length - 1];
            actualSub = null;
        }

        let pasada = true;
        for (const seccion of secciones) {
            const link = linkDe.get(seccion);
            if (!link) continue;
            const li = link.parentElement;
            const esActual = seccion === actualSeccion;
            if (esActual) pasada = false;
            li.classList.toggle('actual', esActual);
            li.classList.toggle('leida', pasada && actualSeccion !== null);
        }
        for (const [t, link] of linkDe) {
            if (t.tagName === 'H3' && link) link.classList.toggle('actual', t === actualSub);
        }

        for (const [seccion, grupo] of grupoDe) {
            grupo.classList.toggle('actual', seccion === actualSeccion);
        }

        mostrarEnColumna(indice.querySelector('a.actual') || indice.querySelector('li.actual > a'), lateral);
        mostrarEnColumna(grupoDe.get(actualSeccion), lateralDer);
    }
    window.addEventListener('scroll', () => {
        if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); }
    }, { passive: true });
    window.addEventListener('resize', actualizar);
    actualizar();

    // 3. Botones ☰ Índice y 💡 Tips.
    //    - Pantalla grande: esconden o muestran su columna (y se recuerda para la
    //      próxima vez que abras el manual).
    //    - Pantalla chica: abren el panel por encima del texto; uno por vez.
    const paneles = [
        { btn: btnIndice, panel: lateral,    chica: matchMedia('(max-width: 1339px)'), clase: 'sin-indice', nombre: 'índice' },
        { btn: btnTips,   panel: lateralDer, chica: matchMedia('(max-width: 1339px)'), clase: 'sin-tips',   nombre: 'tips' },
    ].filter(p => p.btn && p.panel);

    const guardado = (clave) => { try { return localStorage.getItem(clave); } catch (_) { return null; } };
    const guardar = (clave, valor) => { try { localStorage.setItem(clave, valor); } catch (_) {} };

    // Botón al día: si se ve lo que controla, y qué hace al tocarlo.
    function pintarBoton(p) {
        const visible = p.chica.matches ? p.panel.classList.contains('abierto')
                                        : !document.body.classList.contains(p.clase);
        p.btn.setAttribute('aria-expanded', String(visible));
        p.btn.title = `${visible ? 'Esconder' : 'Mostrar'} ${p.nombre}`;
    }
    function cerrarPaneles() {
        for (const p of paneles) { p.panel.classList.remove('abierto'); pintarBoton(p); }
    }
    for (const p of paneles) {
        if (guardado(`manual.${p.clase}`) === '1') document.body.classList.add(p.clase);
        pintarBoton(p);
        p.chica.addEventListener('change', () => { p.panel.classList.remove('abierto'); pintarBoton(p); });
        p.btn.addEventListener('click', () => {
            if (p.chica.matches) {
                const abrir = !p.panel.classList.contains('abierto');
                cerrarPaneles();
                p.panel.classList.toggle('abierto', abrir);
            } else {
                const esconder = document.body.classList.toggle(p.clase);
                guardar(`manual.${p.clase}`, esconder ? '1' : '0');
                actualizar();   // al volver a mostrarse, que marque dónde estás
            }
            pintarBoton(p);
        });
    }
    // Al elegir un tema, se cierra solo para dejar leer.
    indice.addEventListener('click', (e) => { if (e.target.closest('a')) cerrarPaneles(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarPaneles(); });

    // 4. Buscador.
    const buscar = document.getElementById('buscar');
    const resultados = document.getElementById('resultados');
    if (!buscar || !resultados) return;

    // Pasa a minúsculas y saca acentos, recordando dónde cae cada letra en el
    // texto original (para poder resaltar la palabra encontrada).
    function normalizar(texto) {
        let n = '';
        const mapa = [];
        let i = 0;
        for (const c of texto) {
            const x = c.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
            for (let k = 0; k < x.length; k++) { n += x[k]; mapa.push(i); }
            i += c.length;
        }
        mapa.push(i);
        return { n, mapa };
    }
    const limpio = (t) => t.replace(/\s+/g, ' ').trim();

    // Armar lo que se puede encontrar: secciones (título + palabras clave),
    // subtemas (h3) y bloques de texto (párrafos, ítems, filas de tabla, tips...).
    const buscables = [];
    for (const seccion of secciones) {
        const h2 = seccion.querySelector('h2');
        const titulo = limpio(h2 ? h2.textContent : seccion.id);
        const claves = (seccion.dataset.claves || '').split(',').map(limpio).filter(Boolean);
        const sinEscribir = !!seccion.querySelector('.pendiente');
        buscables.push({
            tipo: 'seccion', el: seccion, seccion: titulo, sub: '', sinEscribir, claves,
            texto: normalizar([titulo, ...claves].join(' ')).n,
        });

        let sub = '';
        const bloques = seccion.querySelectorAll('h3, p, li, tbody tr, .tip, .aviso, figcaption');
        for (const el of bloques) {
            if (el.tagName === 'H3') {
                sub = limpio(el.textContent);
                buscables.push({ tipo: 'sub', el, seccion: titulo, sub, texto: normalizar(sub).n });
                continue;
            }
            if (el.closest('.pendiente')) continue;        // lo que falta escribir no cuenta
            if (el.querySelector('p, li, .tip')) continue;  // ya se cuentan sus partes
            const original = limpio(el.textContent);
            if (!original) continue;
            const { n, mapa } = normalizar(original);
            buscables.push({ tipo: 'texto', el, seccion: titulo, sub, original, texto: n, mapa });
        }
    }

    // Arma un elemento con el texto y las palabras encontradas en <mark>.
    function resaltar(original, normal, mapa, palabras) {
        const marcas = [];
        for (const p of palabras) {
            let i = normal.indexOf(p);
            while (i !== -1) { marcas.push([mapa[i], mapa[i + p.length]]); i = normal.indexOf(p, i + p.length); }
        }
        marcas.sort((a, b) => a[0] - b[0]);
        const frag = document.createDocumentFragment();
        let pos = 0;
        for (const [a, b] of marcas) {
            if (a < pos) continue;
            frag.append(original.slice(pos, a));
            const m = document.createElement('mark');
            m.textContent = original.slice(a, b);
            frag.append(m);
            pos = b;
        }
        frag.append(original.slice(pos));
        return frag;
    }

    // Un pedacito del texto alrededor de la primera palabra encontrada.
    function recorte(b, palabras) {
        const LARGO = 150;
        if (b.original.length <= LARGO) return resaltar(b.original, b.texto, b.mapa, palabras);
        const primera = Math.min(...palabras.map(p => b.texto.indexOf(p)).filter(i => i >= 0));
        let desde = Math.max(0, primera - 50);
        let hasta = Math.min(b.texto.length, desde + LARGO);
        const sub = normalizar(b.original.slice(b.mapa[desde], b.mapa[hasta]));
        const frag = document.createDocumentFragment();
        if (desde > 0) frag.append('…');
        frag.append(resaltar(b.original.slice(b.mapa[desde], b.mapa[hasta]), sub.n, sub.mapa, palabras));
        if (hasta < b.texto.length) frag.append('…');
        return frag;
    }

    const MAX = 25;
    function mostrar() {
        const consulta = normalizar(buscar.value).n.trim();
        const buscando = consulta.length >= 2;
        resultados.hidden = !buscando;
        resultados.replaceChildren();
        if (!buscando) return;

        const palabras = consulta.split(/\s+/);
        const hallados = buscables.filter(b => palabras.every(p => b.texto.includes(p)));
        // Primero secciones y subtemas (coinciden por título o palabra clave), después el texto.
        // Dentro de cada grupo, primero lo que tiene la frase tal cual se escribió.
        const orden = { seccion: 0, sub: 1, texto: 2 };
        const frase = palabras.join(' ');
        const tieneFrase = (x) => (x.texto.replace(/\s+/g, ' ').includes(frase) ? 0 : 1);
        hallados.sort((a, b) => orden[a.tipo] - orden[b.tipo] || tieneFrase(a) - tieneFrase(b));

        const cuenta = document.createElement('p');
        cuenta.className = 'resultados-cuenta';
        cuenta.setAttribute('role', 'status');
        cuenta.textContent = hallados.length === 0
            ? 'No encontré nada. Probá con otra palabra.'
            : hallados.length === 1 ? '1 resultado' : `${hallados.length} resultados`
              + (hallados.length > MAX ? ` (se muestran los primeros ${MAX})` : '');
        resultados.appendChild(cuenta);

        const lista = document.createElement('ul');
        for (const b of hallados.slice(0, MAX)) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = b.el.id ? `#${b.el.id}` : '#';

            const donde = document.createElement('span');
            donde.className = 'resultado-donde';
            donde.textContent = b.sub && b.tipo !== 'sub' ? `${b.seccion} › ${b.sub}` : b.seccion;
            a.appendChild(donde);

            const detalle = document.createElement('span');
            detalle.className = 'resultado-texto';
            if (b.tipo === 'seccion') {
                const usadas = b.claves.filter(c => palabras.some(p => normalizar(c).n.includes(p)));
                if (usadas.length) {
                    const t = usadas.slice(0, 4).join(', ');
                    const nt = normalizar(t);
                    detalle.append('Palabras clave: ', resaltar(t, nt.n, nt.mapa, palabras));
                }
                if (b.sinEscribir) {
                    const s = document.createElement('em');
                    s.textContent = ' (todavía sin escribir)';
                    detalle.append(s);
                }
            } else if (b.tipo === 'sub') {
                const nt = normalizar(b.sub);
                detalle.append(resaltar(b.sub, nt.n, nt.mapa, palabras));
            } else {
                detalle.append(recorte(b, palabras));
            }
            if (detalle.childNodes.length) a.appendChild(detalle);

            a.addEventListener('click', (e) => {
                e.preventDefault();
                resultados.hidden = true;   // la búsqueda queda escrita: al volver a la caja, reaparece
                irA(b.el);
            });
            li.appendChild(a);
            lista.appendChild(li);
        }
        resultados.appendChild(lista);
    }

    buscar.addEventListener('input', mostrar);
    buscar.addEventListener('focus', mostrar);   // volver a la caja muestra lo que había
    buscar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {               // Enter → va al primer resultado
            e.preventDefault();
            if (resultados.hidden) mostrar();
            resultados.querySelector('a')?.click();
        } else if (e.key === 'Escape') {
            e.preventDefault();                // que Chrome no borre la caja por su cuenta
            e.stopPropagation();
            if (!resultados.hidden) resultados.hidden = true;   // 1er Esc: cierra la lista
            else { buscar.value = ''; mostrar(); }              // 2º Esc: borra la búsqueda
        }
    });
    // Clic afuera de la barra: cierra la lista (la búsqueda queda escrita).
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#barraBusqueda')) resultados.hidden = true;
    });
})();
