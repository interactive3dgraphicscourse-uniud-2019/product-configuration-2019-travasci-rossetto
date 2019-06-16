# Progetto Interactive-3D-Graphics: Product-Configuration-2019

Nel nostro progetto abbiamo realizzato un sito di e-commerce immaginario per la vendita di occhiali da sole. Nel sito sono presenti descrizioni, recensioni e una zona dove viene fornita un'anteprima degli occhiali scelti. I materiali della montatura e il tipo delle lenti possono essere scelti tra varie alternative; gli occhiali dell'anteprima cambieranno in base a queste scelte.

![Pagina finale](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-travasci-rossetto/master/screenshots/pagina%20finale.png)

Il file principale è `Progetto-Product-Configuration-2019-Rossetto-Travasci.html`. Vengono utilizzate le librerie `three.min.js`, `stats.min.js`, `OrbitControls.js`, `GLTFLoader.js`, `LoaderSupport.js`, `BufferGeometryUtils.js` tutte contenute nella cartella `/libs`. 
Il resto delle cartelle del progetto è invece diviso in:
- `/images` contiene le cube-map e le immagini e le icone del sito,
- `/models` contiene il modello in formato .gltf degli occhiali,
- `/texture` contiene tutte le texture usate per i vari materiali (opportunatamente divise),
- `/resources` contiene il file `style.css` della pagina  e il file `renderScene.js` che contiene il codice per implementare il render della scena all'interno del canvas d'anteprima.

Lo spostamento all'interno del canvas contenente l'anteprima è gestito dai controlli definiti in `OrbitControls.js`, con delle piccole modifiche. Innanzitutto, la "rotellina" del mouse ha l'effetto definito in `OrbitControls.js` solo quando il cursore si trova all'interno del canvas, altrimenti ha il classico effetto di scorrimento della pagina web. Inoltre, la camera virtuale gira autonomamente intorno al modello degli occhiali fino a quando non si clicca sul canvas.

# Features

Il sito, caratterizzato da un'impronta umoristica che ben si adatta alla fittizia Acme Corporation, presenta gran parte degli elementi presenti nei siti di e-commerce. Accanto ad una breve descrizione del prodotto ed ai pulsanti per l'acquisto, c'è il canvas all'interno del quale viene mostrata l'anteprima 3D degli occhiali. Al di sotto del canvas sono presenti i pulsanti utili per cambiare le caratteristiche degli occhiali e dell'ambienti in cui vengono mostrati. Più in basso si trova una descrizione più completa, uno spazio per le rencesioni e una serie di suggerimenti di altri prodotti. Nella parte superiore della pagina c'è una barra con il logo del negozio, una barra di ricerca e altri collegamenti utili.

Se la rotazione automatica non dovesse essere sufficiente, il cliente può spostarsi liberamente nella scena tramite i comandi definiti in `OrbitControls.js`, in modo da poter esaminare gli occhiali nel modo in cui desidera.
Usando i primi tre pulsanti al di sotto del canvas è possibile cambiare il materiale della montatura, scegliendo tra tre diverse alternative: *Metallo*, *Legno* e *Plastica blu*.

Il pulsante successivo può essere utilizzato per scegliere il tipo di lenti, tra *Lenti riflettenti* metallizzate e *Lenti opache* scure.

Grazie all'ultimo pulsante è possibile cambiare l'ambientazione della scena, in modo da osservare gli occhiali in diverse condizioni di luce. L'ambientazione iniziale è quella di un deserto molto soleggiato, mentre l'altra è quella di uno spazio erboso durante la notte.

# Processo di sviluppo

## Risorse utilizzate

-- da fare --
