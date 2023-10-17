export default function UpsertKeyValue(obj, keyToChange, value) {
    const keyToChangeLower = keyToChange.toLowerCase();
    for (const key of Object.keys(obj)) {
        if (key.toLowerCase() === keyToChangeLower) {
            obj[key] = value;
            return;
        }
    }
    obj[keyToChange] = value;
}