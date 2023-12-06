import {FieldOperatorPair} from "../field-operator-pair";
import {RsqlOperators} from "../rsql-operators";

export class UpperBoundDateRangeOperatorPair extends FieldOperatorPair<Date> {
    constructor(field: string) {
        super(field, RsqlOperators.LESS_THAN_OR_EQUAL);
    }

    protected toApplySearch(argument: Date): boolean {
        return !!argument;
    }

    protected toQueryArgument(argument: Date): string {
        return `${argument.toISOString().replace('Z', '')}`;
    }
}