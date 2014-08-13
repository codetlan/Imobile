Ext.define('APP.core.FormatCurrency', {
    widget: 'currency',
    singleton: true,
    currencyPrecision: 2,
    currencySign: '$',
    currencyAtEnd: false,
    decimalSeparator: '.',
    thousandSeparator: ',',

    currency: function (v, currencySign, decimals, end) {
        var negativeSign = '',
            format = ",0",
            i = 0;
        v = v - 0;
        if (v < 0) {
            v = -v;
            negativeSign = '-';
        }

        decimals = Ext.isDefined(decimals) ? decimals : APP.core.FormatCurrency.currencyPrecision;

        format += format + (decimals > 0 ? '.' : '');
        for (; i < decimals; i++) {
            format += '0';
        }

        v = APP.core.FormatCurrency.formatValue(v);

        if ((end || APP.core.FormatCurrency.currencyAtEnd) === true) {

            return Ext.String.format("{0}{1}{2}", negativeSign, v, currencySign || APP.core.FormatCurrency.currencySign);

        } else {

            return Ext.String.format("{0}{1}{2}", negativeSign, currencySign || APP.core.FormatCurrency.currencySign, v);

        }
    },

    formatValue: function (nVal) {

//        nVal += '';
        nVal = nVal.toFixed(2);
        x = nVal.split(APP.core.FormatCurrency.decimalSeparator);
        x1 = parseFloat(x[0]).toString();//.toFixed(2);
//        x2 = x.length > 1 ? (x[1].length > 1? APP.core.FormatCurrency.decimalSeparator + parseFloat(x[1]).toFixed(2) : APP.core.FormatCurrency.decimalSeparator + x[1] + '0') : '.00';
        x2 = x.length > 1 ? APP.core.FormatCurrency.decimalSeparator + x[1] : '.00';
        var rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + APP.core.FormatCurrency.thousandSeparator + '$2');
        }
        return x1 + x2;
    },

    formatCurrencytoNumber: function (value){
        return parseFloat(value.replace(/[^0-9-.]/g, ''));
    }
});