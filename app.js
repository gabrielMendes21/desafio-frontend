import addAttachment from "./form/attachment.js";
import handleSubmit from "./form/handleSubmit.js";
import addProduct from "./form/product.js";
import searchCEP from "./form/searchCEP.js";

const products = [];
const attachments = [];

document.addEventListener("DOMContentLoaded", () => {
    // Formulário
    const form = document.querySelector("form");

    // Campos do formulário
    const cep = document.getElementById("cep");
    const addAttachmentButton = document.getElementById("novo-anexo");
    // const cnpj = document.getElementById("cnpj");
    // const phone = document.getElementById("telefone");

    // Formatação dos campos
        // cnpj.addEventListener("keydown", formatCNPJ);
        // phone.addEventListener("keydown", formatPhone);

    // Busca dos dados de localização de acordo com o CEP
    cep.addEventListener("change", async (event) => {
        const CEPData = await searchCEP(event);

        // Mensagem de erro
        const CEPErrorMessage = document.querySelector(".cep-input-error")

        // Verificar se os dados foram retornados com sucesso
        if (CEPData) {
            // Preencher os campos com os dados retornados da API
            document.getElementById("endereco").value = CEPData.logradouro;
            document.getElementById("bairro").value = CEPData.bairro;
            document.getElementById("municipio").value = CEPData.localidade;
            document.getElementById("estado").value = CEPData.uf;

            // Remover a mensagem de erro
            CEPErrorMessage.classList.add("invisible");
        } else {
            // Mostrar a mensagem de erro
            CEPErrorMessage.classList.remove("invisible");
        }

    });

    // Ao clicar em "adicionar produto", os campos do produto deve ser mostrado
    const addProductButton = document.getElementById("add-product");
    addProductButton.addEventListener("click", (event) => addProduct(event, products));

    // Adicionar o arquivo anexado à lista de anexos
    addAttachmentButton.addEventListener("change", (event) => addAttachment(event, attachments))

    // Envio do formulário
    form.addEventListener("submit", (event) => handleSubmit(event, products, attachments))
})


