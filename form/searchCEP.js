export default async function searchCEP(event) {
    try {
        const res = await fetch(`https://viacep.com.br/ws/${event.target.value}/json/`);
        const dados = await res.json();
        
        return dados;
    } catch(err) {
        event.target.value = ""
        console.log({
            msg: "Erro ao buscar CEP",
            err
        });
    }

}