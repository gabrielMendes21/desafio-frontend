// Função para lidar com o envio do formulário
export default function handleSubmit(event, products, attachments) {
    // Evitar o comportamento padrão do formulário (envio dos dados e recarregamento da página)
    event.preventDefault();

    // Tratamento dos campos do formulário
    const formData = new FormData(event.currentTarget);

    // Deletar campos que registram apenas um produto, e não todos
    formData.delete("produto");
    formData.delete("qtd-estoque");
    formData.delete("und-medida");
    formData.delete("valor-unitario");
    formData.delete("total");

    const productsFieldset = document.querySelector(".products");
    
    // Passar por cada registro de produto e registrar no vetor `products`
    const productsFields = Array.from(productsFieldset.children).filter(element => element.dataset.id)
    
    // Passe por cada produto do formulário
    productsFields.forEach(productFields => {
        const fieldsList = Array.from(productFields.children);

        // Encontre o seu respectivo id no vetor `products`
        const product = products.find(product => product.id === productFields.dataset.id);

        // Coloque os dados do produto que estão no formulário, dentro do objeto encontrado no vetor `products`
        if (product) {
            product.descricaoProduto = fieldsList.find(field => field.id.includes("produto")).value;
            product.unidadeMedida = fieldsList.find(field => field.id.includes("und-medida")).value;
            product.qtdeEstoque = fieldsList.find(field => field.id.includes("qtd-estoque")).value;
            product.valorUnitario = fieldsList.find(field => field.id.includes("valor-unitario")).value;
            product.valorTotal = fieldsList.find(field => field.id.includes("total")).value;
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
