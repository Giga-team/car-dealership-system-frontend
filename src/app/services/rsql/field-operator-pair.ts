export abstract class FieldOperatorPair<T> {
    protected constructor(private readonly field: string = '',
                          private readonly operator: string = ''
    ) {
    }

    public toQuery(argument: T): string {
        if (!this.toApplySearch(argument)) {
            return '';
        }

        return `${this.field}${this.operator}${this.toQueryArgument(argument)}`;
    }

    protected abstract toApplySearch(argument: T): boolean;

    protected abstract toQueryArgument(argument: T): string;
}