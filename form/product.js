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
        <img class="remove-product-${id}" src="assets/garbage-icon.svg">
        <div>
            <span>Produto - ${id}</span>
            <div>
                <div> 
                    <img src="assets/box-icon.svg">
                </div>

                <div>
                    <div class="field">
                        <label for="produto-${id}">Produto</label>
                        <input type="text" name="produto" id="produto-${id}" required>
                    </div>

                    <div>
                        <label for="und-medida-${id}">UND. medida</label>
                        <select name="und-medida" id="und-medida-${id}" required>
                            <option value="" selected disabled>Selecione uma unidade de medida</option>
                            <option value="kg">Quilogramas</option>
                            <option value="g">Gramas</option>
                            <option value="un">Unidade</option>
                            <option value="de">Dezena</option>
                            <option value="cen">Centena</option>
                        </select>
                    </div>

                    <div class="field">
                        <label for="qtd-estoque-${id}">QTDE. em estoque</label>
                        <input type="number" name="qtd-estoque" id="qtd-estoque-${id}" required>
                    </div>

                    <div class="field">
                        <label for="valor-unitario-${id}">Valor unitário</label>
                        <input type="text" name="valor-unitario" id="valor-unitario-${id}" required>
                    </div>

                    <div class="field">
                        <label for="total-${id}">Valor total</label>
                        <input type="text" name="total" id="total-${id}" class="teste" readonly>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    productsFieldset.insertBefore(newProduct, event.target);

    // Adicionar o evento aos campos de valor unitário e quantidade em estoque para o cálculo do valor total
    const totalElementId = `total-${id}`;

    document.getElementById(`qtd-estoque-${id}`).addEventListener("change", (event) => total(event, `valor-unitario-${id}`, totalElementId));

    document.getElementById(`valor-unitario-${id}`).addEventListener("change", (event) => total(event, `qtd-estoque-${id}`, totalElementId));

    document.querySelector(`.remove-product-${id}`).addEventListener("click", (event) => removeProduct(event, id, products));
}

// Calcular o valor total de cada produto (valor unitário x quantidade em estoque)
function total(event, siblingId, totalFieldId) {
    const total = (Number(event.target.value || 0) * Number(document.getElementById(siblingId).value || 0));

    document.getElementById(totalFieldId).value = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


function removeProduct(event, id, products) {
    // Remover o produto do vetor
    const product = products.find(p => p.id === id);
    products.splice(products.indexOf(product), 1);

    // Remover os campos do produto do HTML da página
    const productElement = document.querySelector(`[data-id="${id}"`);
    if (productElement) {
        productElement.remove();
    }
}