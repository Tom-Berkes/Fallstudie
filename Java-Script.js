document.addEventListener("DOMContentLoaded", function() {
    const typSelect = document.getElementById("typ");
    const sortierungSelect = document.getElementById("sortierung");
    
    typSelect.addEventListener("change", updateTable);
    sortierungSelect.addEventListener("change", updateTable);
    
    // die ursprünlgiche Reihenfolge der Tabelle speichern
    const originalRows = Array.from(document.querySelectorAll("tbody tr"));

    function updateTable() {
        const typ = typSelect.value;
        const sortierung = sortierungSelect.value;
        
        // die Tabelle in die Ursprungsform zurücksetzen
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        originalRows.forEach(row => {
            tbody.appendChild(row);
        });
        
        // Wenn beide Komboboxen "auswählen" anzeigen, wird hier abgebrochen
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
        
        tbody.innerHTML = ""; 
        
        filteredRows.forEach(row => {
            tbody.appendChild(row); // die gefilterten und sortierten Zeilen hinzufügen
        });
    }
});


document.querySelector("form").onsubmit = function() {
    //Wert des Suche-Felds bestimmen
     let suche = document.querySelector("input").value;
     if (suche.length < 3) {
        window.alert("zu kurzer Suchbegriff");
     } else {
        
        window.alert("Suche nach \"" + suche + "\" noch nicht implementiert");
     }
     return false;
   };