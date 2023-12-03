import {RsqlOperators} from "./rsql-operators";

export class RsqlQueryBuilder {
    constructor(private queryStr: string = '') { //TODO: Pass the 'baseQuery' to save query after clear if necessary
    }

    public appendWithAndOperator(subquery: string): void {
        if (!subquery) {
            return;
        }

        this.queryStr = !this.queryStr
            ? `${subquery}`
            : `${this.queryStr}${RsqlOperators.AND}${subquery}`
    }

    public getFinalQuery(): string {
        let result: string = this.queryStr;
        this.queryStr = '';

        return result;
    }
}