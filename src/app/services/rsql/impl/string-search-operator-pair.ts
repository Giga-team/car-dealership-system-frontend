import {FieldOperatorPair} from "../field-operator-pair";
import {RsqlOperators} from "../rsql-operators";

export class StringSearchOperatorPair extends FieldOperatorPair<string> {
    constructor(field: string) {
        super(field, RsqlOperators.EQUALS);
    }

    protected toQueryArgument(argument: string): string {
        return `'*${argument}*'`;
    }

    protected toApplySearch(argument: string): boolean {
        return !!argument;
    }
}