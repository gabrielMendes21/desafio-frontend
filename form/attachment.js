export default function addAttachment(event, attachments) {
    const attachmentList = document.getElementById("attachments-list");
    const fileInput = document.getElementById("novo-anexo");
    const newFile = fileInput.files[0];

    if (newFile) {
        const reader = new FileReader();
        reader.addEventListener("load", function(event) {
            const fileData = event.target.result;
            const fileName = newFile.name;
            const fileId = Date.now().toString();

            // Criação da URL do arquivo para download
            const url = URL.createObjectURL(newFile);
            
            // Criar um elemento HTML para o anexo
            const newAttachment = document.createElement("div");
            
            // Adicionar o anexo ao vetor de anexos
            attachments.push({
                fileId,
                fileData
            })

            newAttachment.classList.add("attachment");
            newAttachment.dataset.id = fileId;
            newAttachment.innerHTML = `
                <li>
                    <img src="../assets/garbage-icon.svg" id="excluir-anexo-${fileId}">
                    <a href="${url}" download="${newFile.name}">
                        <img src="../assets/view-icon.svg">
                    </a>
                    
                    <span>${newFile.name}</span>
                </li>
            `;
            
            // Adicionar o elemento à lista de anexos
            attachmentList.appendChild(newAttachment);
            
            // Adição do evento para a remoção do anexo
            document.getElementById(`excluir-anexo-${fileId}`).addEventListener("click", () => removeAttachment(fileId, url, attachments));

            // Armazenar o arquivo no session storage
            sessionStorage.setItem(fileId, JSON.stringify({fileName, fileData}));
        });

        // Ler o arquivo como Data URL
        reader.readAsDataURL(newFile);
        
    }
}

// Remover o arquivo da memória e do session storage caso o botão de exclusão seja clicado
function removeAttachment(id, url, attachments) {
    // Remoção do session storage
    sessionStorage.removeItem(id);
    
    // Liberação da memória
    URL.revokeObjectURL(url);
    
    // Remoção do elemento HTML
    const attachmentElement = document.querySelector(`[data-id="${id}"]`);
    if (attachmentElement) {
        attachmentElement.remove();
    }

    // Remoção dos dados do arquivo do vetor de anexos
    const attachment = attachments.find(att => att.fileId === id);
    attachments.splice(attachments.indexOf(attachment), 1);

    // Limpa o valor do input para adições posteriores
    document.getElementById("novo-anexo").value = ""
}