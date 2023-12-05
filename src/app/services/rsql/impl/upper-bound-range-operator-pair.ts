import {FieldOperatorPair} from "../field-operator-pair";
import {RsqlOperators} from "../rsql-operators";

export class UpperBoundRangeOperatorPair extends FieldOperatorPair<number> {
    constructor(field: string) {
        super(field, RsqlOperators.LESS_THAN_OR_EQUAL);
    }

    protected toApplySearch(argument: number): boolean {
        return !!argument;
    }

    protected toQueryArgument(argument: number): string {
        return `${argument}`;
    }
}
