const jwt = require("jsonwebtoken");

const SECRET_KEY = 'mysecretkey';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJ1c2VybmFtZSI6Imxyb2RyaWd1ZXMiLCJpYXQiOjE3MjUyNzg4NDcsImV4cCI6MTcyNTI3ODkwN30.4w89dw68xEWaLEz522-zSs1gkh9v1eApEUIGiz_fDkY';

try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
} catch (err) {
    console.log("Invalid token: ", err.message);
}