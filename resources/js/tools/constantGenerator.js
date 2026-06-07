import { escapeSingleQuoted, toConstantCase, toPascalCase } from './helpers';

function valuesFromInput(input) {
    return String(input ?? '')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
}

export function generateConstants(input, mode) {
    const values = valuesFromInput(input);

    if (mode === 'php-enum') {
        const cases = values
            .map((value) => `    case ${toPascalCase(value)} = '${escapeSingleQuoted(value)}';`)
            .join('\n');

        return `enum Status: string\n{\n${cases}\n}`;
    }

    if (mode === 'js-object') {
        const pairs = values
            .map((value) => `    ${toConstantCase(value)}: '${escapeSingleQuoted(value)}',`)
            .join('\n');

        return `const STATUS = {\n${pairs}\n};`;
    }

    if (mode === 'ts-enum') {
        const cases = values
            .map((value) => `    ${toPascalCase(value)} = '${escapeSingleQuoted(value)}',`)
            .join('\n');

        return `export enum Status {\n${cases}\n}`;
    }

    return values
        .map((value) => `const ${toConstantCase(value)} = '${escapeSingleQuoted(value)}';`)
        .join('\n');
}
