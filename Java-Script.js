document.addEventListener("DOMContentLoaded", function() {
    const typSelect = document.getElementById("typ");
    const sortierungSelect = document.getElementById("sortierung");
    
    typSelect.addEventListener("change", updateTable);
    sortierungSelect.addEventListener("change", updateTable);
    
    // Speichere die ursprüngliche Reihenfolge der Tabellenzeilen
    const originalRows = Array.from(document.querySelectorAll("tbody tr"));

    function updateTable() {
        const typ = typSelect.value;
        const sortierung = sortierungSelect.value;
        
        // Setze die Tabelle auf die ursprüngliche Reihenfolge zurück
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        originalRows.forEach(row => {
            tbody.appendChild(row);
        });
        
        // Wenn beide Komboboxen "auswählen" anzeigen, beende die Funktion hier
        if (typ === "auswählen" && sortierung === "auswählen") {
            return;
        }
        
        const rows = document.querySelectorAll("tbody tr");
        const filteredRows = [];
        
        rows.forEach(row => {
            const cellTyp = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
            if (cellTyp === typ || typ === "auswählen") {
                filteredRows.push(row);
            }
        });
        
        filteredRows.sort((a, b) => {
            const cellValueA = parseFloat(a.querySelector("td:nth-child(4)").textContent);
            const cellValueB = parseFloat(b.querySelector("td:nth-child(4)").textContent);
            
            if (sortierung === "absteigend") {
                return cellValueB - cellValueA;
            } else {
                return cellValueA - cellValueB;
            }
        });
        
        tbody.innerHTML = ""; // Lösche den aktuellen Inhalt des tbody-Elements
        
        filteredRows.forEach(row => {
            tbody.appendChild(row); // Füge die gefilterten und sortierten Zeilen hinzu
        });
    }
});
