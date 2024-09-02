const bcrypt = require('bcrypt');

async function comparePasswords() {
    const data = "minhasenha";
    const encrypted = "$2b$10$XsqgvUdgSPpQOwF9UdNdquB5CbyLQ5jGawLt.60SplxgJ9ZcB8QJC";

    const result = await bcrypt.compare(data, encrypted);

    console.log(result);
}

comparePasswords();