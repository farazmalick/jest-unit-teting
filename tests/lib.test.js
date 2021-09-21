const lib = require('../lib')
const exercise = require('../exercise1')
const db = require('../db')
const mail = require('../mail')

describe("Absoulte", () => {
    it("retuen positive no if positive no", () => {
        const result = lib.absolute(1)
        expect(result).toBe(1)
    })
})


describe("fizz buzz", () => {
    it("throw error if input is not a number", () => {
        expect(() => { exercise.fizzBuzz('a') }).toThrow("Input should be a number.")
    })

    it("expect FizzBuzz if number is divisible by 3 and 5", () => {
        const result = exercise.fizzBuzz(15)
        expect(result).toMatch(/FizzBuzz/)
    })

    it("expect Fizz if number is only divisible by 3", () => {
        const result = exercise.fizzBuzz(9)
        expect(result).toMatch(/Fizz/)
    })

    it("expect Buzz if number is only divisible by 5", () => {
        const result = exercise.fizzBuzz(15)
        expect(result).toMatch(/Buzz/)
    })
})

describe("Mock Functions", () => {

    it("apply discount if points greate than 10", () => {

        db.getCustomerSync = function (customerId) {
            //console.log("fake customer")
            return { id: customerId, points: 11 }

        }
        const order = { customerId: 1, totalPrice: 10 }
        const result = lib.applyDiscount(order)
        console.log(order.totalPrice)
        expect(order.totalPrice).toBe(9)
    })
})


describe("notify user", ()=>{

    // it("should send email to customer", () => {
    //     db.getCustomerSync = function(){
    //         return { email: "@" }
    //     }

    //     let sentMail = false
    //     mail.send = function( email , message ){
    //         sentMail = true
    //     }
        
    //     lib.notifyCustomer({ customerId : 1 })
    //     expect(sentMail).toBe(true)
    // })

    it("should send email to customer", () => {
        db.getCustomerSync = jest.fn()
        db.getCustomerSync.mockReturnValue({ email : 'a' })
        mail.send = jest.fn()
        
        
        lib.notifyCustomer({ customerId : 1 })
        expect(mail.send).toHaveBeenCalled()
        expect(mail.send.mock.calls[0][0]).toBe('a')
    })
})