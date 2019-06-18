function reviver(key, value) {
  switch(value) {
    case 'String':
    case 'Image':
      return {
        type: String,
        required: true
      };
    case 'Number':
      return {
        type: Number,
        required: true
      };
    case 'Boolean':
      return {
        type: Boolean,
        required: true
      };
    case 'Array':
      return {
        type: Array,
        required: true
      };
    default:
      return value;
  }
}

export const convertToSchema = json => JSON.parse(json, reviver);
