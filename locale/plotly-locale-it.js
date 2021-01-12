var locale = {
    moduleType: "locale",
    name: "it",
    dictionary: {
        Autoscale: "Scala automaticamente",
        "Box Select": "Selezione box",
        "Click to enter Colorscale title": "Clicca per inserire un titolo alla scala di colori",
        "Click to enter Component A title": "Clicca per inserire un titolo al componente A",
        "Click to enter Component B title": "Clicca per inserire un titolo al componente B",
        "Click to enter Component C title": "Clicca per inserire un titolo al componente C",
        "Click to enter Plot title": "Clicca per inserire un titolo al grafico",
        "Click to enter X axis title": "Clicca per inserire un titolo all'asse X",
        "Click to enter Y axis title": "Clicca per inserire un titolo all'asse Y",
        "Click to enter radial axis title": "Clicca per inserire un titolo per l' asse radiale",
        "Compare data on hover": "Paragona i dati al passaggio del mouse",
        "Double-click on legend to isolate one trace": "Doppio click per isolare i dati di una traccia",
        "Double-click to zoom back out": "Doppio click per tornare allo zoom iniziale",
        "Download plot as a png": "Scarica il grafico come immagine png",
        "Download plot": "Scarica il grafico",
        "Edit in Chart Studio": "Modifica in Chart Studio",
        "IE only supports svg.  Changing format to svg.": "IE supporta solo svg.  Modifica formato in svg.",
        "Lasso Select": "Selezione lazo",
        "Orbital rotation": "Rotazione orbitale",
        Pan: "Sposta",
        "Produced with Plotly": "Creato con Plotly",
        Reset: "Reset",
        "Reset axes": "Resetta gli assi",
        "Reset camera to default": "Reimposta la camera ai valori predefiniti",
        "Reset camera to last save": "Reimposta la camera all' ultimo salvataggio",
        "Reset view": "Reimposta la vista",
        "Reset views": "Reimposta le viste",
        "Show closest data on hover": "Mostra i dati pi\xf9 vicini al passaggio del mouse",
        "Snapshot succeeded": "Screenshot creato con successo",
        "Sorry, there was a problem downloading your snapshot!": "Si \xe8 verificato un errore durante la creazione dello screenshot",
        "Taking snapshot - this may take a few seconds": "Creazione screenshot - potrebbe richiedere qualche secondo",
        Zoom: "Zoom",
        "Zoom in": "Ingrandisci",
        "Zoom out": "Rimpicciolisci",
        "close:": "chiudi:",
        trace: "traccia",
        "lat:": "lat.:",
        "lon:": "lon.:",
        "q1:": "q1:",
        "q3:": "q3:",
        "source:": "sorgente:",
        "target:": "target:",
        "max:": "max.:",
        "mean \xb1 \u03c3:": "media \xb1 \u03c3:",
        "mean:": "media:",
        "median:": "mediana:",
        "min:": "min.:",
        "new text:": "Nuovo testo:",
        "upper fence:": "limite superiore:",
        "lower fence:": "limite inferiore:",
        "Turntable rotation": "Rotazione piattaforma",
        "Toggle Spike Lines": "Abilita linee di identificazione",
        "open:": "apri:",
        "high:": "alto:",
        "kde:": "kde:",
        "low:": "basso:",
        "incoming flow count:": "Flusso in entrata:",
        "outgoing flow count:": "Flusso in uscita:",
        "Toggle show closest data on hover": "Abilita mostra i dati pi\xf9 vicini al passaggio del mouse"
    },
    format: {
        days: ["Domenica", "Luned\xec", "Marted\xec", "Mercoled\xec", "Gioved\xec", "Venerd\xec", "Sabato"],
        shortDays: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
        months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        shortMonths: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
        date: "%d/%m/%Y",
        decimal: ",",
        thousands: "."
    }
};
"undefined" == typeof Plotly ? (window.PlotlyLocales = window.PlotlyLocales || [], window.PlotlyLocales.push(locale)) : Plotly.register(locale);