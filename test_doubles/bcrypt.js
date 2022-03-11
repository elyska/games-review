
/* bcrypt.js */

export function genSalt(_saltRounds) {
    return ""
}

export function hash(password, _salt) {
    if (password === "p455w0rd") return "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO"
    
}

export function compare(password, passwordHash) {
    if (password === "p455w0rd" && passwordHash === "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO") return true
    return false
}