import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'detailsKeys'})
export class DetailsKeysPipe implements PipeTransform {
  transform(keys) {
    const forbiddenKeys = ['base64', 'id'];
    return keys.filter(k => !forbiddenKeys.includes(k));
  }
}