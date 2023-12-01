export class FieldOperatorPair {
    constructor(private readonly field: string = '', private readonly operator: string = '') {
    }

    public toQueryWithArgument(argument: string): string {
        return `${this.field}${this.operator}${argument}`;
    }
}