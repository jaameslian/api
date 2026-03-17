const bcrypt = require("bcrypt");

bcrypt.hash("ExamplePassword", 12, function(error, result) {
    console.log(result);
})

bcrypt.compare("ExamplePassword", "$2b$12$chB/JqWK8FCQyj5ZFyR2Kuh7jWEFh260uVghcH6GeTsA6FwhXZgh2", function(error, result) {
    console.log(result);
})

bcrypt.compare("ExamplePassword", "$2b$12$chB/JqWK8FCQyj5ZFsR2Kuh7jWEFh260uVghcH6GeTsA6FwhXZgh2", function(error, result) {
    console.log(result);
})