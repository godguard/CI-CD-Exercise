const assert = require('assert'); // No need for node-fetch, as fetch is built-in

suite('Home page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8888/"); // Using built-in fetch
    let body = await res.text();
    assert.ok(body.includes("<h1>Students Registry</h1>"));
  });
  
  test('Students count', async function() {
    let res = await fetch("http://localhost:8888/");
    let body = await res.text();
    assert.ok(body.includes("Registered students: <b>2</b>"));
  });
});