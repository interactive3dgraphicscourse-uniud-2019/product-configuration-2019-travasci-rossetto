# Progetto Interactive-3D-Graphics: Product-Configuration-2019

Nel nostro progetto abbiamo realizzato un falso sito di e-commerce per la vendita di occhiali da sole. Nel sito sono presenti descrizioni, recensioni e una zona dove viene fornita un'anteprima degli occhiali scelti. Il modello di occhiale presenta materiali della montatura e tipologia di lenti intercambiabili.

-- immagine rappresentativa --

Il file principale è `Progetto-Product-Configuration-2019-Rossetto-Travasci.html`. Vengono utilizzate le librerie `three.min.js`, `stats.min.js`, `OrbitControls.js`, `GLTFLoader.js`, `LoaderSupport.js`, `BufferGeometryUtils.js` tutte contenute nella cartella `/libs`. 
Il resto delle cartelle del progetto è invece diviso in:
- `/images` contiene le cube-map e le immagini per le icone del sito,
- `/models` contiene il modello in formato .gltf degli occhiali,
- `/texture` contiene tutte le texture usate per i vari materiali (opportunatamente divise),
- `/resources` contiene il file `style.css` del sito  e il file `renderScene.js` che contiene il codice per implementare il render della scena all'interno del canvas d'anteprima.

Lo spostamento all'interno del canvas contenente l'anteprima è gestito dai controlli definiti in `OrbitControls.js`.

# Features

Il sito è costituito da una breve e ironica descrizione  del prodotto con accanto il canvas che mostra un paio di occhiali moderni in una scena.

E' possibile per il cliente visionare l'occhiale a qualsiasi angolazione e distanza desideri tramite i movimenti del cursore. 
La montatura presenta una scelta varia di materiali, scelti per dare più diversità possibile nel calcolo dello shading:
- *Metallo*,
- *Legno*,
- *Plastica*.

Oltre alla montature, anche le lenti sono intercambiali tra:
 - *Lenti riflettenti* o,
 - *Lenti opache*.

Per fornire un'idea di una diversa ambientazione e illuminazione di come questi occhiali si presentino nella realtà c'è la disponibilità di cambiare tra un paesaggio:
- *Desertico* con una luce forte del sole,
- *Prato* con una luce fioca della luna.
# Processo di sviluppo

