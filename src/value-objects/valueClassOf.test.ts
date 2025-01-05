import {test, expect, is} from "@benchristel/taste"
import {valueClassOf} from "./valueClassOf.js"

class PersonFields {
    constructor(
        params: PersonFields,
        public name: string = params.name,
        public age: number = params.age,
    ) {}
}

class Person extends valueClassOf(PersonFields) {
    inspect() {
        return `${this.name}, ${Math.floor(this.age)}`
    }
}

test("valueClassOf", {
    "creates a base data class that can be extended with methods"() {
        const bob = new Person({name: "Bob", age: 21})

        expect(bob.inspect(), is, "Bob, 21")
        bob.inspect() satisfies string
        // @ts-expect-error - bob.inspect() should be a string
        bob.inspect() satisfies number
    },

    "preserves the raw data fields"() {
        const bob = new Person({name: "Bob", age: 21})

        expect(bob.age, is, 21)
        bob.age satisfies number
        // @ts-expect-error - bob.age should be a number
        bob.age satisfies string
    },

    "preserves JSONification behavior"() {
        const bob = new Person({name: "Bob", age: 21})
        expect(JSON.stringify(bob), is, `{"name":"Bob","age":21}`)
    },
})
