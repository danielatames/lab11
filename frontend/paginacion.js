let paginaActual = 0;
let totalPaginas = 1;

async function inicializarVistaPaginada() {
    const token = sessionStorage.getItem('jwt_token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const username = sessionStorage.getItem('jwt_username');
    document.getElementById('nombreUsuario').textContent = ` ${username}`;

    await cargarPagina(0);
}

async function cargarPagina(numeroPagina) {
    paginaActual = numeroPagina;

    const busqueda = document.getElementById('inputBusqueda').value.trim();
    const estado = document.getElementById('selectEstado').value;
    const tamano = document.getElementById('selectTamanoPagina').value;

    const params = new URLSearchParams({
        page: paginaActual,
        size: tamano,
        sortBy: 'fechaCreacion',
        direction: 'DESC'
    });

    if (busqueda) params.append('busqueda', busqueda);
    if (estado) params.append('estado', estado);

    try {
        const respuesta = await fetchWithAuth(`${API_URL_BASE}/api/v1/envios?${params.toString()}`);

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            mostrarErrorPaginado(errorData);
            return;
        }

        const pagina = await respuesta.json();
        renderizarTabla(pagina.content);
        actualizarControlesPaginacion(pagina);
        document.getElementById('alertaErroresPaginado').hidden = true;

    } catch (error) {
        console.error('Error al cargar página:', error);
    }
}

async function cargarViaStoredProcedure() {
    const estado = document.getElementById('selectEstado').value;

    if (!estado) {
        alert('Seleccioná un estado para usar el Stored Procedure');
        return;
    }

    try {
        const respuesta = await fetchWithAuth(`${API_URL_BASE}/api/v1/envios/procedimiento/${estado}`);

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            mostrarErrorPaginado(errorData);
            return;
        }

        const envios = await respuesta.json();
        renderizarTabla(envios);

        document.getElementById('infoPagina').textContent = `${envios.length} resultado(s) vía Stored Procedure`;
        deshabilitarBotonesPaginacion(true);

    } catch (error) {
        console.error('Error al consultar el procedimiento:', error);
    }
}

function renderizarTabla(envios) {
    const cuerpo = document.getElementById('cuerpoTabla');
    cuerpo.innerHTML = '';

    if (!envios || envios.length === 0) {
        cuerpo.innerHTML = '<tr><td colspan="6">No se encontraron envíos.</td></tr>';
        return;
    }

    envios.forEach(envio => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${envio.codigoRastreo}</td>
            <td>${envio.destinatario ?? '—'}</td>
            <td>${envio.direccionDestino}</td>
            <td>₡${envio.montoFlete}</td>
            <td><span class="pill-status ${envio.estado}">${envio.estado}</span></td>
            <td>${new Date(envio.fechaCreacion).toLocaleString()}</td>
        `;
        cuerpo.appendChild(fila);
    });
}

function actualizarControlesPaginacion(pagina) {
    totalPaginas = pagina.totalPages;

    document.getElementById('infoPagina').textContent =
        `Página ${pagina.number + 1} de ${Math.max(pagina.totalPages, 1)} (${pagina.totalElements} registros)`;

    document.getElementById('btnPrimera').disabled = pagina.first;
    document.getElementById('btnAnterior').disabled = pagina.first;
    document.getElementById('btnSiguiente').disabled = pagina.last;
    document.getElementById('btnUltima').disabled = pagina.last;
}

function deshabilitarBotonesPaginacion(deshabilitar) {
    document.getElementById('btnPrimera').disabled = deshabilitar;
    document.getElementById('btnAnterior').disabled = deshabilitar;
    document.getElementById('btnSiguiente').disabled = deshabilitar;
    document.getElementById('btnUltima').disabled = deshabilitar;
}

function mostrarErrorPaginado(cuerpoError) {
    const contenedor = document.getElementById('alertaErroresPaginado');
    contenedor.textContent = cuerpoError.error ?? 'Ocurrió un error al consultar los envíos';
    contenedor.hidden = false;
}

document.getElementById('btnBuscar').addEventListener('click', () => cargarPagina(0));
document.getElementById('btnProcedimiento').addEventListener('click', cargarViaStoredProcedure);
document.getElementById('btnPrimera').addEventListener('click', () => cargarPagina(0));
document.getElementById('btnAnterior').addEventListener('click', () => cargarPagina(paginaActual - 1));
document.getElementById('btnSiguiente').addEventListener('click', () => cargarPagina(paginaActual + 1));
document.getElementById('btnUltima').addEventListener('click', () => cargarPagina(totalPaginas - 1));
document.getElementById('selectTamanoPagina').addEventListener('change', () => cargarPagina(0));

if (document.getElementById('cuerpoTabla')) {
    inicializarVistaPaginada();
}