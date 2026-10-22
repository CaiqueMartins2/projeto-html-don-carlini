// =====================================================
// DON CARLINI RISTORANTE
// Validação dos formulários e envio de avaliações
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // -------------------------------------------------
    // 1. FORMULÁRIO DE AVALIAÇÕES
    // -------------------------------------------------

    const formularioAvaliacao = document.getElementById("form-avaliacao");
    const listaAvaliacoes = document.getElementById("lista-avaliacoes");

    if (formularioAvaliacao && listaAvaliacoes) {

        formularioAvaliacao.addEventListener("submit", function (evento) {
            evento.preventDefault();

            if (!formularioAvaliacao.checkValidity()) {
                formularioAvaliacao.reportValidity();
                return;
            }

            const nome = formularioAvaliacao
                .querySelector('[name="nome"]')?.value.trim();

            const nota = formularioAvaliacao
                .querySelector('[name="nota"]')?.value;

            const comentario = formularioAvaliacao
                .querySelector('[name="comentario"]')?.value.trim();

            if (!nome || !nota || !comentario) {
                mostrarMensagem(
                    formularioAvaliacao,
                    "Preencha seu nome, a nota e o comentário.",
                    "erro"
                );
                return;
            }

            // Cria o cartão de avaliação
            const cartao = document.createElement("article");
            cartao.classList.add("avaliacao-card");

            const titulo = document.createElement("h3");
            titulo.textContent = nome;

            const estrelas = document.createElement("p");
            estrelas.classList.add("estrelas");
            estrelas.setAttribute(
                "aria-label",
                "Nota: " + nota + " de 5 estrelas"
            );
            estrelas.textContent =
                "★".repeat(Number(nota)) +
                "☆".repeat(5 - Number(nota));

            const texto = document.createElement("p");
            texto.textContent = comentario;

            const autor = document.createElement("p");
            autor.classList.add("autor-avaliacao");
            autor.textContent = "Avaliação de cliente";

            cartao.append(titulo, estrelas, texto, autor);

            // Insere a avaliação depois da última existente
            listaAvaliacoes.appendChild(cartao);

            // Limpa o formulário após o envio
            formularioAvaliacao.reset();

            mostrarMensagem(
                formularioAvaliacao,
                "Obrigado! Sua avaliação foi adicionada à página.",
                "sucesso"
            );

            // Leva a tela até a nova avaliação
            cartao.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    }

    // -------------------------------------------------
    // 2. OUTROS FORMULÁRIOS
    // -------------------------------------------------

    const formularios = document.querySelectorAll(
        "form:not(#form-avaliacao)"
    );

    formularios.forEach(function (formulario) {

        formulario.addEventListener("submit", function (evento) {

            if (!formulario.checkValidity()) {
                evento.preventDefault();
                formulario.reportValidity();
                return;
            }

            /*
             * Os formulários atuais usam action="#".
             * Isso não envia os dados a um servidor.
             * Interceptamos o envio para evitar a falsa
             * impressão de que os dados foram enviados.
             */

            const action = formulario.getAttribute("action");

            if (!action || action === "#") {
                evento.preventDefault();

                mostrarMensagem(
                    formulario,
                    "Os campos foram preenchidos corretamente, mas o envio ainda precisa ser conectado a um servidor.",
                    "aviso"
                );
            }
        });
    });

    // -------------------------------------------------
    // 3. MENSAGENS DE RETORNO
    // -------------------------------------------------

    function mostrarMensagem(formulario, texto, tipo) {

        let mensagem = formulario.querySelector(".mensagem-formulario");

        if (!mensagem) {
            mensagem = document.createElement("p");
            mensagem.classList.add("mensagem-formulario");
            mensagem.setAttribute("role", "status");
            mensagem.setAttribute("aria-live", "polite");
            formulario.appendChild(mensagem);
        }

        mensagem.textContent = texto;
        mensagem.className = "mensagem-formulario " + tipo;
    }

});
