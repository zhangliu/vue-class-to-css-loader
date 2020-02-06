const fs = require('fs');
const loader = require('../index');

describe('test', () => {
    it('test', done => {
        const content = fs.readFileSync(`${__dirname}/template/test.vue`).toString();
        loader(content);
        done()
    })
})