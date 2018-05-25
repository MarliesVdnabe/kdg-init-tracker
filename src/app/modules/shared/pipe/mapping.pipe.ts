import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mapping'
})
export class MappingPipe implements PipeTransform {
	transform(value, mappingFunction: Function) {
		return mappingFunction(value);
	}
}
