import {
    toCamelCase,
    toConstantCase,
    toDotCase,
    toKebabCase,
    toPascalCase,
    toSnakeCase,
    toTitleCase,
} from './helpers';

const converters = [
    ['camelCase', toCamelCase],
    ['PascalCase', toPascalCase],
    ['snake_case', toSnakeCase],
    ['kebab-case', toKebabCase],
    ['CONSTANT_CASE', toConstantCase],
    ['dot.case', toDotCase],
    ['Title Case', toTitleCase],
];

export function convertCases(input) {
    const lines = String(input ?? '').split(/\r?\n/);

    return converters.map(([label, converter]) => ({
        label,
        value: lines.map((line) => converter(line)).join('\n'),
    }));
}

export function serializeCaseRows(rows) {
    return rows.map((row) => `${row.label}: ${row.value}`).join('\n');
}
