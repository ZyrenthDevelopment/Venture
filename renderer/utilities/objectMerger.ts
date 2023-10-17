type Mergeable = Record<string, any> | any[];

function isMergeable(obj: any): obj is Mergeable {
    return typeof obj === 'object' && obj !== null;
}

export default function mergeObjects<T extends Mergeable>(target: T, ...sources: Mergeable[]): T {
    if (!sources.length) return target;

    const source = sources.shift();
    if (isMergeable(target) && isMergeable(source)) {
        if (Array.isArray(target) && Array.isArray(source)) {
            target.push(...source);
        } else if (!Array.isArray(target) && !Array.isArray(source)) {
            for (const key in source) {
                if (isMergeable(source[key])) {
                    if (!target[key]) target[key] = Array.isArray(source[key]) ? [] : {};
                    mergeObjects(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }
    }

    return mergeObjects(target, ...sources);
}