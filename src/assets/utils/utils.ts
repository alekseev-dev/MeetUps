export const adaptToClient = (item: unknown): any => {
  if (Array.isArray(item)) {
    return item.map((el: unknown) => adaptToClient(el));
  } else if (typeof item === 'function' || item !== Object(item)) {
    return item;
  }

  return Object.fromEntries(
    Object.entries(item as Record<string, unknown>).map(
      ([key, value]: [string, unknown]) => [
        key.replace(/([-_][a-z])/gi, c => c.toUpperCase().replace(/[-_]/g, '')),
        adaptToClient(value),
      ],
    ),
  );
};

export const adaptToServer = (obj: Record<string, any>): Record<string, any> => {
  const adaptedObj: Record<string, any> = {};
  for (let key in obj) {
    const adaptedKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    if (typeof obj[key] === "object" && obj[key] !== null) {
      adaptedObj[adaptedKey] = adaptToServer(obj[key]);
    } else {
      adaptedObj[adaptedKey] = obj[key];
    }
  }

  return adaptedObj;
};
