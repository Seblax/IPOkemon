export async function Parser(path){
    const response = await fetch(path);
    const csvData = await response.text();
    
    const rows = csvData.split('\n'); // Divide el CSV en filas

    // Procesa cada fila del CSV
    return rows.slice(1).map(row => {
        const values = row.trim().split(';'); // Divide cada fila en valores
        return values; // Si la fila no coincide con el encabezado, la ignoramos
    });
}