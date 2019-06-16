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

### Terrain

Il terreno viene costruito dalla funzione `buildTerrain()` all'interno di `terrainBuilder.js`. Questa funzione utilizza l'immagine `heightmapIsland.png`, che non è altro che una heightmap, per posizionare i blocchi del terreno alla giusta altezza. Ogni pixel della heightmap rappresenta un blocco di lato 0.5, ovvero mezzo metro nella nostra convenzione.  
Solo i blocchi visibili del terreno vengono creati, ovvero i blocchi che si trovano in superficie e quelli che fanno parte di pareti verticali esposte. Ai confini del terreno, inoltre, un muro verticale di blocchi arriva fino all'altezza del punto più basso del terreno, in modo da far sembrare compatto il terreno quando visto dai lati.  
Le texture dei blocchi che compongono il terreno variano a seconda della loro altezza e del fatto che si trovino o meno in superficie. Ad esempio, i blocchi di erba vengono posizionati solo al di sopra di una certa altezza e solo se non ci sono altri blocchi direttamente al di sopra di loro.  
Inoltre, i blocchi d'erba possiedono diverse varianti, in modo che le loro facce laterali siano completamente composte da erba se subito al di sotto di tale faccia si trova un altro cubo di erba. In caso contrario, la faccia laterale in questione presenterà una parte superiore di erba e una inferiore di terra.  
Per diminuire l'impatto nelle prestazioni del terreno, i blocchi di superficie che si trovano ad una altezza inferiore o uguale a quella di tutti i blocchi di superficie ad essi adiacenti non generano ombre. Inoltre, invece di creare una nuova mesh per ogni blocco posizionato nel terreno, vengono clonate delle mesh create in precedenza.

Il mare, parte integrante del terreno, è un parallelepipedo con base di dimensioni quasi uguali a quelle del terreno che utilizza un materiale trasparente.

---

### Fish
Il costruttore `buildFish(color)` ritorna un Object3D di un pesce del colore fornito in input. 

![fish](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/fishes_example.png)

A seconda del tipo di animazione scelta, il pesce si muoverà su un tracciato a forma di cerchio oppure di "8". Il pesce inoltre muoverà la coda a destra e a sinistra per dare l'impressione che stia nuotando.

---

### Bridge
Il costruttore `buildBridge(height)` ritorna un Object3D di una sezione di ponte di altezza `height`. 

![bridge](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/bridge_example.png)

---

### Tree
Un albero, creato utilizzando il costruttore `buildTree(color)`. Al momento della sua creazione è possibile sceglierne il colore. 

![tree](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/tree_example.png)

Nel terreno sono stati aggiunti diversi alberi. Gli alberi uguali sono stati ottenuti clonando una stessa mesh, invece di crearne di separate. Quindi, per averli di dimensioni diverse, sono state applicate diverse scalature.

---

### Butterfly
Una farfalla, creata utilizzando il costruttore `buildButterfly(color)`. Nel momento della sua creazione è possibile scegliere il colore dele sue ali.

![butterfly](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/Butterflies.png)

Quando animate, si muoveranno su un tracciato ellittico, sbattendo le ali e ondeggiando in alto ed in basso durante lo spostamento.

---

### Pirate Flag
Una bandiera dei pirati, creata utilizzando il costruttore `buildPirateFlag()`. 

![pirateflag](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/PirateFlag.png)

Per rendere creare una animazione della bandiera che sventola, il tessuto è stato scomposto in diversi parallelepipedi (ognuno animato).

---

### Treasure Coffer 
Un forziere, creato utilizzando il costruttore `buildCoffer()`. 

![coffer](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/RCoffer.png)

Alla pressione del tasto `O` il forziere si aprirà e si chiuderà dopo un tempo prefissato, emettendo suoni all'apertura e alla chiusura.

---

### Cannon
Un cannone, creato utilizzando il costruttore `buildCannon()`. 

![cannon](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/RCannon.png)

Alla pressione del tasto `F` la miccia si "accenderà", ovvero emetterà un suono e genererà fumo e scintille. Dopo qualche secondo il cannone "sparerà" una palla di cannone. Dopo lo sparo, una piccola colonna di fumo si alzerà dalla bocca del cannone.

---

### Magic Statue 
Una statua magica, creata utilizzando il costruttore `buildStatue()`. 

![statue](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/RStatue.png)

Attraverso l'alternanza di molteplici texture, è stata creata una animazione grazie alla quali gli occhi della statua sembrano lampeggiare.

---

### Clouds

Delle nuvole animate che si muovono in continuazione nel cielo. Per nascondere il confine del piano su cui appaiono le nuvole è stata aggiunta una nebbia alla scena.  
Il codice deputato alla creazione ed animazione delle nuvole si trova all'interno di `terrainBuilder.js`. L'animazione, in particolare, funziona incrementando continuamente l'offset della texture delle nuvole.

![clouds](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/clouds_example.png)

---

### Day/night cycle

Tramite la pressione del tasto `N` è possibile simulare un ciclo giorno/notte attivando un'animazione che sposta la DirectionalLight e ne cambia l'intensità. Anche l'intensità della HemisphereLight viene modificata durante il corso della giornata simulata. Lo sfondo reagisce anch'esso al cambiamento cambiando colore gradualmente in base alla percentuale di animazione a cui si è arrivati. Alla successiva pressione del tasto la luce torna nella sua posizione di default.

![DayNightCycle](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/RDayNight.png)

--- 

### Ambient Sounds 

Tramite la pressione del tasto `P` è possibile attivare dei suoni ambientali di sottofondo.

---

### Overlay

Un overlay che mostra i tasti della tastiera da premere per effettuare certe azioni. Nascondibile premendo il tasto `Esc`.

![Overlay](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/ROverlay.png)

# Processo di sviluppo

Le feature da sviluppare individuate all'inizio dei lavori sono state divise in tre gruppi con crescenti priorità, in modo da distinguere le feature che rappresentavano le basi fondanti del progetto, quelle che pur essendo meno importanti dovevano essere comunque obbligatoriamente completate e quelle di minore importanza che non erano strettamente necessarie. In corso d'opera ci sono stati vari ridimensionamenti e aggiunte, come ad esempio il cannone e il forziere, in modo da rispecchiare la nostra volontà sull'obiettivo finale del progetto.

La modellazione degli oggetti è stata fatta usando solo i metodi fornitoci dalla libreria di three.js, senza l'uso di strumenti esterni. Le texture sono state realizzate tutte personalmente da noi utilizzando un *raster graphic editor* (Paint per Windows e Pinta per Ubuntu). 

Nel progetto sono stati utilizzati i seguenti suoni, tutti provvisti di una licenza Creative Commons 0.

> fuse2.wav by j1987 on freesound.org  
> Cannon1.wav by Isaac200000 on freesound.org  
> Chest Opening.wav by spookymodem on freesound.org  
> Chest Slam by TNTdude7 on freesound.org  
> Tropical Island by richwise on freesound.org  
