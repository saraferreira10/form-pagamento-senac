function informarDados() {

    let numero = parseFloat(document.getElementById("valor").value);

    if (!isNaN(numero) && numero > 0) {
        document.getElementById("paragrafoTotal").style.display = 'block';
        if (document.getElementById("pix").checked) {
            numero = 0.9 * numero;
            document.getElementById('formCartao').style.display = 'none';
            document.getElementById('formPix').style.display = 'block';
        } else {
            document.getElementById('formCartao').style.display = 'block';
            document.getElementById('formPix').style.display = 'none';
            calcularParcelas();
        }

        document.getElementById("total").innerText = numero.toFixed(2)
    } else {
        document.getElementById("paragrafoTotal").style.display = 'none';
        document.getElementById('formPix').style.display = 'none';
        document.getElementById('formCartao').style.display = 'none';
        alert("Insira um valor numérico válido e maior que zero!");
    }

}

function calcularParcelas() {
    let selectElement = document.getElementById("parcelas");
    let lista = document.getElementById("listaPagamento");
    let parcelas = Number(selectElement.options[selectElement.selectedIndex].value);
    let valor = Number(document.getElementById("valor").value);

    lista.innerHTML = "";

    if (parcelas <= 3) {
        for (let i = 1; i <= parcelas; i++) {
            lista.innerHTML = lista.innerHTML + `<li>${i} x R$ ${(valor / parcelas).toFixed(2)}</li>`;
        }
        valor = valor / parcelas;

    } else {
        switch (parcelas) {
            case 4:
                for (let i = 1; i <= parcelas; i++) {
                    lista.innerHTML = lista.innerHTML + `<li>${i} x R$ ${(valor / parcelas * 1.05).toFixed(2)}</li>`;
                }
                valor = valor / parcelas * 1.05;

                break
            case 5:
                for (let i = 1; i <= parcelas; i++) {
                    lista.innerHTML = lista.innerHTML + `<li>${i} x R$ ${(valor / parcelas * 1.1).toFixed(2)}</li>`;
                }
                valor = valor / parcelas * 1.1;

        }
    }

    document.getElementById("total").innerHTML = Number(valor * parcelas).toFixed(2);
}

function mostrarCartao() {
    let numCartao = document.getElementById("numero").value;
    let bandeiraImg = document.getElementById("imgCartao");

    if (numCartao.startsWith("1234")) {
        bandeiraImg.src = 'img/bandeira-1.png';
    } else if (numCartao.startsWith('4321')) {
        bandeiraImg.src = 'img/bandeira-2.png';
    } else {
        bandeiraImg.src = 'img/cartao-nao-encontrado.png';
    }
}

function validarBandeira() {
    let numCartao = document.getElementById("numero").value;
    return numCartao.startsWith("1234") || numCartao.startsWith('4321') ? true : (alert("Informe uma bandeira válida!"), false);
}

function validarFormulario(idForm) {
    let formulario = document.getElementById(idForm);

    switch (idForm) {
        case "formCartao":
            if (validarBandeira()) {
                return formulario.checkValidity() ? (alert("Sucesso!"), true) : (alert("Preencha todos os campos!"), false);
            }
            return false;
        case "formPix":
            return formulario.checkValidity() ? (alert("Sucesso!"), true) : (alert("Preencha todos os campos!"), false);
        default:
            return false;
    }
}

