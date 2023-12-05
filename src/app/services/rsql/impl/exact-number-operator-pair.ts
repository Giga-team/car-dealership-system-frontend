import {FieldOperatorPair} from "../field-operator-pair";
import {RsqlOperators} from "../rsql-operators";

export class ExactNumberOperatorPair extends FieldOperatorPair<number> {
    constructor(field: string) {
        super(field, RsqlOperators.EQUALS);
    }

    protected toQueryArgument(argument: number): string {
        return `${argument}`;
    }

    protected toApplySearch(argument: number): boolean {
        return !!argument;
    }
}