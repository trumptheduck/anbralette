import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency_pipe',
})
export class CurrencyCustomPipe implements PipeTransform {
  transform(price: number) {
    let million = (price - (price % 1000000)) / 1000000;
    let thousand = (price - million*1000000)/1000;
    
    let thousand_string: string;
    if(thousand < 10) {
        thousand_string = `0${thousand}`
    } else if (thousand > 10 && thousand < 100) {
        thousand_string = `${thousand}`
    }else {
        thousand_string = thousand.toString();
    }
    
    let value;

    if(million == 0) {
      value = thousand_string + ',000 VNĐ' ;
    } else {
      value = million.toString() + ',' + thousand_string + ',000 VNĐ' ;
    }

    return value;
    
  }
}