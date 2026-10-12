/* Fiktive CO2-Emissionsdaten */

const emissionsdaten = [
    {
        land: "Deutschland",
        unternehmen: "EcoTech GmbH",
        emissionen: 150000
    },
    {
        land: "Deutschland",
        unternehmen: "Industrie AG",
        emissionen: 420000
    },
    {
        land: "Frankreich",
        unternehmen: "GreenPower SA",
        emissionen: 185000
    },
    {
        land: "USA",
        unternehmen: "GlobalEnergy SA",
        emissionen: 310000
    },
    {
        land: "USA",
        unternehmen: "FutureTech Inc.",
        emissionen: 530000
    },
    {
        land: "USA",
        unternehmen: "Industrial Corp.",
        emissionen: 780000
    },
    {
        land: "Japan",
        unternehmen: "Nippon Energy",
        emissionen: 260000
    },
    {
        land: "Japan",
        unternehmen: "Tokyo Industries",
        emissionen: 390000
    }
];

console.log(emissionsdaten);

/* Emissionsdaten in der Tabelle anzeigen */

function tabelleAnzeigen(daten) {

    const tabellenBody = document.getElementById("emissions-tabelle");

    tabellenBody.innerHTML = "";

    daten.forEach(function(eintrag) {

        const zeile = document.createElement("tr");

        const landZelle = document.createElement("td");
        landZelle.textContent = eintrag.land;

        const unternehmenZelle = document.createElement("td");
        unternehmenZelle.textContent = eintrag.unternehmen;

        const emissionenZelle = document.createElement("td");
        emissionenZelle.textContent = eintrag.emissionen.toLocaleString("de-DE");

        zeile.appendChild(landZelle);
        zeile.appendChild(unternehmenZelle);
        zeile.appendChild(emissionenZelle);

        tabellenBody.appendChild(zeile);

    });
}

/* Tabelle beim Laden der Webseite befüllen */

tabelleAnzeigen(emissionsdaten);

/* Länderfilter mit Auswahlmöglichkeiten befüllen */

const landFilter = document.getElementById("land-filter");

const laender = [...new Set(emissionsdaten.map(function(eintrag) {
    return eintrag.land;
}))];

laender.sort();

laender.forEach(function(land) {
    const option = document.createElement("option");

    option.value = land;
    option.textContent = land;

    landFilter.appendChild(option);
});

/* Gemeinsame Filterfunktion */

const unternehmenFilter = document.getElementById("unternehmen-filter");

function datenFiltern() {

    const ausgewaehltesLand = landFilter.value;
    const suchbegriff = unternehmenFilter.value.toLowerCase();

    const gefilterteDaten = emissionsdaten.filter(function(eintrag) {

        const landPasst = ausgewaehltesLand === "" ||
                          eintrag.land === ausgewaehltesLand;
        
        const unternehmenPasst = eintrag.unternehmen
            .toLowerCase()
            .includes(suchbegriff);
        
        return landPasst && unternehmenPasst;

    });

    tabelleAnzeigen(gefilterteDaten);
}

/* Filter bei Änderungen aktualisieren */

landFilter.addEventListener("change", datenFiltern);

unternehmenFilter.addEventListener("input", datenFiltern);

/* Filter zurücksetzen */

const filterReset = document.getElementById("filter-reset");

filterReset.addEventListener("click", function() {

    landFilter.value = "";

    unternehmenFilter.value = "";

    datenFiltern();

});

/* Tabelle alphabetisch sortieren */

let sortierSpalte = "";
let sortierRichtung = 1;

function datenSortieren(spalte) {

    if (sortierSpalte === spalte) {
        sortierRichtung = sortierRichtung * -1;
    } else {
        sortierSpalte = spalte;
        sortierRichtung = 1;
    }

    emissionsdaten.sort(function(a, b) {

        return a[spalte].localeCompare(b[spalte]) * sortierRichtung;

    });

    datenFiltern();

}

/* Sortierbuttons mit Funktionen verbinden */

const sortLand = document.getElementById("sort-land");
const sortUnternehmen = document.getElementById("sort-unternehmen");

sortLand.addEventListener("click", function() {
    datenSortieren("land");
});

sortUnternehmen.addEventListener("click", function() {
    datenSortieren("unternehmen");
});