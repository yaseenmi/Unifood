class validator{

    static isEmpty = (value) => {
        if( value === '' || value === null ){
            return true
        }
        return false       
    }

    static isCharNumString = (value) => {
        let Exp = /^[0-9a-zA-Z]+$/;

        if(!Exp.test(value) || value.length < 3){
            return false
        }
        return true
    }

    static isEmail = (value) => {
        let Exp = /^(([^<>()[\]\\.,;:\s@`]+(\.[^<>()[\]\\.,;:\s@`]+)*)|(`.+`))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       
        if(!Exp.test(value)){
            return false
        }
        return true
    }

    static isEquale = (val1, val2) => {
        if(val1 != val2){
            return false
        }
        return true
    }

}

module.exports = validator