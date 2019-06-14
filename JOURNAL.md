# Progetto Interactive 3D Graphics: Product configuration

Come inizio del progetto, è stato che deciso che Eric Rossetto si occuperà della ricerca di un modello 3D con una licenza Creative Commons che possa essere usato per gli scopi del progetto, mentre Stefano Travasci realizzerà la pagina web del sito internet fittizio in cui si troverà il canvas con l'anteprima del prodotto.

## Completata la pagina web
```01.06.2019 - 18:48```

Completata la pagina web del negozio online fittizio.

![Pagina web completata](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-travasci-rossetto/master/screenshots/Completata%20pagina%20web.PNG)

- Stefano Travasci

## Riempito il testo della pagina
```02.06.2019 - 00:30```

Sostituito il testo placeholder della pagina web con un testo appropriato al negozio immaginario e all'oggetto venduto.

- Stefano Travasci

## Integrata la scena nella pagina web
```04.06.2019 - 00:52```

La scena contenente gli occhiali che era stata creata nel file main.html è stata ora integrata nella pagina web del negozio online fittizio.

![Pagina web integrata](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-travasci-rossetto/master/screenshots/integrata%20la%20scena.PNG)

- Stefano Travasci

## Aggiunto sfondo
```04.06.2019 - 01:56```

Aggiunto lo sfondo alla scena. In futuro questo sfondo sarà usato come environment map.

![Pagina web integrata](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-travasci-rossetto/master/screenshots/aggiunto%20sfondo.PNG)

- Stefano Travasci

## Modello e codice di shading
```04.06.2019 - 09:08```

Aggiunto il modello. Ricalcolate normali e sistemati errori nel modello preso dal web. Aggiunto un codice basic di shading combinato (Lambertian + microfacet).

- Eric Rossetto

## Modello e codice di shading
```05.06.2019 - 11:08```

Cambiato modello e aggiunta un prima versione di shading per materiali metallici.

model credits:  https://www.blendswap.com/blends/view/70347

![Occhiali](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-travasci-rossetto/master/screenshots/glasses_first_render.png)

- Eric Rossetto

## Cambio dei materiali
```05.06.2019 - 19:51```

Implementato il codice per cambiare il materiale delle stanghette degli occhiali tramite i pulsanti. Regolata la posizione della luce e dell'oggetto. Modificato il fragment shader in modo che usi anche le texture maps per l'illuminazione speculare.

![Cambiamento dei materiali](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-travasci-rossetto/master/screenshots/CambioMateriali.PNG)

- Stefano Travasci

## Normal mapping
```06.06.2019 - 11:23```

Cambiato il tipo di file del modello da .obj a .gltf in modo che questo supporti le tangenti per un corretto calcolo del normal mapping. Aggiunte le linee di codice per quest'ultimo.

![nrm-map](https://github.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-travasci-rossetto/blob/master/images/normal_mapping.png)

- Eric Rossetto

## Riflesso delle lenti
```06.06.2019 - 16:25```

Aggiunto il riflesso dell'environment map sulle lenti degli occhiali.

![Riflesso sugli occhiali](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-travasci-rossetto/master/screenshots/Aggiunto%20riflesso%20delle%20lenti.PNG)

- Stefano Travasci

## Rotazione della camera
```07.06.2019 - 00:20```

La videocamera virtuale girerà attorno agli occhiali fino a quando non si clicca sul canvas.

- Stefano Travasci

## Rifrazione delle lenti
```08.06.2019 - 11:20```

Aggiunto un effetto di rifrazione sulle lenti. 

- Eric Rossetto

## Cambiamento tra i tipi di lente
```08.06.2019 - 20:12```

Aggiunto un pulsante per cambiare il tipo delle lenti da quelle riflettenti a quelle opache. Cambiato inoltre il colore delle lenti opache ad un colore più adatto ad esse.

![Cambiamento tipi di lente](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-travasci-rossetto/master/screenshots/Pulsante%20cambio%20delle%20lenti.PNG)

- Stefano Travasci

## Irradiance map
```11.06.2019 - 5:12```

Aggiunta una possibile implementazione di Irradiance map con una cubetexture pre-computata.

- Eric Rossetto

## Nuovo sfondo
```14.06.2019 - 18:16```

Aggiunta la possibilità di passare tra il vecchio sfondo ed uno nuovo premendo un pulsante. Questo sfondo ha una propria illuminazione diversa da quello vecchio; anche i riflessi e le trasparenze delle lenti cambiano insieme allo sfondo per adattarsi ad esso.

![Nuovo sfondo](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-travasci-rossetto/master/screenshots/nuovo%20sfondo.PNG)

- Stefano Travasci

## Illuminazione ambientale
```14.06.2019 - 20:34```

Aggiunta una semplice debole illuminazione ambientale.

![Nuovo sfondo](https://github.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-travasci-rossetto/blob/master/screenshots/illuminazione%20ambientale.PNG)

- Stefano Travasci
