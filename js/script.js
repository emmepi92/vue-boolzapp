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
            currentUser: 0,
            inputMsg:{},
            filter: '',  
            newContacts: []    
        },
        methods: {
            createSrc: function (contact) {                
                return './img/avatar' + contact.avatar +'.jpg';
            },
            isASentMsg: function (status) {
                if (status === 'sent'){
                    return true;
                }
            },
            changeUser: function(index) {
                return this.currentUser = index;
            },
            answer: function (index) {
                let answer = {status: 'received', text: 'ok', date: '10/01/2020 15:30:55'};
                this.contacts[index].messages.push(answer);             
            },
            sendAMessage: function(index) {  
                if (this.inputMsg.text.trim() !== '') {
                    let newMsgToSend ={...this.inputMsg, status: 'sent',date:'10/01/2020 15:51:59'} ;  
                    this.inputMsg.text='';           
                    this.contacts[index].messages.push(newMsgToSend);   
                    setTimeout(this.answer(index),5000);  // TODO non funzia il timer
    
                }         
            },
            filteredContacts: function () {
                return this.newContacts = this.contacts.filter((contact)=> {
                    if (contact.name.toLowerCase().includes(this.filter.toLowerCase())) {
                        return true;
                    }
                    return false;
                });
            },
            printContacts: function() {
                if(this.newContacts.length === 0){
                    return true
                }               
            }
                
        }
    }
)