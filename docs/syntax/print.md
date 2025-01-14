# Print variables

Put a variable or expression between `{{ }}` to output the result.

For example, to print the variable `name`:

```vento
{{ name }}
```

Everything you put between `{{ }}` is evaluated as JavaScript code so you can
print the result of an expression:

```vento
{{ (name + " " + surname).toUpperCase() }}
```

Or a condition:

```vento
{{ name || "Unknown name" }}
```

Or an async operation (using `await`):

```vento
{{ await users.getUserName(23) }}
```

## Trimming the previous/next content

Use the `-` character next to the opening tag or previous to the closing tag to
remove all white spaces and line breaks of the previous or next content.

In the following example, the `-` in the opening tag configure Vento to remove
the white space before the printing tag:

```vento
<h1>
  {{- "Hello world" }}
</h1>
```

The result is:

```html
<h1>Hello world
</h1>
```

Use the `-` character in both opening and closing tags to remove the white space
previous and next to the printing tag:

```html
<h1>
  {{- "Hello world" -}}
</h1>
```

The result is:

```html
<h1>Hello world</h1>
```

## Pipes

Pipes allow transforming the content before printing it using custom functions
or global functions. Use `|>` to apply functions.

Vento comes with the `escape` filter by default. This filter escapes the html
code. For example:

```vento
{{ "<h1>Hello world</h1>" |> escape }}
```

This code outputs:

```
&lt;h1&gt;Hello world&lt;/h1&gt;
```
