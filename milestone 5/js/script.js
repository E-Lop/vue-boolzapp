/* Descrizione:
Milestone 1
Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto
Milestone 2
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello 
della conversazione
Click sul contatto mostra la conversazione del contatto cliccato 
Milestone 3
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
Milestone 4
Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite 
(es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina) 
BONUS:
Milestone 5
Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti */

// La milestone 2 l'ho fatta inconsapevolmente martedì a partire dal commit "conversazioni intrerattive"

var app = new Vue({
  el: '#root',
  data: {
    activeContact: '0',
    userFilterText: '',
    userNewMessage: '',
    activeMessage: null,
    chevronIsVisible: false,
    menuIsVisible: false,
    contacts: [
      {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            text: 'Hai portato a spasso il cane?',
            status: 'sent',
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Ricordati di dargli da mangiare',
            status: 'sent',
          },
          {
            date: '10/01/2020 16:15:22',
            text: 'Tutto fatto!',
            status: 'received',
          },
        ],
      },
      {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
          {
            date: '20/03/2020 16:30:00',
            text: 'Ciao come stai?',
            status: 'sent',
          },
          {
            date: '20/03/2020 16:30:55',
            text: 'Bene grazie! Stasera ci vediamo?',
            status: 'received',
          },
          {
            date: '20/03/2020 16:35:00',
            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
            status: 'sent',
          },
        ],
      },
      {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [
          {
            date: '28/03/2020 10:10:40',
            text: 'La Marianna va in campagna',
            status: 'received',
          },
          {
            date: '28/03/2020 10:20:10',
            text: 'Sicuro di non aver sbagliato chat?',
            status: 'sent',
          },
          {
            date: '28/03/2020 16:15:22',
            text: 'Ah scusa!',
            status: 'received',
          },
        ],
      },
      {
        name: 'Luisa',
        avatar: '_4',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            text: 'Lo sai che ha aperto una nuova pizzeria?',
            status: 'sent',
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Si, ma preferirei andare al cinema',
            status: 'received',
          },
        ],
      },
    ],
  },
  methods: {
    // indica quale contatto è attivo, resetta il messaggio attivo
    showThisConversation(index) {
      this.activeContact = index;
      this.activeMessage = null;
    },
    // aggiunge un messaggio dell'utente alla conversazione del contatto attivo
    //  e svuota il campo testo
    // se il messaggio non è vuoto
    addNewMessage() {
      currentDayAndTime = dayjs().format('DD/MM/YYYY HH:mm:ss');
      const userTrimmedMessage = this.userNewMessage.trim();
      thisMessageFlow = this.contacts[this.activeContact];
      if (userTrimmedMessage.length > 0) {
        thisMessageFlow.messages.push({
          date: currentDayAndTime,
          text: userTrimmedMessage,
          status: 'sent',
        });
        // svuotamento campo input messaggio
        this.userNewMessage = '';
        // dopo un secondo risposta automatica con 'ok'
        setTimeout(automaticReply, 1000);
        function automaticReply() {
          newDateAndTime = dayjs().format('DD/MM/YYYY HH:mm:ss');
          thisMessageFlow.messages.push({
            date: newDateAndTime,
            text: 'ok',
            status: 'received',
          });
        }
      }
    },
    // filtra i contatti in base al testo inserito dall'utente
    filterContactsByText() {
      // rendo lowercase il testo inserito dall'utente
      const userInputLowerCase = this.userFilterText.toLowerCase();
      this.contacts.forEach((element) => {
        // rendo lowercase il nome del contatto
        const contactNameLowerCase = element.name.toLowerCase();
        if (contactNameLowerCase.includes(userInputLowerCase)) {
          element.visible = true;
        } else {
          element.visible = false;
        }
      });
    },
    // rende il messaggio attivo e la sua chevron down visibile
    showMenu(index) {
      this.activeMessage = index;
    },
    // toggle che rende visibile il menu a tendina
    summonMenu() {
      this.menuIsVisible = !this.menuIsVisible;
    },
    // cancella il messaggio attivo, fa scomparire il menu a tendina e resetta messaggio attivo
    deleteMessage(index) {
      this.contacts[this.activeContact].messages.splice(index, 1);
      this.menuIsVisible = false;
      this.activeMessage = null;
    },
  },
});
