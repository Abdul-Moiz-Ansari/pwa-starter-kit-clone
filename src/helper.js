
export const _toPrecision = (number) => {
    let _number,arrNumber,length;
    _number = number.toString();
    arrNumber = _number.split('.');
    if(arrNumber.length > 1){
        length = arrNumber[0].length + 1;
        return number.toPrecision(length + 1);
    }
    else{
        return number;
    }
}