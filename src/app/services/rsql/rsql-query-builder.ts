import {RsqlOperators} from "./rsql-operators";

export class RsqlQueryBuilder {
    constructor(private queryStr: string = '') { //TODO: Pass the 'baseQuery' to save query after clear if necessary
    }

    public addEquals(field: string, value: string): void {
        this.appendWithAndOperator(`${field}${RsqlOperators.EQUALS}${value}`);
    }

    private appendWithAndOperator(subquery: string): void {
        this.queryStr = this.queryStr === ''
            ? `${subquery}`
            : `${this.queryStr}${RsqlOperators.AND}${subquery}`
    }

    public addNotEquals(field: string, value: string): void {
        this.appendWithAndOperator(`${field}${RsqlOperators.NOT_EQUALS}${value}`);
    }

    public addLessThan(field: string, value: string): void {
        this.appendWithAndOperator(`${field}${RsqlOperators.LESS_THAN}${value}`);
    }

    public addLessThanOrEqual(field: string, value: string): void {
        this.appendWithAndOperator(`${field}${RsqlOperators.LESS_THAN_OR_EQUAL}${value}`);
    }

    public addGreaterThan(field: string, value: string): void {
        this.appendWithAndOperator(`${field}${RsqlOperators.GREATER_THAN}${value}`);
    }

    public addGreaterThanOrEqual(field: string, value: string): void {
        this.appendWithAndOperator(`${field}${RsqlOperators.GREATER_THAN_OR_EQUAL}${value}`);
    }

    public addIn(field: string, values: string[]): void {
        let value: string = '(' + values.join(',') + ')';
        this.appendWithAndOperator(`${field}${RsqlOperators.IN}${value}`);
    }

    public addOut(field: string, values: string[]): void {
        let value: string = '(' + values.join(',') + ')';
        this.appendWithAndOperator(`${field}${RsqlOperators.OUT}${value}`);
    }

    public getFinalQuery(): string {
        let result: string = this.queryStr;
        this.queryStr = '';

        return result;
    }
}