# remark-lint-ending-period

This [remark-lint](https://github.com/wooorm/remark-lint) rule was created for [free-programming-books-lint](https://github.com/vhf/free-programming-books-lint) to enforce [free-programming-books](https://github.com/vhf/free-programming-books) [formatting guidelines](https://github.com/vhf/free-programming-books/blob/master/CONTRIBUTING.md#formatting).

This rule ensures that all list items are ended with certain symbol.  
Default symbol - point. 

```Text
<!-- Invalid -->

# Section
- A
- B

<!-- Valid -->

# Section
- A.
- B.
```

## Using the rule

### Via `.remarkrc`

```bash
npm install -g remark
npm install -g remark-lint
npm install remark-lint-ending-period # local install!
```

Then, set up your `.remarkrc`:

```JSON
{
  "plugins": {
    "remark-lint": {
      "external": ["remark-lint-ending-period"]
    }
  }
}
```

Now you can use the following command to run the lint:

```bash
remark --no-stdout xxx.md
```

#### Using another ending symbol

Set up your `.remarkrc`:

```JSON
{
  "plugins": {
    "remark-lint": {
      "external": ["remark-lint-ending-period"],
      "ending-period": {
        "endings": ["string to finish list item"]
        }
    }
  }
}
```

### Via CLI

```bash
npm install -g remark
npm install -g remark-lint
npm install -g remark-lint-ending-period # global install!
remark --no-stdout -u remark-lint="external:[\"remark-lint-ending-period\"]" xxx.md
```

Note that the `lint=<lint_options>` option only works with `remark >= 1.1.1`.

This `README.md` is based on [this one](https://github.com/chcokr/mdast-lint-sentence-newline/blob/250b106c9e19b387270099cf16f17a84643f8944/README.md) by [@chcokr](https://github.com/chcokr) (MIT).
