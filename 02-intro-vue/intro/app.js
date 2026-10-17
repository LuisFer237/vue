const  { createApp, ref } = Vue;

const app = createApp({
    // template:
    // `
    // <h1>{{ message }}</h1>
    // <p>{{ author }}</p>
    // `,

    setup(){
        
        const message = ref("Hola, soy Goku");
        const author = ref("Goku");

        // setTimeout(() => {
        //     message.value = "Hola mundo desde el backend";
        //     author.value = "Clark Kent";
        // }, 1000); 

        const changeQuote = () =>{
            message.value = 'Soy Batman';
            author.value = 'Batman';
        }

        return {
            message,
            author,
            changeQuote
        }

    }
})

app.mount('#myApp');