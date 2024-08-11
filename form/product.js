export default function addProduct(event, products) {
    const productsFieldset = document.querySelector(".products");

    const id = Date.now().toString();

    // Adicionar o produto à lista de produtos
    products.push({
        id
    })

    // Inserção dos campos no HTML da página
    const newProduct = document.createElement("div");
    newProduct.classList.add("product");
    newProduct.dataset.id = id;
    newProduct.innerHTML = `
        <label for="produto-${products.length - 1}">Produto</label>
        <input type="text" name="produto" id="produto-${products.length - 1}" required>

        <select name="und-medida" id="und-medida-${products.length - 1}" required>
            <option value="" selected disabled>Selecione uma unidade de medida</option>
            <option value="kg">Quilogramas</option>
            <option value="g">Gramas</option>
        </select>

        <label for="qtd-estoque-${products.length - 1}" ">QTDE. em estoque</label>
        <input type="text" name="qtd-estoque" id="qtd-estoque-${products.length - 1}" required>

        <label for="valor-unitario-${products.length - 1}">Valor unitário</label>
        <input type="text" name="valor-unitario" id="valor-unitario-${products.length - 1}" required>

        <label for="total-${products.length - 1}">Valor total</label>
        <input type="text" name="total" id="total-${products.length - 1}" class="teste" readonly>
    `;
    
    productsFieldset.insertBefore(newProduct, event.target);

    // Adicionar o evento aos campos de valor unitário e quantidade em estoque para o cálculo do valor total
    const totalElementId = `total-${products.length - 1}`;

    document.getElementById(`qtd-estoque-${products.length - 1}`).addEventListener("change", (event) => total(event, `valor-unitario-${products.length - 1}`, totalElementId));

    document.getElementById(`valor-unitario-${products.length - 1}`).addEventListener("change", (event) => total(event, `qtd-estoque-${products.length - 1}`, totalElementId));
}

// Calcular o valor total de cada produto (valor unitário x quantidade em estoque)
function total(event, siblingId, totalFieldId) {
    const total = (Number(event.target.value || 0) * Number(document.getElementById(siblingId).value || 0));

    document.getElementById(totalFieldId).value = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}