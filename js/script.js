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
            datatime: '',
            displayOptions:'d-none',
            currentMsg: 0,
            indexMsg:0
        },
        methods: {
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
                return this.currentUser = index;
            },
            sendAMessage: function(index) {  
                if (this.inputMsg.text.trim() !== '') {
                    let newMsgToSend ={...this.inputMsg, status: 'sent',date: this.getDataTimeNow()} ;  
                    this.inputMsg.text='';
                    this.contacts[index].messages.push(newMsgToSend);
                    this.answer(index);
                }         
            },
            answer: function (index) {
                setTimeout (() => {
                    let answer = {status: 'received', text: 'ok', date: this.getDataTimeNow()};
                    this.contacts[index].messages.push(answer);
                },2000);
            },
            showOptions: function (index) {
                this.indexMsg = index;
                if (this.displayOptions === 'd-none') {
                    return this.displayOptions = 'd-block'
                } else {
                    return this.displayOptions = 'd-none'
                } 
            },  
            deteteMsg: function (index) {
                //se cancello il primo msg, la tendina resta aperta
                //cosi no :
                this.displayOptions = 'd-none'; 
                
                this.contacts[this.currentUser].messages.splice(index,1);
            }     
        }
    }
)