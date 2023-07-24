export function getOrCreate<K, V>(map: Map<K, V>, key: K, create: () => V) {
    return (map.has(key) ? map : map.set(key, create())).get(key) as V;
}
