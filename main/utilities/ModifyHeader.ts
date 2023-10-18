export default function ModifyHeader(headers, keyToChange, value) {
    const keyToChangeLower = keyToChange.toLowerCase();
    for (const key of Object.keys(headers)) {
        if (key.toLowerCase() === keyToChangeLower) {
            headers[key] = value;
            return;
        }
    }
    headers[keyToChange] = value;
}