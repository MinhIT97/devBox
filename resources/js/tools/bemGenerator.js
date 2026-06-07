export function generateBem({ block, element, modifier }) {
    const b = String(block ?? '').trim();
    const e = String(element ?? '').trim();
    const m = String(modifier ?? '').trim();

    if (!b) {
        return '';
    }

    const elementClass = e ? `${b}__${e}` : '';
    const modifierClass = e && m ? `${elementClass}--${m}` : '';
    const css = [`.${b} {}`, elementClass ? `.${elementClass} {}` : '', modifierClass ? `.${modifierClass} {}` : '']
        .filter(Boolean)
        .join('\n');

    let html = `<div class="${b}">`;

    if (elementClass) {
        const classes = [elementClass, modifierClass].filter(Boolean).join(' ');
        html += `\n    <div class="${classes}"></div>\n`;
    }

    html += '</div>';

    return `${css}\n\nHTML:\n${html}`;
}
