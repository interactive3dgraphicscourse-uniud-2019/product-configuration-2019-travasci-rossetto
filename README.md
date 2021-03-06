# Progetto Interactive-3D-Graphics: Product-Configuration-2019

Nel nostro progetto abbiamo realizzato un sito di e-commerce immaginario per la vendita di occhiali da sole. Nel sito sono presenti descrizioni, recensioni e una zona dove viene fornita un'anteprima degli occhiali scelti. I materiali della montatura e il tipo delle lenti possono essere scelti tra varie alternative; gli occhiali dell'anteprima cambieranno in base a queste scelte.

![Pagina finale](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-travasci-rossetto/master/screenshots/pagina%20finale.png)

Il file principale è `Progetto-Product-Configuration-2019-Rossetto-Travasci.html`. Vengono utilizzate le librerie `three.min.js`, `stats.min.js`, `OrbitControls.js`, `GLTFLoader.js`, `LoaderSupport.js`, `BufferGeometryUtils.js` tutte contenute nella cartella `/libs`. 
Il resto delle cartelle del progetto è invece diviso in:
- `/images` contiene le cube-map e le immagini e le icone del sito,
- `/models` contiene il modello in formato .gltf degli occhiali,
- `/texture` contiene tutte le texture usate per i vari materiali (opportunatamente divise),
- `/resources` contiene il file `style.css` della pagina e il file `renderScene.js` che contiene il codice per implementare il render della scena all'interno del canvas d'anteprima.

Lo spostamento all'interno del canvas contenente l'anteprima è gestito dai controlli definiti in `OrbitControls.js`, con delle piccole modifiche. Innanzitutto, la "rotellina" del mouse ha l'effetto definito in `OrbitControls.js` solo quando il cursore si trova all'interno del canvas, altrimenti ha il classico effetto di scorrimento della pagina web. Inoltre, la camera virtuale gira autonomamente intorno al modello degli occhiali fino a quando non si clicca sul canvas.

# Features

Il sito, caratterizzato da un'impronta umoristica che ben si adatta alla fittizia Acme Corporation, presenta gran parte degli elementi presenti nei siti di e-commerce. Accanto ad una breve descrizione del prodotto ed ai pulsanti per l'acquisto, c'è il canvas all'interno del quale viene mostrata l'anteprima 3D degli occhiali. Al di sotto del canvas sono presenti i pulsanti utili per cambiare le caratteristiche degli occhiali e dell'ambienti in cui vengono mostrati. Più in basso si trova una descrizione più completa, uno spazio per le rencesioni e una serie di suggerimenti di altri prodotti. Nella parte superiore della pagina c'è una barra con il logo del negozio, una barra di ricerca e altri collegamenti utili.

Se la rotazione automatica non dovesse essere sufficiente, il cliente può spostarsi liberamente nella scena tramite i comandi definiti in `OrbitControls.js`, in modo da poter esaminare gli occhiali nel modo in cui desidera.
Usando i primi tre pulsanti al di sotto del canvas è possibile cambiare il materiale della montatura, scegliendo tra tre diverse alternative: *Metallo*, *Legno* e *Plastica blu*.

Il pulsante successivo può essere utilizzato per scegliere il tipo di lenti, tra *Lenti riflettenti* metallizzate e *Lenti opache* scure.

Grazie all'ultimo pulsante è possibile cambiare l'ambientazione della scena, in modo da osservare gli occhiali in diverse condizioni di luce. L'ambientazione iniziale è quella di un deserto molto soleggiato, mentre l'altra è quella di uno spazio erboso durante la notte.

# Processo di sviluppo

L'implementazione delle varie equazioni di rendering segue pari passo quelle introdotte a lezione. 

Per i materiali della montatura (metallo, legno e plastica) si è implementata la formula generale per la microfacet BRDF (**Cook-Torrance**). I valori utilizzati nello shading, quali `cdiff`, `cspec` e `roughness` sono estrapolati dalle rispettive texture scaricate. È stata inoltre aggiunta una debole luce ambientale costante.
Negli `uniform` dei materiali vengono passati, oltre alle varie texture, i seguenti vec3 come valori costanti:

- `clight`
- `alight`, per l'illuminazione ambientale

Rispetto alla environment map attualmente in utilizzo ci saranno diversi valori scelti in base alla diversa situazione.

Per le lenti si è dovuta utilizzare una soluzione diversa in base alla tipologia di lente, ognuna con il proprio shader.
L'implementazione delle *lenti riflettenti* segue quella esposta a lezione per il reflection mapping utilizzando una environment map e una normal map per donare una maggiore fedeltà visiva. Per le *lenti opache* si è implementata una soluzione che vede l'utilizzo di un vettore di rifrazione (realizzato utilizzando il metodo `refract` fornitoci con l'API di WebGL e utilizzando come indice di rifrazione del vetro un valore pari a 1.4), invece del vettore di riflessione.
Negli `uniform` delle lenti vengono passate le texture della environmentmap e della normalmap in aggiunta al valore costante prefissato in base al tipo di scena in utilizzo (giorno/notte).

Le texture utilizzate come environment map sono tutte foto a 360° in formato HDRI, convertite in cube map e salvate come file PNG.

## Risorse utilizzate

Il modello 3D è stato preso da:
- https://www.blendswap.com/blends/view/70347 sotto licenza **CC-BY**

Le texture sono state prese da:
- https://www.cc0textures.com
- https://quixel.com/megascans/library/

Le environment maps sono state scaricate da: 
- https://hdrihaven.com

e convertite in *cube-map* tramite il tool presente in https://matheowis.github.io/HDRI-to-CubeMap/.
