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

/* Tabelle nach ausgewähltem Land filtern */

landFilter.addEventListener("change", function() {

    const ausgewaehltesLand = landFilter.value;

    const gefilterteDaten = emissionsdaten.filter(function(eintrag) {

        return ausgewaehltesLand === "" ||
            eintrag.land === ausgewaehltesLand;
    });

    tabelleAnzeigen(gefilterteDaten);
});

/* Unternehmenssuche */

const unternehmenFilter = document.getElementById("unternehmen-filter");

unternehmenFilter.addEventListener("input", function() {

    const suchbegriff = unternehmenFilter.value.toLowerCase();

    const ausgewaehltesLand = landFilter.value;

    const gefilterteDaten = emissionsdaten.filter(function(eintrag) {

        const landPasst= ausgewaehltesLand === "" ||
                        eintrag.land === ausgewaehltesLand;

        const unternehmenPasst = eintrag.unternehmen
            .toLowerCase()
            .includes(suchbegriff);
        
        return landPasst && unternehmenPasst;

    });

    tabelleAnzeigen(gefilterteDaten);

});
