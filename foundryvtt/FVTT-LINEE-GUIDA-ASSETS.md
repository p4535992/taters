# [Lista dei moduli sempre aggiornati](https://github.com/p4535992/taters/blob/master/foundryvtt/FVTT-MODULESv4.md)


# Linee guida per una gestione furba degli assets su FoundryVTT

# Documenti e risorse utili per iniziare (ancora in scrittura, i documenti potrebbero variare)

### Documento di preparazione a FoundryVTT per GM e Player

[LINK PDF](https://github.com/p4535992/taters/blob/master/docs/FoundryVTTDoc/Preparazione_Campagna.2022-11-14.pdf)

### Documento per la gestione del background customizzato (di solito per giocatori esperti che vogliono arricchire il proprio personaggio)

[LINK PDF](https://github.com/p4535992/taters/blob/master/docs/FoundryVTTDoc/Backstory_e_dettagli_del_personaggio.2022-10-27.docx)

### I moduli testati e consigliati per FoundryVTT (per adesso secondo 4535992 poi dovremo decidere insieme)

[LINK LISTA MODULI by 4535992](https://github.com/p4535992/taters/blob/master/foundryvtt/FVTT-MODULESv4.md)

# Linee guida degli assets

Non sto a entrare nei dettagli tecnici, ma queste sono le linee guida consigliate per evitare problemi con il codice degli sviluppatori.

### I nomi dei file e delle cartelle

1) Evitare nei nomi dei file degli assets spazi bianchi (molto importante), eventualmente sostituire con il carattere `_`
2) Evitare nei nomi dei file degli assets i seguenti caratteri speciali **( { } [ ] ( ) / \ ' " \` ~ , ; : . < > )**
3) I nomi delle cartelle SEMPRE tutti in minuscolo eventualmente il nome della cartella `Immagini Fiche` diventa `immagini_fiche`

#### Regole Opzionali consigliate, ma non sono essenziali:

4) Mettere nel nome delle immagini (in particolare per le scene) i riferimenti alle dimensioni, per esempio un'immagine di una caverna di dimensione 48x64 dovrebbe avere il nome `caverna_48x64.png`
5) Mettere nel nome delle immagini (in particolare per le scene) i riferimenti al fatto che sono di una mappa illuminata o non `caverna_lit_48x64.png`, `caverna_no_lit_48x64.png`
6) Mettere nel nome delle immagini (in particolare per le scene) i riferimenti al fatto che sono varianti di una mappa `caverna_summer_lit_48x64.png`, `caverna_winter_no_lit_48x64.png`

# Il formato e la dimensione degli assets

1) qualunque sia l'assets audio, video, immagine visto che non tutti abbiamo la fibra e il supercomputer con la CPU 8GB **NESSUN FILE DOVRA' ESSERE SUPERIORE AI 20 MB**, eventualmente nella sezione `TOOL` è possibile trovare dei programmi che comprimono o tagliano tali elementi, per esemio è inutile caricare in file mp4 da 169MB in 4k che è in pratica un loop dei medesimi 30 secondi, si taglia il video ai primi 30 secondi di dimensione di circa 6MB in 4k e il loop viene impostato su FoundryVTT.
2) Tutti i file immagine superiori ai 20MB possono essere ridotte anche dell' 80% semplicemente convertendo l'immagine nel formato `webp`.

#### Regole Opzionali consigliate, ma non sono essenziali:

3) Il formato preferenziale dei file audio è `.ogg` maggiore qualità e meno spazio usato rispetto al classico mp3.

# Come installare e utilizzare git (base)

1) Andare sul sito [Git](https://git-scm.com/download/)
2) Scaricare l'eseguibile ed installare

### Interfaccia grafica per git

Un tool utile per chi non è "codice dipendente" è il software [Tortoisegit](https://tortoisegit.org/download/) che aggiungi nelle voci di contesto di windows (click con il destro), le opzioni per i comandi base di git:

- git clone (download = scarica il progetto git)
- git commit (preparazione all'upload = indicizza i file da te modificati in locale)
- git push (upload = carica la tua roba)
- git pull (aggiornamento = prende le modifiche fatte da altri)

### Come caricare file di dimensioni superiori ai 100 mb su git

![img1](https://miro.medium.com/max/1140/1*CxjIFTuTb_tguRX3P08i6Q.jpeg)

Quindi l'altro giorno mi sono imbattuto in questo errore durante il caricamento di un file MP4 in cui Github afferma che non accetterà file superiori a 100 MB.

Questo mi ha fatto capire che abbiamo dato Github per scontato e che dovremmo usarlo più saggiamente... lol, scherzo ... Ecco come caricare i file superiori ai 100mb su github repository:

1) scarica e installa Git-lfs ( Git Large File Storage ) da [qui](https://git-lfs.github.com/).
2) imposta Git lfs per il tuo account utente git lfs install.
3) se hai già provato a eseguire il commit di file di grandi dimensioni e hai ricevuto l'errore, devi prima annullare il commit, utilizzare git reset — soft HEAD~1 altrimenti ignora questo passaggio.
4) Seleziona i tipi di file che vuoi che Git-lfs gestisca usando il comando `git lfs track "*.mp4"` sul progetto git, questo crea un file `.gitattributes` sulla root del progetto.
5) aggiungere il file `.gitattributes` insieme ad altri file di cui è necessario eseguire il commit e inviare le modifiche.

