Vue.config.devtools = true;
  
const add = new Vue (
    {
        el: '#app',
        data: {
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
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
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
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
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
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
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ],
            //contatto selezionato
            currentUser: 0,                  
            //messaggio in input da inviare
            inputMsg:{},                     
            // filtro della ricerca
            filter: '',                      
            // data per i nuovi msg
            datatime: '',                    
            //classe menu a tendina
            displayOptions:'d-none',         
            //indice del messaggio sul quale si è cliccato, per la tendina
            indexMsg: 0,                     
            //ultimo accesso da mostrare al contatto selezionato
            lastAccess:'10/01/2020 16:15:22' 
        },
        methods: {

            //uso la proprietà visible per nascondere o meno il contatto,
            //dopo che l'utente iserisce nell'input il filter 
            filteredContacts: function () {
                this.contacts.forEach(contact =>{
                    if (!contact.name.toLowerCase().includes(this.filter.toLowerCase())) {
                            contact.visible = false;
                    } else {
                        contact.visible = true;
                    }
                })
            },            
            getDataTimeNow: function () {
                this.datatime = dayjs();
                return this.datatime.format("DD/MM/YY HH:mm:ss")
            },
            createSrc: function (contact) {                
                return './img/avatar' + contact.avatar +'.jpg';
            },
            isASentMsg: function (status) {
                if (status === 'sent'){
                    return true;
                }
            },
            changeUser: function(index) {

                //chiudo tendina, altrimenti resta aperta sul messaggio con lo stesso index
                return this.currentUser = index;
            },
            sendAMessage: function(index) {
                
                //messaggio ne vuoto ne stringa di soli spazi
                if (this.inputMsg.text.trim() !== '') {

                    //creo un nuovo oggetto newMsgToSend, partendo dall'input salvato in inputMsg
                    //aggiungo la data e lo statu:'sent', e pusho
                    let newMsgToSend ={...this.inputMsg, status: 'sent',date: this.getDataTimeNow()};
                    this.contacts[index].messages.push(newMsgToSend);
                    
                    //reset dell'input
                    this.inputMsg.text='';
                    
                    //richiamo funzione risposta
                    this.answer(index);
                }         
            },
            answer: function (index) {
                setTimeout (() => {

                    //creo il nuovo oggetto da pushare nei msg
                    let answer = {status: 'received', text: 'ok', date: this.getDataTimeNow()};
                    this.contacts[index].messages.push(answer);

                    //aggiorno l'ultimo accesso
                    this.getLastAccess();
                },2000);
            },
            showOptions: function (index) {

                //essendo i messagi un array,salvo l'attuare 
                //index del messaggio, sul quale ho cliccato
                this.indexMsg = index;

                //al click mostro/nascondo la tendina
                if (this.displayOptions === 'd-none') {
                    return this.displayOptions = 'd-block'
                } else {
                    return this.displayOptions = 'd-none'
                } 
            },  
            deteteMsg: function (index) {
                
                //chiudo tendina, altrimenti resta aperta sul messaggio con lo stesso index
                this.closeOptions();                

                //elimino il messaggio
                this.contacts[this.currentUser].messages.splice(index,1);
            },
            getLastAccess: function() {

                //ciclo le date di tutti i messaggi del contatto selezionato
                //sovrascrivo la data dell'ultimo msg se lo stato è 'received'
                this.contacts[this.currentUser].messages.forEach((message)=>{
                    if (message.status === 'received') {
                        this.lastAccess = message.date
                    }
                return this.lastAccess
                })
            },
            closeOptions: function() {
                //chiudo la tendina, altrimenti resta aperta allo stesso indice
                this.displayOptions = 'd-none';
            }
        }
    }
)