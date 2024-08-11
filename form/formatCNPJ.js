export default function formatCNPJ(event) {
    event.preventDefault();
    
    const format = "__.___.___/0001-__";

    const newValue = format.replace("_", event.key)

    event.target.value = newValue
}