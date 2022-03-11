
/* bcrypt.js */

export async function genSalt(saltRounds) {
    return ""
}

export async function hash(password, salt) {
    return "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO"
}

export async function compare(password, passwordHash) {
    if (password === "p455w0rd" && passwordHash === "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO") return true
    return false
}