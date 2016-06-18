# remark-lint-list-item-punctuation

[![Build Status](https://travis-ci.org/wemake-services/remark-lint-list-item-punctuation.svg?branch=master)](https://travis-ci.org/wemake-services/remark-lint-list-item-punctuation) [![Coverage Status](https://coveralls.io/repos/github/wemake-services/remark-lint-list-item-punctuation/badge.svg?branch=master)](https://coveralls.io/github/wemake-services/remark-lint-list-item-punctuation?branch=master)

This rule ensures that all list items are ended with certain symbol. The default symbol is `.`.

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
npm install remark-lint-list-litem-punctuation # local install!
```

Note: this package was renamed from `remark-lint-ending-period`.

Then, set up your `.remarkrc`:

```JSON
{
  "plugins": {
    "remark-lint": {
      "external": ["remark-lint-list-item-punctuation"]
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
      "external": ["remark-lint-list-item-punctuation"],
      "list-item-punctuation": {
        "endings": ["...", ";", "."]
        }
    }
  }
}
```

### Via CLI

```bash
npm install -g remark
npm install -g remark-lint
npm install -g remark-lint-list-item-punctuation # global install!
remark --no-stdout -u remark-lint="external:[\"remark-lint-list-item-punctuation\"]" xxx.md
```

Note that the `lint=<lint_options>` option only works with `remark >= 1.1.1`.

## License

MIT, see [LICENSE.md](LICENCE.md) for details.

This `README.md` is based on [this one](https://github.com/chcokr/mdast-lint-sentence-newline/blob/250b106c9e19b387270099cf16f17a84643f8944/README.md) by [@chcokr](https://github.com/chcokr) (MIT).
