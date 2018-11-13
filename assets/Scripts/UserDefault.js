window.UserDefault = {
    setBool:function(_key,_value){
        cc.sys.localStorage.setItem(_key,_value.toString())
    },
    
    getBool:function(_key){
        return cc.sys.localStorage.getItem(_key) == "false" ? false : true
    },
    
    setInt:function(_key,_value){
        cc.sys.localStorage.setItem(_key,_value.toString())
    },
    
    getInt:function(_key){
        return Number(cc.sys.localStorage.getItem(_key));
    },
    
    setString:function(_key,_value){
        cc.sys.localStorage.setItem(_key,_value)
    },
    
    getString:function(_key,_value){
        return cc.sys.localStorage.getItem(_key,_value);
    },
    
    setItem:function(_key,_value){
        cc.sys.localStorage.setItem(_key,JSON.stringify(_value));
    },
    
    getItem:function(_key,_value){
        return JSON.parse(cc.sys.localStorage.getItem(_key,_value));
    },
};