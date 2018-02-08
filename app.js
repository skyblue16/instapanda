
$(document).ready(function () {
   
});
function validar() {
    var nombre = document.forms.MiFormulario.nombre;
    var codigo = document.forms.MiFormulario.codigo;

    if (nombre.value.length > 0) {
        // el nombre tiene mas de un caracter
        nombre.style.borderColor = "#808080";
        var nombreOk = true;
    } else {
        // el nombre es incorrecto
        nombre.style.borderColor = "#ff0000";
        var nombreOk = false;
    }

    if (codigo.value.length == 6) {
        // el codigo tiene los 6 digitos
        codigo.style.borderColor = "#808080";
        var codigoOk = true;
    } else {
        // el codigo es incorrecto
        codigo.style.borderColor = "#ff0000";
        var codigoOk = false;
    }

    // Si el nombre y el código son correctos...
    if (nombreOk && codigoOk)
        return true;

    // Si devuelve false, no permite que se envie el formulario
    return false;
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

interact('.resize-drag').draggable({
        onmove: window.dragMoveListener,
        restrict: {
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
    })
    .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        // keep the edges inside the parent
        restrictEdges: {
            outer: 'parent',
            endOnly: true,
        },

        // minimum size
        restrictSize: {
            min: { width: 100, height: 50 },
        },

        inertia: true,
    })
    .on('resizemove', function (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
    });