```
git add .gitattributes
git commit -m "Messaggio qualsiasi"
git push origin master
```

i seguenti comandi possono esseri fatti anche da interfaccia grafica con il programma `tortoisegit` sopra citato

# TOOL

Raccolta dei tool gratuiti e/o a pagamento che è possibile usare per gestire gli assets e/o comunque le campagne. 

Sono quelli consigliati e testati per i vari scopi.

### Gestione dei documenti

- [UPDF](https://updf.com/)
    - A pagamento (50 euro per una lcienza a vita)
    - Il migliore  che abbia provato fa sia OCR che compressione
    - Altamente consigliato

### Gestione delle immagini

- [Paint.net](https://www.getpaint.net/) (Consigliato)
    - Gratuito
	- Conversione dei file immagine nei vari formati (esempio .webp)
	- Rimozione dle background delle immagini per creare token customizzati
	- Moltre altre funzionalità

- [XnConvert](https://www.xnview.com/en/xnconvert/) (Consigliato)
    - Gratuito
    - Permette la conversione di immagini in gerarchie di cartelle con pochissimi click, è stato usato con successo per convertire intere gerarchie di cartelle di immagini png, jpg in formato webp
    - Moltre altre funzionalità

- [DP Animation Maker](https://www.animationsoftware7.com/)
    - A pagamento
	- Permette ci creare immagini animate con centinaia di effetti diversi per creare effetti molto cool
    - Moltre altre funzionalità

- [Draw.io](https://app.diagrams.net/) (Consigliato)
    - Gratuito
    - Offline e Online
    - Permette ci creare grafici di gestione della campagna ed esportarli come immagini, utile in alcuni contesti come la visualizzazione di un'albero familiare o la gerarchia dei casati , di seguito un paio d'esempi:

![img1](https://i.imgur.com/txWeIod.png)

![img2](https://i.imgur.com/igF6ShP.png)

- [NAPS2](https://www.naps2.com/)
    - Gratuito
    - Offline
    - Permette di estrarre testo dalle imaagini, classico caso ho trovato una risorsa homebrew sul web che mi piace, ma è in formato immagine, con questo programma posso rendere l'iimagine un pdf consultabile.

- [NewOCR](https://www.newocr.com/) (Consigliato)
    - Gratuito
    - Online
    - Il migliore tool testato per l'estrazione del testo dalle immagini

- [GIMP](https://www.gimp.org/)
    - Gratuito
    - Offline
    - Permette di fare qualunque cosa sule immagini se lo si sa utilizzare

- [imgur](https://imgur.com/?) (Consigliato)
    - Gratuito
    - Online
    - Servizio Web di storage delle immagni, l'UNICO senza il fastidioso CORS (Cross origin Site), le immagini sono visualizzabili in quauqnue contesto anche su server conc certificato non valido

- [Adapter](https://macroplant.com/adapter)

- [Caesium Image Compressor](https://saerasoft.com/caesium)
    - Gratuito
    - Ottimo nella compressione di immagini

### Gestione degli audio

- [QWinFF](https://qwinff.github.io/) (Consigliato)
    - Gratuito
    - Offline
    - Conversione dei file audio nei vari formati (esempio .ogg)

- [Voxal Voice Changer](https://www.nchsoftware.com/voicechanger/index.html)
    - A Pagamento
    - Offline
    - Permette di cambiare la propria voce durante le sessioni

- [MorphVOX Pro](https://screamingbee.com/morphvox-voice-changer)
    - A Pagamento
    - Offline
    - Conesso direttamente a discord
    - Permette di cambiare la propria voce durante le sessioni

- [Juke Host](https://jukehost.co.uk/)

- [Adapter](https://macroplant.com/adapter)

- [Free Sounds](https://www.freesoundeffects.com/)

- [soundbible](https://soundbible.com/1348-Large-Fireball.html)

### Gestione dei video

- [Handbrake](https://handbrake.fr/) (Consigliato)
    - Gratuito
    - Offline
    - Conversione dei file video nei vari formati (esempio .ogg)
    - Permette di comprimere file video 4K in file di dimensione accettabile con una riduzione della qualità praticamente impercettibile se configurato correttamente
    - Moltre altre funzionalità
  
- [GifTuna](http://giftuna.io/)
    - Gratuito
    - Offline
    - Converte file video in GIF in modo efficiente

- [OBS Studio](https://obsproject.com/)
    - Gratuito
    - Offline
    - Strumento utilissimo per realizzare video tutorial o da applicativi oda browser, registra in modo perfetto anche l'audio e i movimenti del mouse
  
- [Adapter](https://macroplant.com/adapter)

- [WebMConverter](https://github.com/argorar/WebMConverter?tab=readme-ov-file)

### Gestione dei Token

- [Token Tool](https://www.rptools.net/toolbox/token-tool/) (Consigliato)
    - Gratuito
    - Offline
    - E' completamente offline e customizzabile con le proprie immagini di token

- [Token Stamp](https://rolladvantage.com/tokenstamp/)
    - Gratuito
    - E' online e non pienamente customizzabile

- [AnimatedTokenMaker](https://github.com/EttienneS/AnimatedTokenMaker) (Consigliato)
    - Gratuito
    - Offline
    - Ottimo tool per creare i famosi token animati in formato "webp" da video, gif, e combinazioni varie di background

- [Mumble Server](https://www.mumble.info/) (Consigliato)
    - Gratuito
    - Offline
	- Ottima alternativa a Discord e Teamspeak che rubano banda in modo assurdo
	- Il server di chat audio più performante, semplice individuato finora, unico lato negativo richiede un'installazione "fai da te"

### Gestione attraverso i browser

- [Brave](https://brave.com/) (Consigliato)
    - Gratuito
    - Online
    - Il browser più performante testato con foundryvtt e mobile utile per chi ha pc o telefoni un pò datati riduce di molto la banda utilizzata dai browser classici

- [5etools](https://5e.tools/) (Consigliato)
    - Gratuito
    - Online
    - L'archivio de facto della quinta edizione di D&D, comprensivo di tutte le risorse ufficiali e non.

### Gestione della campagna

- [Kanka.io](https://kanka.io/) (Consigliato)
    - Software per la gestione ottimizzata delle note, diari delle sessioni e house rules.
    - Esiste un connettore con foundryVTT molto ben fatto e gratuito chiamato ["Kanka-Foundry"](https://foundryvtt.com/packages/kanka-foundry).
	- L’invito della campagna su kanka è opzionale serve al master per tenere traccia dell’avventura Se interessati arriverà dal master sulla email che i player gli forniranno come riferimento attraverso canali privati.
	Il motivo per cui si "aggiunge" kanka come gestore è per permettere l’accesso 24 ore su 24 agli utenti ai dati della campagna poichè il server di foundry a volte potrebbe essere spento o in manutenzione o acceso, ma con una campagna differente attiva.
	- L'interfaccia sembra funzionare bene su mobile per la consultazione da parte dei player.

### Gestione su Discord attraverso i bot

- [SinusBot](https://www.sinusbot.com/)
  - Gratuito
  - Permette di gestire grosse collezioni di audio su discord, riducendo la banda utilizzata su FoundryVTT

- [discord-audio-pipe](https://github.com/QiCuiHub/discord-audio-pipe)
  - Gratuito
  - Simple program to send stereo audio (microphone, stereo mix, virtual audio cable, etc) into a discord bot.
  - I use [Discord audio pipe](https://github.com/QiCuiHub/discord-audio-pipe/) coupled with a [virtual audio cable](https://vb-audio.com/Cable/index.htm), the combination of which allows you to connect a bot to Discord from your local computer and stream media to your voice channel. This has the added benefit of keeping the music stream as a separate client so other people can manage the volume as they like. With this setup, you can't stream directly from YT/Spotify/etc but there are other tools you can use to download those media files should you so choose.

# mapping-icons
Picking the perfect set of map icons for your web map can be hard, especially when you do not know where to find them. As a GIS web Developer, most of my projects –  if not all – involve showing some points of interest or other locational information with markers. The Internet is a massive resource, but where do you get them?

Here I have compiled a list of sites where you can readily find awesome icons to use in your web-map for free.

###[Map Icons](http://map-icons.com/)

###[Maki](https://www.mapbox.com/maki/)

###[Map Icons Collection](https://mapicons.mapsmarker.com/)

###[Google Maps Markers (GitHub)](https://github.com/Concept211/Google-Maps-Markers)

###[OSM icons](http://osm-icons.org/wiki/Icons)

###[opensreetmap-carto](https://github.com/gravitystorm/openstreetmap-carto/tree/master/symbols)

###[Weather Icons](https://github.com/erikflowers/weather-icons)

###[Game Icons](https://game-icons.net/)










