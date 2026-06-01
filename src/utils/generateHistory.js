export function generateHistoryData(baseRate) {
    const data = [];
    const labels = [];
    let currentRate = parseFloat(baseRate);
    
    // Gera do dia de hoje (0) até 30 dias atrás, pulando de 6 em 6 dias para o gráfico não ficar espremido
    for (let i = 0; i <= 30; i += 6) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        
        if (i === 0) {
            labels.push('Hoje');
            data.push(currentRate);
        } else {
            labels.push(`${day}/${month}`);
            // Cria uma pequena oscilação financeira realista
            const variation = 1 + ((Math.random() - 0.5) * 0.04);
            currentRate = currentRate * variation;
            data.push(currentRate);
        }
    }
    
    // Inverte os arrays para o gráfico desenhar da esquerda (passado) para a direita (hoje)
    return {
        labels: labels.reverse(),
        datasets: [{ 
            data: data.reverse() 
        }]
    };
}