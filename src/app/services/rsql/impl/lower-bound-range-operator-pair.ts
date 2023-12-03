import {FieldOperatorPair} from "../field-operator-pair";
import {RsqlOperators} from "../rsql-operators";

export class LowerBoundRangeOperatorPair extends FieldOperatorPair<number> {
    constructor(field: string) {
        super(field, RsqlOperators.GREATER_THAN_OR_EQUAL);
    }

    protected toApplySearch(argument: number): boolean {
        return !!argument;
    }

    protected toQueryArgument(argument: number): string {
        return `${argument}`;
    }
}