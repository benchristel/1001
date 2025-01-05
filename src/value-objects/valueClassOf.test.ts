import {test, expect, is} from "@benchristel/taste"
import {valueClassOf} from "./valueClassOf.js"

test("valueClassOf", {
    "creates a base data class that can be extended with methods"() {
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

        const bob = new Person({name: "Bob", age: 21})

        expect(bob.inspect(), is, "Bob, 21")
        bob.inspect() satisfies string
        // @ts-expect-error - bob.inspect() should be a string
        bob.inspect() satisfies number

        expect(bob.age, is, 21)
        bob.age satisfies number
        // @ts-expect-error - bob.age should be a number
        bob.age satisfies string

        expect(JSON.stringify(bob), is, `{"name":"Bob","age":21}`)
    },
})
