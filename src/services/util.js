export default {
    objectToArray(object, fieldName) {
        const keys = Object.keys(object);
        const values = Object.values(object);
        return values.map((value, index) => {
            value[fieldName] = keys[index];
            return value;
        });
    }
}