return function insidetest(){
        let closure=5;
        console.log(global+" "+lexical+" "+closure);
    }