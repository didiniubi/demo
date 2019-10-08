class baseRes {
    constructor(data, message) { // 有数据时  data是个数组 
        if(typeof data == 'string') { 
            this.message = data;
            message = null;
            data = null;
        }
        if(data) {
            this.data = data;
        }
        if(message) {
            this.message = message
        }
    }
}

class successRes extends baseRes {
    constructor(data, message) {
        super(data, message);
        this.errorno = 0; // 通过errorno 看是否成功
    }
}

class errorRes extends baseRes {
    constructor(data, message) {
        super(data, message);
        this.errorno = -1;
    }
}

module.exports = {
    successRes,
    errorRes
}