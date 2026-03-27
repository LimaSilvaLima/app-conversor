const BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export async function exchangeRateApi(fromCurrency) {

    try {
        const response = await fetch(`${BASE_URL}/${fromCurrency}`);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            console.error("A API não retornou JSON. Resposta recebida:", text.substring(0, 100));
            throw new Error("Resposta do servidor inválida (não é JSON).");
        }
        // É necessário parsear a resposta para JSON e atribuí-la à variável 'data'
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        throw error;
    }
   
}