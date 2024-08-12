// Função para lidar com o envio do formulário
export default function handleSubmit(event, products, attachments) {
    // Evitar o comportamento padrão do formulário (envio dos dados e recarregamento da página)
    event.preventDefault();

    if (products.length === 0) {
        document.querySelector(".no-products-added").classList.remove("invisible")
    } if (attachments.length === 0) {
        document.querySelector(".no-attachments-added").classList.remove("invisible");
    } else {
        // Remover as mensagens de erro, caso apareçam
        document.querySelector(".no-products-added").classList.add("invisible");
        document.querySelector(".no-attachments-added").classList.add("invisible");
        
        // Tratamento dos campos do formulário
        const formData = new FormData(event.currentTarget);

        // Deletar campos que registram apenas um produto, e não todos
        formData.delete("produto");
        formData.delete("qtd-estoque");
        formData.delete("und-medida");
        formData.delete("valor-unitario");
        formData.delete("total");

        const productsFieldset = document.querySelector(".products");
        const productsFields = Array.from(productsFieldset.querySelectorAll("[data-id]"));
        
        // Passe por cada produto do formulário
        productsFields.forEach(productFields => {
            // Encontre o seu respectivo id no vetor `products`
            const product = products.find(product => product.id === productFields.dataset.id);

            // Coloque os dados do produto que estão no formulário, dentro do objeto encontrado no vetor `products`
            if (product) {
                product.descricaoProduto = productFields.querySelector("[id*=produto]").value;
                product.unidadeMedida = productFields.querySelector("[id*=und-medida]").value;
                product.qtdeEstoque = productFields.querySelector("[id*=qtd-estoque]").value;
                product.valorUnitario = productFields.querySelector("[id*=valor-unitario]").value;
                product.valorTotal = productFields.querySelector("[id*=total]").value;
            }
        })

        // Versão final dos dados do formulário
        let data = Object.fromEntries(formData);
        data = {
            ...data,
            produtos: products,
            anexos: attachments
        }
    
        console.log(data);
    }
    
}
