import {AnyConstructor} from "../typescript.js"

export function valueClassOf<FieldsClass extends AnyConstructor>(Fields: FieldsClass) {
    return class extends Fields {
        equals(_: unknown) {
            // TODO
        }

        hashCode() {
            // TODO
        }
    }
}
