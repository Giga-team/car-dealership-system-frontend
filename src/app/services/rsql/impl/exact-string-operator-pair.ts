import {FieldOperatorPair} from "../field-operator-pair";
import {RsqlOperators} from "../rsql-operators";

export class ExactStringOperatorPair extends FieldOperatorPair<string> {

    constructor(field: string) {
        super(field, RsqlOperators.EQUALS);
    }

    protected toApplySearch(argument: string): boolean {
        return !!argument;
    }

    protected toQueryArgument(argument: string): string {
        return `${argument}`;
    }
}