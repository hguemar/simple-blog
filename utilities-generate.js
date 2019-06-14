module.exports = {
    makeString: function (length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 },

 randomDate: function (start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
}