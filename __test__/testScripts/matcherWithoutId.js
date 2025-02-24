export function extendsWithoutId() {
    expect.extend({
        toMatchWithoutIds(received, expected) {
            const receivedWithoutIds = JSON.parse(JSON.stringify(received, (key, value) =>
                key === 'id' ? undefined : value
            ));
            const expectedWithoutIds = JSON.parse(JSON.stringify(expected, (key, value) =>
                key === 'id' ? undefined : value
            ));
            return {
                pass: JSON.stringify(receivedWithoutIds) === JSON.stringify(expectedWithoutIds),
                message: () => 'Objects match when ignoring IDs'
            };
        }
    });
}
